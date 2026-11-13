/**
 * OP.GG 配装推荐基础框架
 *
 * 目标：
 * - 只在 ChampSelect 阶段启用
 * - 接管选好英雄后出现的 `.champion-select-ability-previews-show` 点击事件
 * - 根据英雄 / 队列 / 版本上下文拉取 OP.GG 推荐数据
 */

import { logger } from '@/index'
import { injector } from '@/lib/InjectorManager'
import { createElement } from 'react'
import { flushSync } from 'react-dom'
import { createRoot, type Root } from 'react-dom/client'
import { Modal } from '@/components/ui/Modal'
import { getQueue, getQueueName } from '@/lib/assets'
import { isSummonersRift, isSummonersRiftGameflow } from '@/lib/game-mode'
import { isSummonersRiftChampSelect } from '@/lib/game-context'
import { OpggBuildRecommendationPanel } from '@/components/ui/OpggBuildRecommendationPanel'
import { lcu, LcuEventUri, type ChampSelectSession, type ItemSet, type LCUEventMessage, type RunePage, type RunePagePayload } from '@/lib/lcu'
import { store } from '@/lib/store'
import {
  opggApi,
  type OpggPosition,
  type OpggRankedPosition,
  type OpggTier,
} from '@/lib/opgg-api'
import type { GameflowPhase } from '@/types/lcu'
import type { BuildRecommendation, RecommendationContext } from '@/types/build-recommendation'
import { FALLBACK_OPGG_POSITION, getChampionName, getPositionLabel, resolveRecommendationPosition } from '@/lib/build-recommendation/context'
import { loadRecommendation } from '@/lib/build-recommendation/data'
import { createManagedItemSet, getManagedItemSetUid, planManagedItemSetUpsert } from '@/lib/build-recommendation/item-sets'

const TARGET_SELECTOR = '.toggle-ability-previews-button'
const HIJACK_ATTR = 'data-sona-opgg-build-hijacked'
const PANEL_ID = 'sona-opgg-build-panel'
const IN_GAME_BUILD_BUTTON_ATTR = 'data-sona-opgg-ingame-build'
const DEFAULT_OPGG_TIER: OpggTier = 'master_plus'
// 符文页通过每秒轮询读取（WS 事件经常不推送，轮询更稳定）。
const RUNE_PAGE_POLL_INTERVAL_MS = 1000
const RUNE_APPLY_SUPPRESS_MS = 1500
const SPELL_APPLY_SUPPRESS_MS = 1500
const SMART_LOADOUT_RESTORE_DEBOUNCE_MS = 500
const RUNE_SAVE_CHAT_DEDUPE_MS = 2000
const SELECTABLE_OPGG_TIERS: OpggTier[] = [
  'all',
  'challenger',
  'grandmaster',
  'master_plus',
  'master',
  'diamond_plus',
  'diamond',
  'emerald_plus',
  'emerald',
  'platinum_plus',
  'platinum',
  'gold_plus',
  'gold',
  'silver',
  'bronze',
  'iron',
]
// 匹配/排位识别不到分路时，按「上中打野下路辅助」顺序全部写入
const RANKED_ALL_POSITIONS: OpggPosition[] = ['top', 'mid', 'jungle', 'adc', 'support']

interface RecommendationCacheEntry {
  key: string
  context: RecommendationContext
  promise: Promise<BuildRecommendation | null>
  data?: BuildRecommendation | null
  error?: string
  updatedAt: number
}

type SmartRuneSnapshot = Pick<RunePagePayload, 'primaryStyleId' | 'subStyleId' | 'selectedPerkIds'>
type SmartSpellSnapshot = { spell1Id: number; spell2Id: number }

interface ObservedSmartRuneSnapshot {
  key: string
  page: SmartRuneSnapshot
}

interface ObservedSmartSpellSnapshot {
  key: string
  spells: SmartSpellSnapshot
}

const MAX_RECOMMENDATION_CACHE_SIZE = 8

let phaseUnsub: (() => void) | null = null
let champSelectUnsub: (() => void) | null = null
let runePagePollTimer: number | null = null
let lastPolledRuneKey = ''
let lastPolledRuneSignature = ''
let lastObservedRuneSnapshot: ObservedSmartRuneSnapshot | null = null
let contextRefreshToken = 0
let championLockPollTimer: number | null = null
let championLockPollAttempts = 0
let injectRegistered = false
let inGameBuildButtonRegistered = false
let inGameBuildButtonToken = 0
let currentContext: RecommendationContext = {
  championId: 0,
  queueId: 0,
  gameVersion: '',
  gameMode: '',
  position: 'none',
}
let currentChampionLocked = false
const boundElements: Array<{ el: HTMLElement; handler: EventListener; originalText: string }> = []
const recommendationCache = new Map<string, RecommendationCacheEntry>()
const commonPositionMapCache = new Map<OpggTier, Promise<Map<number, OpggPosition>>>()
let outsideCloseHandler: ((event: MouseEvent) => void) | null = null
let activePanelKey = ''
let panelReactRoot: Root | null = null
let inGameModalRoot: Root | null = null
let inGameModalContainer: HTMLDivElement | null = null
let inGameModalRenderToken = 0
let lastAppliedItemSetKey = ''
let lastAppliedRuneKey = ''
let lastAppliedSpellKey = ''
let suppressRuneSaveUntil = 0
let suppressSpellSaveUntil = 0
let lastAutoAppliedRuneSignature = ''
let smartLoadoutRestoreTimer: number | null = null
let pendingSmartLoadoutContext: RecommendationContext | null = null
let lastObservedSpellKey = ''
let lastObservedSpellSignature = ''
let lastObservedSpellSnapshot: ObservedSmartSpellSnapshot | null = null
let lastRuneSaveChatSignature = ''
let lastRuneSaveChatAt = 0
const itemSetSyncInFlightKeys = new Set<string>()
const runeApplyInFlightKeys = new Set<string>()
const spellApplyInFlightKeys = new Set<string>()
const smartLoadoutFinalSaveInFlightKeys = new Set<string>()
const smartLoadoutFirstSavedRuneKeys = new Set<string>()
const smartLoadoutFirstSavedSpellKeys = new Set<string>()

function getLocalChampionId(session: ChampSelectSession): number {
  const localPlayer = session.myTeam.find((player) => player.cellId === session.localPlayerCellId)
  return localPlayer?.championId ?? 0
}

function getLocalPlayer(session: ChampSelectSession) {
  return session.myTeam.find((player) => player.cellId === session.localPlayerCellId)
}

function isLocalChampionLocked(session: ChampSelectSession): boolean {
  const localPlayer = getLocalPlayer(session)
  if (!localPlayer || localPlayer.championId <= 0) return false

  const localPickActions = session.actions
    .flat(2)
    .filter((action) => action.actorCellId === session.localPlayerCellId && action.type === 'pick')

  if (localPickActions.length === 0) {
    return true
  }

  // A completed pick action can still reference the original champion after a swap.
  return localPickActions.some((action) => action.completed)
}

function mapAssignedPosition(position: string | undefined): OpggPosition {
  switch (position?.trim().toLowerCase()) {
    case 'top':
      return 'top'
    case 'jungle':
      return 'jungle'
    case 'middle':
    case 'mid':
      return 'mid'
    case 'bottom':
    case 'bot':
    case 'adc':
      return 'adc'
    case 'utility':
    case 'support':
      return 'support'
    default:
      return 'none'
  }
}

function isRankedQueue(queueId: number): boolean {
  const queue = getQueue(queueId)
  if (typeof queue?.isRanked === 'boolean') return queue.isRanked
  return queueId === 420 || queueId === 440
}

function getPositionPopularity(position: OpggRankedPosition): number {
  const roleRate = Number(position.stats?.role_rate)
  if (Number.isFinite(roleRate)) return roleRate
  const pickRate = Number(position.stats?.pick_rate)
  return Number.isFinite(pickRate) ? pickRate : 0
}

function ensureCommonPositionMap(tier: OpggTier): Promise<Map<number, OpggPosition>> {
  const cached = commonPositionMapCache.get(tier)
  if (cached) return cached

  const promise = opggApi.getChampionsTier({
    tier,
  }).then((summary) => {
    const positionsByChampion = new Map<number, OpggPosition>()

    for (const champion of summary.data) {
      const rawPositions = (champion as { positions?: unknown }).positions
      if (!Array.isArray(rawPositions)) continue

      const mostCommon = (rawPositions as OpggRankedPosition[])
        .map((position) => ({
          position: mapAssignedPosition(position.name),
          popularity: getPositionPopularity(position),
        }))
        .filter((entry) => entry.position !== 'none')
        .sort((left, right) => right.popularity - left.popularity)[0]

      if (mostCommon) positionsByChampion.set(champion.id, mostCommon.position)
    }

    logger.info('[OPGG] 英雄常见分路表已缓存 → tier=%s, champions=%d', tier, positionsByChampion.size)
    return positionsByChampion
  }).catch((err) => {
    commonPositionMapCache.delete(tier)
    throw err
  })

  commonPositionMapCache.set(tier, promise)
  return promise
}

async function resolveMostCommonPosition(championId: number, tier = getSelectedOpggTier()): Promise<OpggPosition | null> {
  if (championId <= 0) return null

  try {
    const positionsByChampion = await ensureCommonPositionMap(tier)
    return positionsByChampion.get(championId) ?? null
  } catch (err) {
    logger.warn('[OPGG] 获取英雄常见分路失败:', err)
    return null
  }
}

async function resolveInitialRecommendationPosition(options: {
  championId: number
  queueId: number
  gameMode: string
  mapId?: number
  assignedPosition: OpggPosition
}): Promise<OpggPosition> {
  const probeContext: RecommendationContext = {
    championId: options.championId,
    queueId: options.queueId,
    gameVersion: '',
    gameMode: options.gameMode,
    mapId: options.mapId,
    position: options.assignedPosition,
  }

  if (!isSummonersRift(probeContext)) return 'none'

  if (isRankedQueue(options.queueId) && options.assignedPosition !== 'none') {
    logger.info('[OPGG] 推荐分路使用排位分配位置 → %s', options.assignedPosition)
    return options.assignedPosition
  }

  const mostCommonPosition = await resolveMostCommonPosition(options.championId)
  if (mostCommonPosition) {
    logger.info(
      '[OPGG] 推荐分路使用英雄最常见位置 → championId=%d, position=%s, queueId=%d',
      options.championId,
      mostCommonPosition,
      options.queueId,
    )
    return mostCommonPosition
  }

  if (options.assignedPosition !== 'none') return options.assignedPosition
  logger.warn('[OPGG] 无法识别推荐分路，回退到中路 → championId=%d', options.championId)
  return FALLBACK_OPGG_POSITION
}

async function resolveGameContext(queueId: number): Promise<{ gameMode: string; mapId?: number }> {
  const queue = getQueue(queueId)
  if (queue) return { gameMode: queue.gameMode, mapId: queue.mapId }
  const session = await lcu.getGameflowSession().catch(() => null)
  if (session?.gameData?.queue?.id !== queueId) return { gameMode: '' }
  return {
    gameMode: session?.gameData?.queue?.gameMode || session?.map?.gameMode || '',
    mapId: session?.map?.id ?? session?.gameData?.queue?.mapId,
  }
}

/** 匹配/排位（opgg ranked）且识别不到分路时，需要展开五路分别写入 */
function shouldExpandAllPositions(context: RecommendationContext): boolean {
  return isSummonersRift(context) && context.position === 'none'
}

function getRecommendationCacheKey(context: RecommendationContext): string {
  const position = resolveRecommendationPosition(context.position)
  const tier = getSelectedOpggTier()

  return [
    context.championId,
    context.queueId,
    position,
    tier,
    'latest',
  ].join('|')
}

function normalizeOpggTier(value: string): OpggTier {
  return SELECTABLE_OPGG_TIERS.includes(value as OpggTier) ? value as OpggTier : DEFAULT_OPGG_TIER
}

function getSelectedOpggTier(): OpggTier {
  return normalizeOpggTier(store.get('opggBuildRecommendationTier'))
}

function getSmartRuneKey(context: RecommendationContext): string | null {
  if (!isSummonersRift(context) || context.championId <= 0) return null
  return `${context.championId}:ranked`
}

function getSmartSpellKey(context: RecommendationContext): string | null {
  if (!isSummonersRift(context) || context.championId <= 0) return null
  return `${context.championId}:ranked`
}

function isValidRunePage(page: Pick<RunePagePayload, 'primaryStyleId' | 'subStyleId' | 'selectedPerkIds'>): boolean {
  return page.primaryStyleId > 0
    && page.subStyleId > 0
    && Array.isArray(page.selectedPerkIds)
    && page.selectedPerkIds.length >= 6
}

function isValidSummonerSpells(spells: { spell1Id: number; spell2Id: number }): boolean {
  return spells.spell1Id > 0
    && spells.spell2Id > 0
    && spells.spell1Id !== spells.spell2Id
}

function getSummonerSpellSignature(spells: { spell1Id: number; spell2Id: number }): string {
  return `${spells.spell1Id}:${spells.spell2Id}`
}

function getRunePageSignature(page: Pick<RunePagePayload, 'primaryStyleId' | 'subStyleId' | 'selectedPerkIds'>): string {
  return `${page.primaryStyleId}:${page.subStyleId}:${page.selectedPerkIds.join(',')}`
}

function notifySmartRuneSaved(context: RecommendationContext, runeKey: string, signature: string): void {
  const chatSignature = `${runeKey}|${signature}`
  const now = Date.now()
  if (chatSignature === lastRuneSaveChatSignature && now - lastRuneSaveChatAt < RUNE_SAVE_CHAT_DEDUPE_MS) {
    return
  }

  lastRuneSaveChatSignature = chatSignature
  lastRuneSaveChatAt = now

  const championName = getChampionName(context.championId)
  const queueLabel = getContextQueueLabel(context)
  Toast.success(`${championName} ${queueLabel} 符文更改已保存 - Sona`)
}

function rememberSmartRuneSnapshot(runeKey: string, page: SmartRuneSnapshot): void {
  lastObservedRuneSnapshot = {
    key: runeKey,
    page: {
      primaryStyleId: page.primaryStyleId,
      subStyleId: page.subStyleId,
      selectedPerkIds: [...page.selectedPerkIds],
    },
  }
}

function rememberSmartSpellSnapshot(spellKey: string, spells: SmartSpellSnapshot): void {
  lastObservedSpellSnapshot = {
    key: spellKey,
    spells: { ...spells },
  }
}

/**
 * 首次游玩某个英雄时保存最终符文。
 * 已存在有效记录时保持原有的“检测到用户变化才更新”策略，避免覆盖自动恢复内容。
 */
function persistMissingSmartRuneSnapshot(
  context: RecommendationContext,
  page: SmartRuneSnapshot,
  reason: string,
): boolean {
  if (!store.get('smartBuildRecommendation') || !isValidRunePage(page)) return false

  const runeKey = getSmartRuneKey(context)
  if (!runeKey) return false

  const pages = { ...store.get('smartRunePages') }
  const existing = pages[runeKey]
  const hasValidExisting = Boolean(existing && isValidRunePage(existing))
  if (hasValidExisting && !smartLoadoutFirstSavedRuneKeys.has(runeKey)) return false

  const previousSignature = hasValidExisting ? getRunePageSignature(existing) : ''
  const signature = getRunePageSignature(page)
  if (previousSignature === signature) return false

  pages[runeKey] = {
    primaryStyleId: page.primaryStyleId,
    subStyleId: page.subStyleId,
    selectedPerkIds: [...page.selectedPerkIds],
    updatedAt: Date.now(),
  }
  store.set('smartRunePages', pages)
  smartLoadoutFirstSavedRuneKeys.add(runeKey)
  lastAppliedRuneKey = runeKey
  logger.info('[OPGG] 已保存首次智能符文最终快照 → key=%s, reason=%s, signature=%s', runeKey, reason, signature)
  notifySmartRuneSaved(context, runeKey, signature)
  return true
}

/** 首次游玩某个英雄时保存最终召唤师技能。 */
function persistMissingSmartSpellSnapshot(
  context: RecommendationContext,
  spells: SmartSpellSnapshot,
  reason: string,
): boolean {
  if (!store.get('smartBuildRecommendation') || !isValidSummonerSpells(spells)) return false

  const spellKey = getSmartSpellKey(context)
  if (!spellKey) return false

  const allSpells = { ...store.get('smartSummonerSpells') }
  const existing = allSpells[spellKey]
  const hasValidExisting = Boolean(existing && isValidSummonerSpells(existing))
  if (hasValidExisting && !smartLoadoutFirstSavedSpellKeys.has(spellKey)) return false

  const previousSignature = hasValidExisting ? getSummonerSpellSignature(existing) : ''
  const signature = getSummonerSpellSignature(spells)
  if (previousSignature === signature) return false

  allSpells[spellKey] = {
    ...spells,
    updatedAt: Date.now(),
  }
  store.set('smartSummonerSpells', allSpells)
  smartLoadoutFirstSavedSpellKeys.add(spellKey)
  lastAppliedSpellKey = spellKey
  logger.info('[OPGG] 已保存首次召唤师技能最终快照 → key=%s, reason=%s, spells=%s', spellKey, reason, signature)
  return true
}

/** 阶段切换时使用已观察到的最终快照同步兜底，避免 ChampSelect 接口先被销毁。 */
function persistObservedSmartLoadoutSnapshot(context: RecommendationContext, reason: string): void {
  const runeKey = getSmartRuneKey(context)
  const spellKey = getSmartSpellKey(context)
  let runeSaved = false
  let spellsSaved = false

  if (runeKey && lastObservedRuneSnapshot?.key === runeKey) {
    runeSaved = persistMissingSmartRuneSnapshot(context, lastObservedRuneSnapshot.page, reason)
  }
  if (spellKey && lastObservedSpellSnapshot?.key === spellKey) {
    spellsSaved = persistMissingSmartSpellSnapshot(context, lastObservedSpellSnapshot.spells, reason)
  }

  if (runeSaved || spellsSaved) {
    logger.info('[OPGG] 智能配置最终快照已落盘 → reason=%s, rune=%s, spells=%s', reason, runeSaved, spellsSaved)
  }
}

/**
 * FINALIZATION / GAME_STARTING 时主动读取最后一份有效配置。
 * 只补齐缺失记录；已有记录继续由日常变化监听负责更新。
 */
async function persistFinalSmartLoadoutSnapshot(
  session: ChampSelectSession,
  context: RecommendationContext,
  reason: string,
): Promise<void> {
  if (!store.get('smartBuildRecommendation')) return
  if (context.championId <= 0 || !isLocalChampionLocked(session)) return

  const runeKey = getSmartRuneKey(context)
  const spellKey = getSmartSpellKey(context)
  const finalSaveKey = `${runeKey ?? '-'}|${spellKey ?? '-'}`
  if (smartLoadoutFinalSaveInFlightKeys.has(finalSaveKey)) return

  const savedRunes = store.get('smartRunePages')
  const savedSpells = store.get('smartSummonerSpells')
  const needsRune = Boolean(runeKey && (
    smartLoadoutFirstSavedRuneKeys.has(runeKey)
    || !savedRunes[runeKey]
    || !isValidRunePage(savedRunes[runeKey])
  ))
  const needsSpells = Boolean(spellKey && (
    smartLoadoutFirstSavedSpellKeys.has(spellKey)
    || !savedSpells[spellKey]
    || !isValidSummonerSpells(savedSpells[spellKey])
  ))
  if (!needsRune && !needsSpells) return

  smartLoadoutFinalSaveInFlightKeys.add(finalSaveKey)
  try {
    let runeSaved = false
    let spellsSaved = false

    const localPlayer = getLocalPlayer(session)
    if (needsSpells && spellKey && localPlayer) {
      const spells = { spell1Id: localPlayer.spell1Id, spell2Id: localPlayer.spell2Id }
      if (isValidSummonerSpells(spells)) {
        rememberSmartSpellSnapshot(spellKey, spells)
        spellsSaved = persistMissingSmartSpellSnapshot(context, spells, reason)
      }
    }

    if (needsRune && runeKey) {
      let runePage = lastObservedRuneSnapshot?.key === runeKey
        ? lastObservedRuneSnapshot.page
        : null

      if (!runePage) {
        const pages = await lcu.getRunePages()
        const active = getActiveRunePage(pages)
        if (active && isValidRunePage(active)) {
          runePage = {
            primaryStyleId: active.primaryStyleId,
            subStyleId: active.subStyleId,
            selectedPerkIds: [...active.selectedPerkIds],
          }
          rememberSmartRuneSnapshot(runeKey, runePage)
        }
      }

      if (runePage) {
        runeSaved = persistMissingSmartRuneSnapshot(context, runePage, reason)
      }
    }

    if (runeSaved || spellsSaved) {
      logger.info('[OPGG] 智能配置首次最终快照已保存 → reason=%s, rune=%s, spells=%s', reason, runeSaved, spellsSaved)
    }
  } catch (err) {
    logger.warn('[OPGG] 智能配置最终快照保存失败 → reason=%s:', reason, err)
  } finally {
    smartLoadoutFinalSaveInFlightKeys.delete(finalSaveKey)
  }
}

function ensureRecommendationPrefetch(context: RecommendationContext): RecommendationCacheEntry | null {
  if (context.championId <= 0 || !isSummonersRift(context)) return null

  const snapshot = { ...context }
  const key = getRecommendationCacheKey(snapshot)
  const cached = recommendationCache.get(key)
  if (cached) return cached

  const entry: RecommendationCacheEntry = {
    key,
    context: snapshot,
    updatedAt: Date.now(),
    promise: Promise.resolve(null),
  }

  entry.promise = loadRecommendation(snapshot, getSelectedOpggTier())
    .then((data) => {
      entry.data = data
      entry.updatedAt = Date.now()
      logger.info('[OPGG] 配装推荐缓存完成 → %s', key)
      return data
    })
    .catch((err) => {
      entry.error = err instanceof Error ? err.message : String(err)
      entry.data = null
      entry.updatedAt = Date.now()
      logger.warn('[OPGG] 配装推荐预拉取失败:', err)
      return null
    })

  recommendationCache.set(key, entry)
  trimRecommendationCache()
  logger.info('[OPGG] 开始后台预拉取配装推荐 → %s', key)
  return entry
}

function trimRecommendationCache() {
  if (recommendationCache.size <= MAX_RECOMMENDATION_CACHE_SIZE) return

  const entries = Array.from(recommendationCache.values())
    .sort((a, b) => a.updatedAt - b.updatedAt)
  for (const entry of entries.slice(0, recommendationCache.size - MAX_RECOMMENDATION_CACHE_SIZE)) {
    recommendationCache.delete(entry.key)
  }
}

function getContextQueueLabel(context: RecommendationContext): string {
  const queueName = getQueueName(context.queueId)
  const positionLabel = getPositionLabel(context.position)
  return positionLabel ? `${queueName}/${positionLabel}` : queueName
}

function getSmartRunePageName(context: RecommendationContext): string {
  return `${getChampionName(context.championId)} ${getQueueName(context.queueId)} - Sona`
}

function isCurrentRecommendationContext(context: RecommendationContext): boolean {
  return currentContext.championId === context.championId
    && currentContext.queueId === context.queueId
    && currentContext.gameMode === context.gameMode
    && currentContext.mapId === context.mapId
    && currentContext.position === context.position
}

function saveCurrentSmartRunePage(page: RunePage): void {
  if (!store.get('smartBuildRecommendation')) {
    logger.info('[OPGG] 跳过符文保存：符文/召唤师技能自动配置未开启')
    return
  }
  if (currentContext.championId <= 0 || !currentChampionLocked) {
    logger.info('[OPGG] 跳过符文保存：英雄未锁定 → championId=%d, locked=%s', currentContext.championId, currentChampionLocked)
    return
  }
  if (page.current === false && page.isActive === false) {
    logger.info('[OPGG] 跳过符文保存：非当前生效符文页 → name=%s, current=%s, isActive=%s', page.name, page.current, page.isActive)
    return
  }
  if (!isValidRunePage(page)) {
    logger.info('[OPGG] 跳过符文保存：符文页无效 → primaryStyleId=%d, subStyleId=%d, perks=%d', page.primaryStyleId, page.subStyleId, page.selectedPerkIds?.length ?? 0)
    return
  }

  const runeKey = getSmartRuneKey(currentContext)
  if (!runeKey) {
    logger.info('[OPGG] 跳过符文保存：无法生成 runeKey → championId=%d, gameMode=%s', currentContext.championId, currentContext.gameMode || 'unknown')
    return
  }

  const signature = getRunePageSignature(page)
  if (signature === lastAutoAppliedRuneSignature && Date.now() < suppressRuneSaveUntil) {
    logger.info('[OPGG] 跳过符文保存：与 Sona 自动恢复的符文相同 → key=%s, signature=%s', runeKey, signature)
    return
  }

  const pages = { ...store.get('smartRunePages') }
  const previous = pages[runeKey]
  const previousSignature = previous ? getRunePageSignature(previous) : ''
  pages[runeKey] = {
    primaryStyleId: page.primaryStyleId,
    subStyleId: page.subStyleId,
    selectedPerkIds: [...page.selectedPerkIds],
    updatedAt: Date.now(),
  }
  store.set('smartRunePages', pages)
  smartLoadoutFirstSavedRuneKeys.delete(runeKey)
  logger.info('[OPGG] 已保存智能符文 → key=%s, page=%s, signature=%s', runeKey, getSmartRunePageName(currentContext), signature)
  if (previousSignature !== signature) {
    notifySmartRuneSaved(currentContext, runeKey, signature)
  }
}

function saveCurrentSmartSummonerSpells(player: ChampSelectSession['myTeam'][number], context: RecommendationContext): void {
  if (!store.get('smartBuildRecommendation')) return
  if (Date.now() < suppressSpellSaveUntil) return
  if (!currentChampionLocked || context.championId <= 0) return

  const spellKey = getSmartSpellKey(context)
  if (!spellKey) return

  const spells = {
    spell1Id: player.spell1Id,
    spell2Id: player.spell2Id,
  }
  if (!isValidSummonerSpells(spells)) return

  const signature = getSummonerSpellSignature(spells)
  rememberSmartSpellSnapshot(spellKey, spells)
  if (lastObservedSpellKey !== spellKey) {
    lastObservedSpellKey = spellKey
    lastObservedSpellSignature = signature
    return
  }
  if (lastObservedSpellSignature === signature) return

  lastObservedSpellSignature = signature
  const allSpells = { ...store.get('smartSummonerSpells') }
  allSpells[spellKey] = {
    ...spells,
    updatedAt: Date.now(),
  }
  store.set('smartSummonerSpells', allSpells)
  smartLoadoutFirstSavedSpellKeys.delete(spellKey)
  logger.info('[OPGG] 已保存智能召唤师技能 → key=%s, spells=%s', spellKey, signature)
}

function getActiveRunePage(pages: RunePage[]): RunePage | null {
  return pages.find((page) => page.current) ?? pages.find((page) => page.isActive) ?? null
}

async function pollCurrentRunePage(): Promise<void> {
  if (!store.get('smartBuildRecommendation')) return
  if (currentContext.championId <= 0 || !currentChampionLocked) return

  const runeKey = getSmartRuneKey(currentContext)
  if (!runeKey) return

  try {
    const pages = await lcu.getRunePages()
    const active = getActiveRunePage(pages)
    if (!active || !isValidRunePage(active)) return

    const signature = getRunePageSignature(active)
    rememberSmartRuneSnapshot(runeKey, active)

    // 首次观察到该英雄的符文页时，仅记录基线，不触发保存。
    // 否则锁定瞬间（Sona 自动恢复完成之前）轮询会把“恢复前的旧符文页”
    // 误判为变化并覆盖掉用户已保存的智能符文。
    if (runeKey !== lastPolledRuneKey) {
      lastPolledRuneKey = runeKey
      lastPolledRuneSignature = signature
      return
    }

    // 符文页未变化：直接跳过，不做任何保存。
    if (signature === lastPolledRuneSignature) return

    logger.info(
      '[OPGG] 轮询检测到符文页变化 → name=%s, id=%s, current=%s, isActive=%s, signature=%s',
      active.name,
      active.id,
      active.current,
      active.isActive,
      signature,
    )
    lastPolledRuneSignature = signature
    saveCurrentSmartRunePage(active)
  } catch (err) {
    logger.debug('[OPGG] 轮询符文页失败:', err)
  }
}

function startRunePagePolling(): void {
  if (runePagePollTimer != null) return

  lastPolledRuneKey = ''
  lastPolledRuneSignature = ''
  runePagePollTimer = window.setInterval(() => {
    void pollCurrentRunePage()
  }, RUNE_PAGE_POLL_INTERVAL_MS)
  logger.info('[OPGG] 已启动符文页轮询（每 %dms 读取一次）', RUNE_PAGE_POLL_INTERVAL_MS)
}

function stopRunePagePolling(): void {
  if (runePagePollTimer != null) {
    window.clearInterval(runePagePollTimer)
    runePagePollTimer = null
  }
  lastPolledRuneKey = ''
  lastPolledRuneSignature = ''
}

/** 批量写入多条分路的 Sona 装备集（读一次、过滤一次、一次写回，避免多次读写竞态） */
async function upsertRecommendedItemSets(
  items: Array<{ context: RecommendationContext; recommendation: BuildRecommendation }>,
): Promise<void> {
  const nextItemSets = items
    .map(({ context, recommendation }) => createManagedItemSet(context, recommendation))
    .filter((itemSet): itemSet is ItemSet => itemSet != null)

  if (nextItemSets.length === 0) {
    logger.warn('[OPGG] 装备集生成失败：没有可写入的装备 block')
    return
  }

  const summoner = await lcu.getSummonerInfo()
  const wrapper = await lcu.getItemSets(summoner.summonerId)
  const existingItemSets = Array.isArray(wrapper?.itemSets) ? wrapper.itemSets : []
  const plan = planManagedItemSetUpsert(existingItemSets, nextItemSets)

  if (!plan.changed) {
    logger.info('[OPGG] 自动装备集内容未变化，跳过写入：%s', nextItemSets.map((itemSet) => itemSet.title).join(' | '))
    return
  }

  await lcu.putItemSets(summoner.summonerId, {
    accountId: wrapper?.accountId ?? summoner.accountId ?? 0,
    itemSets: plan.itemSets,
    timestamp: Date.now(),
  })

  logger.info(
    '[OPGG] 自动装备集已同步：%d 个，清理重复项=%d → %s',
    nextItemSets.length,
    plan.removedDuplicates,
    nextItemSets.map((itemSet) => itemSet.title).join(' | '),
  )

  const championName = getChampionName(items[0].context.championId)
  Toast.success(`${championName} 出装已配备 - Sona`)
}

/** 匹配/排位识别不到分路时：并发拉取上中打野下路辅助五路，分别写入各自的装备集 */
function syncRankedAllPositionsItemSets(baseContext: RecommendationContext): void {
  const syncKey = `sona-${baseContext.championId}-ranked-all`
  if (lastAppliedItemSetKey === syncKey || itemSetSyncInFlightKeys.has(syncKey)) return

  itemSetSyncInFlightKeys.add(syncKey)

  const entries = RANKED_ALL_POSITIONS.map((position) => {
    const context: RecommendationContext = { ...baseContext, position }
    return { context, entry: ensureRecommendationPrefetch(context) }
  })

  Promise.all(entries.map(({ entry }) => entry?.promise ?? Promise.resolve(null)))
    .then(async (recommendations) => {
      if (!store.get('smartItemSetBuild') || !currentChampionLocked) return
      if (!isCurrentRecommendationContext(baseContext)) return
      if (lastAppliedItemSetKey === syncKey) return

      const items = entries
        .map(({ context }, index) => ({ context, recommendation: recommendations[index] }))
        .filter(
          (item): item is { context: RecommendationContext; recommendation: BuildRecommendation } =>
            Boolean(item.recommendation),
        )

      if (items.length === 0) return

      await upsertRecommendedItemSets(items)
      lastAppliedItemSetKey = syncKey
    })
    .catch((err) => {
      logger.warn('[OPGG] 自动装备集同步失败:', err)
    })
    .finally(() => {
      itemSetSyncInFlightKeys.delete(syncKey)
    })
}

function syncRecommendedItemSetWhenReady(entry: RecommendationCacheEntry): void {
  if (!store.get('smartItemSetBuild')) return
  if (!currentChampionLocked) return

  // 匹配/排位且识别不到分路时，展开五路分别写入，避免只剩中路一条
  if (shouldExpandAllPositions(entry.context)) {
    syncRankedAllPositionsItemSets(entry.context)
    return
  }

  const syncKey = getManagedItemSetUid(entry.context)
  if (lastAppliedItemSetKey === syncKey || itemSetSyncInFlightKeys.has(syncKey)) return

  itemSetSyncInFlightKeys.add(syncKey)
  entry.promise
    .then(async (recommendation) => {
      if (!recommendation || !store.get('smartItemSetBuild')) return
      if (!currentChampionLocked) return
      if (!isCurrentRecommendationContext(entry.context)) return
      if (lastAppliedItemSetKey === syncKey) return
      await upsertRecommendedItemSets([{ context: entry.context, recommendation }])
      lastAppliedItemSetKey = syncKey
    })
    .catch((err) => {
      logger.warn('[OPGG] 自动装备集同步失败:', err)
    })
    .finally(() => {
      itemSetSyncInFlightKeys.delete(syncKey)
    })
}

async function applySavedSmartRunePage(context: RecommendationContext): Promise<boolean> {
  if (!store.get('smartBuildRecommendation')) return false
  if (!currentChampionLocked) return false
  if (!isCurrentRecommendationContext(context)) return false

  const runeKey = getSmartRuneKey(context)
  if (!runeKey || lastAppliedRuneKey === runeKey || runeApplyInFlightKeys.has(runeKey)) return false

  const saved = store.get('smartRunePages')[runeKey]
  if (!saved || !isValidRunePage(saved)) return false

  runeApplyInFlightKeys.add(runeKey)
  try {
    lastAutoAppliedRuneSignature = getRunePageSignature(saved)
    suppressRuneSaveUntil = Date.now() + RUNE_APPLY_SUPPRESS_MS
    const pageName = getSmartRunePageName(context)
    await lcu.applyRunePage({
      name: pageName,
      primaryStyleId: saved.primaryStyleId,
      subStyleId: saved.subStyleId,
      selectedPerkIds: [...saved.selectedPerkIds],
    })
    lastAppliedRuneKey = runeKey
    logger.info('[OPGG] 已自动应用智能符文 → key=%s, page=%s, signature=%s', runeKey, pageName, lastAutoAppliedRuneSignature)
    return true
  } finally {
    runeApplyInFlightKeys.delete(runeKey)
  }
}

async function applySavedSmartSummonerSpells(context: RecommendationContext): Promise<boolean> {
  if (!store.get('smartBuildRecommendation')) return false
  if (!currentChampionLocked) return false
  if (!isCurrentRecommendationContext(context)) return false

  const spellKey = getSmartSpellKey(context)
  if (!spellKey || lastAppliedSpellKey === spellKey || spellApplyInFlightKeys.has(spellKey)) return false

  const saved = store.get('smartSummonerSpells')[spellKey]
  if (!saved || !isValidSummonerSpells(saved)) return false

  spellApplyInFlightKeys.add(spellKey)
  try {
    suppressSpellSaveUntil = Date.now() + SPELL_APPLY_SUPPRESS_MS
    await lcu.updateMySelection({
      spell1Id: saved.spell1Id,
      spell2Id: saved.spell2Id,
    })

    lastAppliedSpellKey = spellKey
    lastObservedSpellKey = spellKey
    lastObservedSpellSignature = getSummonerSpellSignature(saved)
    logger.info('[OPGG] 已自动恢复召唤师技能 → key=%s, spells=%s', spellKey, lastObservedSpellSignature)
    return true
  } finally {
    spellApplyInFlightKeys.delete(spellKey)
  }
}

async function applySavedSmartLoadout(context: RecommendationContext): Promise<void> {
  const [runeRestored, spellsRestored] = await Promise.all([
    applySavedSmartRunePage(context).catch((err) => {
      logger.warn('[OPGG] 智能符文自动恢复失败:', err)
      return false
    }),
    applySavedSmartSummonerSpells(context).catch((err) => {
      logger.warn('[OPGG] 智能召唤师技能自动恢复失败:', err)
      return false
    }),
  ])

  if (!runeRestored && !spellsRestored) return

  const championName = getChampionName(context.championId)
  const queueLabel = getContextQueueLabel(context)
  let restoredText = runeRestored ? '符文' : '召唤师技能'
  if (runeRestored && spellsRestored) restoredText = '符文 & 召唤师技能'

  Toast.success(`${championName} ${queueLabel} ${restoredText}已恢复 - Sona`)
}

function syncSavedSmartLoadoutWhenReady(context: RecommendationContext): void {
  if (!store.get('smartBuildRecommendation')) return
  if (!currentChampionLocked) return

  pendingSmartLoadoutContext = { ...context }
  if (smartLoadoutRestoreTimer != null) {
    window.clearTimeout(smartLoadoutRestoreTimer)
  }

  smartLoadoutRestoreTimer = window.setTimeout(() => {
    const snapshot = pendingSmartLoadoutContext
    pendingSmartLoadoutContext = null
    smartLoadoutRestoreTimer = null
    if (!snapshot) return

    applySavedSmartLoadout(snapshot).catch((err) => {
      logger.warn('[OPGG] 智能配置自动恢复失败:', err)
    })
  }, SMART_LOADOUT_RESTORE_DEBOUNCE_MS)
}

function stopChampionLockPolling() {
  if (championLockPollTimer != null) {
    window.clearTimeout(championLockPollTimer)
    championLockPollTimer = null
  }
  championLockPollAttempts = 0
}

function scheduleRefreshWhenChampionLocked(delay = 250) {
  if (championLockPollTimer != null) return

  championLockPollTimer = window.setTimeout(async () => {
    championLockPollTimer = null
    championLockPollAttempts++

    try {
      const phase = await lcu.getGameflowPhase().catch(() => null)
      if (phase !== 'ChampSelect') {
        stopChampionLockPolling()
        return
      }

      const session = await lcu.getChampSelectSession()
      if (!await isSummonersRiftChampSelect(session)) {
        unmount()
        return
      }
      if (isLocalChampionLocked(session)) {
        stopChampionLockPolling()
        await refreshContext(session)
        return
      }
    } catch {
      // ChampSelect session may not be ready immediately after phase changes.
    }

    if (championLockPollAttempts < 600) {
      scheduleRefreshWhenChampionLocked(500)
    } else {
      stopChampionLockPolling()
      logger.warn('[OPGG] 等待本地英雄锁定超时，未触发智能配置')
    }
  }, delay)
}

async function refreshContext(session?: ChampSelectSession) {
  const refreshToken = ++contextRefreshToken
  try {
    const currentSession = session ?? await lcu.getChampSelectSession()
    const localPlayer = getLocalPlayer(currentSession)
    const queueId = currentSession.queueId ?? 0
    const championId = localPlayer?.championId ?? getLocalChampionId(currentSession)
    const { gameMode, mapId } = await resolveGameContext(queueId)
    const assignedPosition = mapAssignedPosition(localPlayer?.assignedPosition)
    const position = await resolveInitialRecommendationPosition({
      championId,
      queueId,
      gameMode,
      mapId,
      assignedPosition,
    })
    if (refreshToken !== contextRefreshToken) return

    currentChampionLocked = isLocalChampionLocked(currentSession)
    currentContext = {
      championId,
      queueId,
      gameVersion: currentContext.gameVersion,
      gameMode,
      mapId,
      position,
    }

    if (!isSummonersRift(currentContext)) {
      unmount(false)
      return
    }

    if (localPlayer) {
      saveCurrentSmartSummonerSpells(localPlayer, currentContext)
    }

    if (!currentContext.gameVersion) {
      currentContext.gameVersion = await lcu.getGameVersion().catch(() => '')
    }

    logger.info(
      '[OPGG] ChampSelect context refreshed → championId=%d, queueId=%d, gameMode=%s, position=%s, version=%s',
      currentContext.championId,
      currentContext.queueId,
      currentContext.gameMode || 'unknown',
      currentContext.position,
      currentContext.gameVersion || 'unknown',
    )

    if (currentContext.championId > 0) {
      if (store.get('opggBuildRecommendation')) {
        mount()
      } else {
        unmountPanel()
      }
      const cacheEntry = ensureRecommendationPrefetch(currentContext)
      if (cacheEntry && currentChampionLocked) {
        syncRecommendedItemSetWhenReady(cacheEntry)
      }
      if (currentChampionLocked) {
        syncSavedSmartLoadoutWhenReady(currentContext)
        const timerPhase = currentSession.timer?.phase
        if (timerPhase === 'FINALIZATION' || timerPhase === 'GAME_STARTING') {
          void persistFinalSmartLoadoutSnapshot(currentSession, { ...currentContext }, `champ-select:${timerPhase}`)
        }
      }
    } else {
      unmount(false)
    }
  } catch (err) {
    logger.warn('[OPGG] 刷新选人上下文失败:', err)
  }
}

function closePanel() {
  if (panelReactRoot) {
    panelReactRoot.unmount()
    panelReactRoot = null
  }
  document.getElementById(PANEL_ID)?.remove()
  activePanelKey = ''
  if (outsideCloseHandler) {
    document.removeEventListener('mousedown', outsideCloseHandler, true)
    outsideCloseHandler = null
  }
}

function closeInGameBuildRecommendationModal() {
  if (!inGameModalRoot) return

  const close = () => closeInGameBuildRecommendationModal()
  inGameModalRoot.render(
    createElement(Modal, {
      open: false,
      onClose: close,
      width: 1120,
      height: 700,
      closable: false,
      children: createElement('div'),
    }),
  )

  window.setTimeout(() => {
    if (inGameModalRoot) {
      inGameModalRoot.unmount()
      inGameModalRoot = null
    }
    if (inGameModalContainer) {
      inGameModalContainer.remove()
      inGameModalContainer = null
    }
  }, 240)
}

function cleanupInGameBuildRecommendationModal() {
  if (inGameModalRoot) {
    inGameModalRoot.unmount()
    inGameModalRoot = null
  }
  if (inGameModalContainer) {
    inGameModalContainer.remove()
    inGameModalContainer = null
  }
}

function renderInGameBuildRecommendationModal(
  context: RecommendationContext,
  cacheEntry: RecommendationCacheEntry | null,
  token: number,
) {
  if (!inGameModalContainer) {
    inGameModalContainer = document.createElement('div')
    inGameModalContainer.id = 'sona-opgg-ingame-modal-root'
    document.body.appendChild(inGameModalContainer)
    inGameModalRoot = createRoot(inGameModalContainer)
  }

  const recommendation = cacheEntry?.data ?? null
  const loadError = cacheEntry?.error ?? ''
  const isLoading = Boolean(cacheEntry && cacheEntry.data === undefined && !cacheEntry.error)
  const close = () => closeInGameBuildRecommendationModal()
  const handleTierChange = (tier: OpggTier) => {
    const nextTier = normalizeOpggTier(tier)
    store.set('opggBuildRecommendationTier', nextTier)
    recommendationCache.delete(getRecommendationCacheKey(context))
    const nextEntry = ensureRecommendationPrefetch(context)
    const nextToken = ++inGameModalRenderToken
    renderInGameBuildRecommendationModal(context, nextEntry, nextToken)
    scheduleInGameModalRefresh(context, nextEntry, nextToken)
  }
  const handlePositionChange = (position: OpggPosition) => {
    const nextPosition = mapAssignedPosition(position)
    if (nextPosition === 'none' || nextPosition === context.position) return

    const nextContext = { ...context, position: nextPosition }
    currentContext = { ...nextContext }
    const nextEntry = ensureRecommendationPrefetch(nextContext)
    if (nextEntry && currentChampionLocked) syncRecommendedItemSetWhenReady(nextEntry)
    const nextToken = ++inGameModalRenderToken
    renderInGameBuildRecommendationModal(nextContext, nextEntry, nextToken)
    scheduleInGameModalRefresh(nextContext, nextEntry, nextToken)
  }

  inGameModalRoot!.render(
    createElement(Modal, {
      open: true,
      onClose: close,
      width: 1120,
      height: 700,
      closable: false,
      children: createElement('div', { className: 'sona-opgg-modal-content' },
        createElement(OpggBuildRecommendationPanel, {
          context,
          recommendation,
          loadError,
          isLoading,
          selectedTier: getSelectedOpggTier(),
          onTierChange: handleTierChange,
          onPositionChange: handlePositionChange,
          onClose: close,
        }),
      ),
    }),
  )

  scheduleInGameModalRefresh(context, cacheEntry, token)
}

function scheduleInGameModalRefresh(
  context: RecommendationContext,
  cacheEntry: RecommendationCacheEntry | null,
  token: number,
) {
  if (!cacheEntry || cacheEntry.data !== undefined || cacheEntry.error) return

  cacheEntry.promise.then(() => {
    if (token !== inGameModalRenderToken || !inGameModalRoot) return
    renderInGameBuildRecommendationModal(context, cacheEntry, token)
  }).catch(() => {
    if (token !== inGameModalRenderToken || !inGameModalRoot) return
    renderInGameBuildRecommendationModal(context, cacheEntry, token)
  })
}

async function resolveInGameRecommendationContext(): Promise<RecommendationContext> {
  const [session, summoner] = await Promise.all([
    lcu.getGameflowSession(),
    lcu.getSummonerInfo(),
  ])

  const selection = session.gameData?.playerChampionSelections?.find((item) => item.puuid === summoner.puuid)
  const players = [
    ...(session.gameData?.teamOne ?? []),
    ...(session.gameData?.teamTwo ?? []),
  ]
  const player = players.find((item) => item.puuid === summoner.puuid || item.obfuscatedPuuid === summoner.puuid)
  const championId = selection?.championId || player?.championId || currentContext.championId

  if (!championId) {
    throw new Error('无法识别当前英雄')
  }

  const queueId = session.gameData?.queue?.id ?? currentContext.queueId
  const gameMode = session.gameData?.queue?.gameMode || session.map?.gameMode || currentContext.gameMode
  const mapId = session.map?.id ?? session.gameData?.queue?.mapId
  const assignedPosition = mapAssignedPosition(player?.selectedPosition || player?.selectedRole || currentContext.position)
  const position = await resolveInitialRecommendationPosition({
    championId,
    queueId,
    gameMode,
    mapId,
    assignedPosition,
  })

  return {
    championId,
    queueId,
    gameVersion: currentContext.gameVersion || await lcu.getGameVersion().catch(() => ''),
    gameMode,
    mapId,
    position,
  }
}

export async function showOpggBuildRecommendationModal() {
  const context = await resolveInGameRecommendationContext()
  if (!isSummonersRift(context)) return
  currentContext = { ...context }
  const cacheEntry = ensureRecommendationPrefetch(context)
  const token = ++inGameModalRenderToken
  renderInGameBuildRecommendationModal(context, cacheEntry, token)
}

async function openRecommendationPanel(anchor: HTMLElement, contextOverride?: RecommendationContext) {
  if (contextOverride) {
    currentContext = { ...contextOverride }
  } else if (currentContext.championId <= 0) {
    await refreshContext()
  } else {
    void refreshContext()
  }

  const context = contextOverride ? { ...contextOverride } : { ...currentContext }
  if (!isSummonersRift(context)) return
  const cacheEntry = ensureRecommendationPrefetch(context)
  const recommendation = cacheEntry?.data ?? null
  const loadError = cacheEntry?.error ?? ''
  const isLoading = Boolean(cacheEntry && cacheEntry.data === undefined && !cacheEntry.error)

  closePanel()
  activePanelKey = cacheEntry?.key ?? ''

  const manager = document.getElementById('lol-uikit-layer-manager-wrapper') ?? document.body
  const root = document.createElement('div')
  root.id = PANEL_ID
  root.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:19002',
    'width:0',
    'height:0',
    'overflow:visible',
    'pointer-events:none',
  ].join(';')

  const container = document.createElement('div')
  container.style.cssText = [
    'position:absolute',
    'opacity:0',
    'visibility:hidden',
    'pointer-events:auto',
    'transition:opacity 0.16s ease-out',
  ].join(';')
  root.appendChild(container)

  const tooltip = document.createElement('lol-uikit-tooltip')
  tooltip.setAttribute('data-tooltip-position', 'top')
  container.appendChild(tooltip)

  const view = document.createElement('div')
  view.style.cssText = [
    'width:1060px',
    'max-width:calc(100vw - 56px)',
    'background:#010a13',
    'direction:ltr',
    'color:#a09b8c',
    'font-family:var(--font-body), -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    '-webkit-font-smoothing:subpixel-antialiased',
    'font-size:12px',
    'font-weight:400',
    'letter-spacing:.025em',
    'line-height:16px',
  ].join(';')
  tooltip.appendChild(view)

  const reactRoot = createRoot(view)
  panelReactRoot = reactRoot
  const handleTierChange = (tier: OpggTier) => {
    const nextTier = normalizeOpggTier(tier)
    store.set('opggBuildRecommendationTier', nextTier)
    recommendationCache.delete(getRecommendationCacheKey(context))
    const cacheEntry = ensureRecommendationPrefetch(context)
    if (cacheEntry) syncRecommendedItemSetWhenReady(cacheEntry)
    void openRecommendationPanel(anchor, context)
  }
  const handlePositionChange = (position: OpggPosition) => {
    const nextPosition = mapAssignedPosition(position)
    if (nextPosition === 'none' || nextPosition === context.position) return

    const nextContext = { ...context, position: nextPosition }
    currentContext = { ...nextContext }
    const nextEntry = ensureRecommendationPrefetch(nextContext)
    if (nextEntry && currentChampionLocked) syncRecommendedItemSetWhenReady(nextEntry)
    void openRecommendationPanel(anchor, nextContext)
  }

  renderRecommendationPanel(
    reactRoot,
    context,
    recommendation,
    loadError,
    isLoading,
    getSelectedOpggTier(),
    handleTierChange,
    handlePositionChange,
  )
  manager.appendChild(root)

  const rect = anchor.getBoundingClientRect()
  const width = container.offsetWidth
  const height = container.offsetHeight
  const margin = 8
  const left = Math.max(20, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - 20))
  const top = Math.max(20, rect.top - height - margin)

  container.style.left = `${left}px`
  container.style.top = `${top}px`
  container.style.visibility = 'visible'
  container.style.opacity = '1'

  outsideCloseHandler = (event: MouseEvent) => {
    const target = event.target as Node
    if (!root.contains(target) && !anchor.contains(target)) {
      closePanel()
    }
  }
  requestAnimationFrame(() => {
    if (outsideCloseHandler) document.addEventListener('mousedown', outsideCloseHandler, true)
  })

  if (cacheEntry && isLoading) {
    cacheEntry.promise.then(() => {
      if (document.getElementById(PANEL_ID) !== root || activePanelKey !== cacheEntry.key || panelReactRoot !== reactRoot) return

      renderRecommendationPanel(
        reactRoot,
        cacheEntry.context,
        cacheEntry.data ?? null,
        cacheEntry.error ?? '',
        false,
        getSelectedOpggTier(),
        handleTierChange,
        handlePositionChange,
      )

      const updatedRect = anchor.getBoundingClientRect()
      const updatedWidth = container.offsetWidth
      const updatedHeight = container.offsetHeight
      const updatedLeft = Math.max(20, Math.min(updatedRect.left + updatedRect.width / 2 - updatedWidth / 2, window.innerWidth - updatedWidth - 20))
      const updatedTop = Math.max(20, updatedRect.top - updatedHeight - margin)
      container.style.left = `${updatedLeft}px`
      container.style.top = `${updatedTop}px`
    })
  }
}

export async function openOpggBuildRecommendationDebugPanel(
  anchor: HTMLElement,
  championId = 68,
  contextOverride: Partial<Omit<RecommendationContext, 'championId' | 'gameVersion'>> = {},
) {
  const gameVersion = await lcu.getGameVersion().catch(() => currentContext.gameVersion)
  await openRecommendationPanel(anchor, {
    championId,
    queueId: contextOverride.queueId ?? 420,
    gameVersion,
    gameMode: contextOverride.gameMode ?? 'CLASSIC',
    mapId: contextOverride.mapId ?? 11,
    position: contextOverride.position ?? 'none',
  })
}

function renderRecommendationPanel(
  root: Root,
  context: RecommendationContext,
  recommendation: BuildRecommendation | null,
  loadError: string,
  isLoading: boolean,
  selectedTier: OpggTier,
  onTierChange: (tier: OpggTier) => void,
  onPositionChange: (position: OpggPosition) => void,
): void {
  flushSync(() => {
    root.render(createElement(OpggBuildRecommendationPanel, {
      context,
      recommendation,
      loadError,
      isLoading,
      selectedTier,
      onTierChange,
      onPositionChange,
      onClose: closePanel,
    }))
  })
}

function tryHijackAbilityPreviewPanel(): boolean {
  if (!isSummonersRift(currentContext)) return false
  const targets = document.querySelectorAll(`${TARGET_SELECTOR}:not([${HIJACK_ATTR}])`)
  if (targets.length === 0) {
    logger.info('[OPGG] 未找到技能预览面板元素')
    return false
  }

  targets.forEach((target) => {
    if (!(target instanceof HTMLElement)) return
    const originalText = target.innerText

    const handler = (event: Event) => {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
      if (document.getElementById(PANEL_ID)) {
        closePanel()
        return
      }
      openRecommendationPanel(target)
    }

    target.setAttribute(HIJACK_ATTR, 'true')
    target.innerText = '配装推荐'
    target.style.cursor = 'pointer'
    target.addEventListener('click', handler, true)
    boundElements.push({ el: target, handler, originalText })
  })

  logger.info('[OPGG] 已接管技能预览面板点击 → %d 个元素', targets.length)
  return true
}

function tryInjectInGameBuildButton(): boolean {
  const container = document.querySelector('.game-in-progress-container')
  if (!container) return false

  if (container.querySelector(`[${IN_GAME_BUILD_BUTTON_ATTR}]`)) return true

  const btn = document.createElement('lol-uikit-flat-button')
  btn.setAttribute(IN_GAME_BUILD_BUTTON_ATTR, 'true')
  btn.textContent = '配装推荐'
  // 布局（display / 间距）统一在 inject.css 里处理，两个按钮的注入先后不固定

  btn.addEventListener('click', (event) => {
    event.stopPropagation()
    event.preventDefault()
    showOpggBuildRecommendationModal().catch((err) => {
      logger.warn('[OPGG] 游戏内配装推荐弹窗打开失败:', err)
      if (typeof Toast !== 'undefined') {
        Toast.error('配装推荐打开失败，请稍后再试')
      }
    })
  })

  const gameAnalysisBtn = container.querySelector('[data-sona-game-analysis]')
  if (gameAnalysisBtn?.parentElement === container) {
    gameAnalysisBtn.insertAdjacentElement('afterend', btn)
  } else {
    container.appendChild(btn)
  }

  logger.info('[OPGG] 游戏内配装推荐按钮已注入 ✓')
  return true
}

function registerInGameBuildButton() {
  if (inGameBuildButtonRegistered) return

  const token = ++inGameBuildButtonToken
  lcu.getGameflowSession().then((session) => {
    if (token !== inGameBuildButtonToken) return
    if (!isSummonersRiftGameflow(session) || inGameBuildButtonRegistered) return
    injector.register(tryInjectInGameBuildButton)
    inGameBuildButtonRegistered = true
  }).catch(() => { /* ignore */ })
}

function unregisterInGameBuildButton() {
  inGameBuildButtonToken += 1
  if (inGameBuildButtonRegistered) {
    injector.unregister(tryInjectInGameBuildButton)
    inGameBuildButtonRegistered = false
  }

  document.querySelectorAll(`[${IN_GAME_BUILD_BUTTON_ATTR}]`).forEach((element) => element.remove())
  cleanupInGameBuildRecommendationModal()
}

function mount() {
  if (!injectRegistered) {
    injector.register(tryHijackAbilityPreviewPanel)
    injectRegistered = true
    logger.info('[OPGG] 已检测到本地英雄，开始接管技能预览入口')
  }
}

function unmountPanel() {
  if (injectRegistered) {
    injector.unregister(tryHijackAbilityPreviewPanel)
    injectRegistered = false
  }

  for (const { el, handler, originalText } of boundElements) {
    el.removeEventListener('click', handler, true)
    el.removeAttribute(HIJACK_ATTR)
    el.innerText = originalText
    el.style.cursor = ''
  }
  boundElements.length = 0
  closePanel()
}

function unmount(resetContext = true) {
  contextRefreshToken += 1
  stopChampionLockPolling()
  stopRunePagePolling()
  unmountPanel()
  if (resetContext) {
    currentContext = {
      championId: 0,
      queueId: 0,
      gameVersion: currentContext.gameVersion,
      gameMode: '',
      position: 'none',
    }
  }
  currentChampionLocked = false
  lastAppliedItemSetKey = ''
  lastAppliedRuneKey = ''
  lastAppliedSpellKey = ''
  lastAutoAppliedRuneSignature = ''
  suppressRuneSaveUntil = 0
  suppressSpellSaveUntil = 0
  if (smartLoadoutRestoreTimer != null) {
    window.clearTimeout(smartLoadoutRestoreTimer)
    smartLoadoutRestoreTimer = null
  }
  pendingSmartLoadoutContext = null
  lastObservedSpellKey = ''
  lastObservedSpellSignature = ''
  lastObservedRuneSnapshot = null
  lastObservedSpellSnapshot = null
  lastRuneSaveChatSignature = ''
  lastRuneSaveChatAt = 0
  itemSetSyncInFlightKeys.clear()
  runeApplyInFlightKeys.clear()
  spellApplyInFlightKeys.clear()
  smartLoadoutFinalSaveInFlightKeys.clear()
  smartLoadoutFirstSavedRuneKeys.clear()
  smartLoadoutFirstSavedSpellKeys.clear()
}

function startOpggListeners() {
  if (phaseUnsub) return

  phaseUnsub = lcu.observe(LcuEventUri.GAMEFLOW_PHASE_CHANGE, (event: LCUEventMessage) => {
    const phase = event.data as GameflowPhase
    if ((phase === 'GameStart' || phase === 'InProgress') && currentChampionLocked && currentContext.championId > 0) {
      persistObservedSmartLoadoutSnapshot({ ...currentContext }, `gameflow:${phase}`)
    }

    if (phase === 'ChampSelect') {
      unregisterInGameBuildButton()
      logger.info('[OPGG] 进入 ChampSelect，等待本地英雄锁定')
      startRunePagePolling()
      scheduleRefreshWhenChampionLocked()
    } else if (phase === 'InProgress') {
      unmount()
      registerInGameBuildButton()
    } else {
      unregisterInGameBuildButton()
      unmount()
    }
  })

  champSelectUnsub = lcu.observe(LcuEventUri.CHAMP_SELECT, (event: LCUEventMessage) => {
    if (event.eventType !== 'Create' && event.eventType !== 'Update') return
    const session = event.data as ChampSelectSession
    if (isLocalChampionLocked(session)) {
      stopChampionLockPolling()
      refreshContext(session)
    } else {
      scheduleRefreshWhenChampionLocked(500)
    }
  })

  lcu.getGameflowPhase().then((phase) => {
    if (phase === 'ChampSelect') {
      startRunePagePolling()
      scheduleRefreshWhenChampionLocked()
    } else if (phase === 'InProgress') {
      registerInGameBuildButton()
    }
  }).catch(() => { /* ignore */ })

  logger.info('[OPGG] 配装推荐接管已启用 ✓')
}

export function updateOpggBuildRecommendation(enabled: boolean) {
  if (enabled && !phaseUnsub) {
    startOpggListeners()
  } else if (enabled && phaseUnsub) {
    lcu.getGameflowPhase().then((phase) => {
      if (phase === 'ChampSelect') {
        scheduleRefreshWhenChampionLocked()
      } else if (phase === 'InProgress') {
        registerInGameBuildButton()
      }
    }).catch(() => { /* ignore */ })
  } else if (!enabled) {
    if (!phaseUnsub) return

    phaseUnsub()
    phaseUnsub = null
    unregisterInGameBuildButton()
    if (champSelectUnsub) {
      champSelectUnsub()
      champSelectUnsub = null
    }
    unmount()
    logger.info('[OPGG] 配装推荐接管已禁用')
  }
}
