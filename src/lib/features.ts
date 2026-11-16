/**
 * 功能管理模块
 *
 * 监听 store 配置变化，自动开启/关闭对应的插件功能。
 * 在 index.tsx 的 load() 中调用 initFeatures() 即可。
 */

import { logger } from '@/index'
import { store } from '@/lib/store'
import { lcu, LcuEventUri, queueIdToTag } from '@/lib/lcu'
import type { LCUEventMessage, GameflowPhase, ChampSelectSession } from '@/lib/lcu'
import { injector } from '@/lib/InjectorManager'
import { isSummonersRiftChampSelect } from '@/lib/game-context'
import { updateLobbyMemberMatchHistory } from '@/lib/features/lobby-member-match-history'
import { updateGameAnalysisPopup } from '@/lib/features/game-analysis-popup'
import { updateOpggBuildRecommendation } from '@/lib/features/opgg-build-recommendation'
import { updateChampSelectTierBadge } from '@/lib/features/champselect-tier-badge'
import {
  calculateSonaPlayerStrengthScore,
  filterSonaStrengthGamesByQueue,
  shouldSkipSonaStrengthGame,
  type SonaPlayerStrengthScore,
} from '@/lib/player-strength-score'
import { deobfuscateChampSelectPuuid } from '@/lib/champ-select-puuid'

// ==================== 共享：查询队友胜率 ====================

type ChampSelectTeamPlayer = ChampSelectSession['myTeam'][number]

interface TeammateStats {
  floor: number
  summonerId: number
  puuid: string
  obfuscatedSummonerId: number
  obfuscatedPuuid: string
  gameName: string
  tagLine: string
  winRate: number | null  // null = 查询失败或无战绩
  wins: number
  total: number
  avgK: number
  avgD: number
  avgA: number
  kdaNum: number
  strengthScore: SonaPlayerStrengthScore | null
}

interface TeamStatsResult {
  stats: TeammateStats[]
  queueId: number
}

function getPlayerStatsKey(player: Pick<ChampSelectTeamPlayer, 'puuid' | 'summonerId' | 'obfuscatedPuuid' | 'obfuscatedSummonerId' | 'cellId'>): string {
  if (player.puuid) return `puuid:${player.puuid}`
  if (player.summonerId) return `summoner:${player.summonerId}`
  if (player.obfuscatedPuuid) return `obfuscated-puuid:${player.obfuscatedPuuid}`
  if (player.obfuscatedSummonerId) return `obfuscated-summoner:${player.obfuscatedSummonerId}`
  return `cell:${player.cellId}`
}

function getTeammateStatsKey(stat: TeammateStats): string {
  // 匿名模式下优先使用会话中的混淆 ID，换楼后仍可与最新 session 稳定对应。
  if (stat.obfuscatedPuuid) return `obfuscated-puuid:${stat.obfuscatedPuuid}`
  if (stat.obfuscatedSummonerId) return `obfuscated-summoner:${stat.obfuscatedSummonerId}`
  if (stat.puuid) return `puuid:${stat.puuid}`
  if (stat.summonerId) return `summoner:${stat.summonerId}`
  return `floor:${stat.floor}`
}

/**
 * 正常模式直接使用 puuid；匿名模式则还原 obfuscatedPuuid。
 * 只处理 HIDDEN，避免未来客户端引入其他可见性类型时误判。
 */
function resolveChampSelectPuuid(player: ChampSelectTeamPlayer): string {
  if (player.puuid) return player.puuid
  if (player.nameVisibilityType !== 'HIDDEN' || !player.obfuscatedPuuid) return ''
  return deobfuscateChampSelectPuuid(player.obfuscatedPuuid)
}

/**
 * 查询当前选人阶段所有队友的近期战绩
 * 头像战绩与队内评级共用一次查询，按当前模式及配置的局数过滤。
 * 返回队列 ID 与队友统计。
 */
async function fetchTeamStats(): Promise<TeamStatsResult> {
  const session = await lcu.getChampSelectSession()
  if (!await isSummonersRiftChampSelect(session)) return { queueId: session.queueId, stats: [] }

  // 直接从 ChampSelectSession 拿 queueId，无需额外请求
  const currentQueueId = session.queueId
  logger.info('[TeamStats] 当前队列 ID: %d', currentQueueId)

  // 将 queueId 转为 SGP tag
  const tag = queueIdToTag(currentQueueId)

  // 取两个功能中较大的查询局数，确保数据充足（两者共用同一轮请求）
  const FETCH_COUNT = Math.max(
    store.get('champSelectAssist') ? (store.get('champSelectAssistFetchCount') || 50) : 0,
    store.get('analyzeTeamPower') ? (store.get('analyzeTeamPowerFetchCount') || 50) : 0,
    20,
  )

  /** 构造占位元素：查询失败时仍保留身份信息，供弹窗标题与换楼匹配使用 */
  const placeholder = (
    player: ChampSelectTeamPlayer,
    i: number,
    resolvedPuuid = resolveChampSelectPuuid(player),
    resolvedIdentity?: { summonerId?: number; gameName?: string; tagLine?: string },
  ): TeammateStats => ({
    floor: i + 1,
    summonerId: resolvedIdentity?.summonerId || player.summonerId,
    puuid: resolvedPuuid,
    obfuscatedSummonerId: player.obfuscatedSummonerId,
    obfuscatedPuuid: player.obfuscatedPuuid,
    gameName: resolvedIdentity?.gameName || player.gameName,
    tagLine: resolvedIdentity?.tagLine || player.tagLine,
    winRate: null,
    wins: 0,
    total: 0,
    avgK: 0,
    avgD: 0,
    avgA: 0,
    kdaNum: 0,
    strengthScore: null,
  })

  // 跳过查不到身份数据的占位玩家，其余保留占位以对齐楼层索引。
  const analyzablePlayers = getAnalyzableTeamPlayers(session)
  const hiddenPlayers = analyzablePlayers.filter((player) => player.nameVisibilityType === 'HIDDEN' && !player.puuid)
  if (hiddenPlayers.length > 0) {
    const resolvedCount = hiddenPlayers.filter((player) => Boolean(resolveChampSelectPuuid(player))).length
    logger.info('[TeamStats] 匿名模式身份还原: %d/%d', resolvedCount, hiddenPlayers.length)
  }

  const stats = await Promise.all(analyzablePlayers.map(async (player, i) => {
    const puuid = resolveChampSelectPuuid(player)
    if (!puuid) {
      logger.warn('[TeamStats] %d楼缺少可查询的 PUUID（visibility=%s）', i + 1, player.nameVisibilityType || 'unknown')
      return placeholder(player, i, '')
    }

    const needsIdentityBackfill = !player.gameName || !player.tagLine || !player.summonerId
    // 匿名模式的 ChampSelectSession 会清空 Riot ID；用已还原的真实 PUUID 从 Summoner 接口回填。
    const identityPromise = needsIdentityBackfill
      ? lcu.getSummonerByPuuid(puuid).catch((error) => {
          logger.warn('[TeamStats] %d楼 Riot ID 回填失败:', i + 1, error)
          return null
        })
      : Promise.resolve(null)

    try {
      // 与 SGP 并行请求，避免给队友战力分析增加串行等待时间。
      const [resp, summoner] = await Promise.all([
        lcu.getSgpMatchHistory(puuid, {
          startIndex: 0,
          count: FETCH_COUNT,
          tag: tag || undefined,
        }),
        identityPromise,
      ])
      const gameName = player.gameName || summoner?.gameName || summoner?.displayName || ''
      const tagLine = player.tagLine || summoner?.tagLine || ''
      const summonerId = player.summonerId || summoner?.summonerId || 0
      const resolvedIdentity = { summonerId, gameName, tagLine }

      if (needsIdentityBackfill && gameName) {
        logger.info('[TeamStats] %d楼匿名 Riot ID 回填成功 → %s%s', i + 1, gameName, tagLine ? `#${tagLine}` : '')
      }

      const receivedGames = resp.games ?? []
      const games = filterSonaStrengthGamesByQueue(receivedGames, currentQueueId)

      const matchStats: Array<{ kills: number; deaths: number; assists: number; win: boolean }> = []

      for (const game of games) {
        const p = game.json.participants.find((pt) => pt.puuid === puuid)
        if (!p) continue
        if (shouldSkipSonaStrengthGame(game, puuid)) continue

        matchStats.push({
          kills: p.kills,
          deaths: p.deaths,
          assists: p.assists,
          win: p.win,
        })
      }

      if (matchStats.length === 0) {
        return placeholder(player, i, puuid, resolvedIdentity)
      }

      let wins = 0, totalKills = 0, totalDeaths = 0, totalAssists = 0
      for (const g of matchStats) {
        if (g.win) wins++
        totalKills += g.kills
        totalDeaths += g.deaths
        totalAssists += g.assists
      }

      const total = matchStats.length
      const strengthScore = calculateSonaPlayerStrengthScore(games, puuid)
      logger.info(
        '[TeamStats] %s → 当前模式有效 %d 场 / 返回 %d 场 (queueId=%d, tag=%s)',
        gameName,
        total,
        receivedGames.length,
        currentQueueId,
        tag || '全部',
      )

      return {
        floor: i + 1,
        summonerId,
        puuid,
        obfuscatedSummonerId: player.obfuscatedSummonerId,
        obfuscatedPuuid: player.obfuscatedPuuid,
        gameName,
        tagLine,
        winRate: (wins / total) * 100,
        wins,
        total,
        avgK: totalKills / total,
        avgD: totalDeaths / total,
        avgA: totalAssists / total,
        kdaNum: totalDeaths === 0 ? totalKills + totalAssists : (totalKills + totalAssists) / totalDeaths,
        strengthScore,
      } as TeammateStats
    } catch (error) {
      logger.warn('[TeamStats] %d楼战绩查询失败（visibility=%s）:', i + 1, player.nameVisibilityType || 'unknown', error)
      // 即使 SGP 失败，也等待已发出的 Summoner 请求，以免弹窗标题和日志再次丢失名字。
      const summoner = await identityPromise
      return placeholder(player, i, puuid, {
        summonerId: player.summonerId || summoner?.summonerId || 0,
        gameName: player.gameName || summoner?.gameName || summoner?.displayName || '',
        tagLine: player.tagLine || summoner?.tagLine || '',
      })
    }
  }))

  return { queueId: currentQueueId, stats }
}

// ==================== 选人阶段头像胜率特效 (champSelectAssist) ====================

import { createElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { ChampSelectIconEffect, getTierConfig } from '@/components/ui/ChampSelectIconEffect'
import { MatchHistoryModal } from '@/components/ui/MatchHistoryModal'

const SONA_TIER_ATTR = 'data-sona-tier'
const SONA_STATS_ATTR = 'data-sona-stats'
const SONA_CLICK_ATTR = 'data-sona-click'
const SONA_PLAYER_KEY_ATTR = 'data-sona-player-key'
const SONA_HIDDEN_NAME_ATTR = 'data-sona-hidden-player-name'
const SONA_HIDDEN_NAME_KEY_ATTR = 'data-sona-hidden-player-key'
const SONA_HIDDEN_REAL_NAME_ATTR = 'data-sona-hidden-real-name'
const SONA_HIDDEN_NAME_SUFFIX_ATTR = 'data-sona-hidden-name-suffix'
const SONA_HIDDEN_NAME_STYLE_ID = 'sona-hidden-player-name-style'

/** 每个楼层的完整战绩缓存 */
let floorStats: TeammateStats[] = []
/** puuid → TeammateStats 映射，用于换楼后按新顺序重建 floorStats */
let statsByPuuid = new Map<string, TeammateStats>()
/** summonerId → TeammateStats 映射，用于 puuid 不可用时兜底匹配 */
let statsBySummonerId = new Map<number, TeammateStats>()
/** obfuscatedPuuid → TeammateStats 映射，用于匿名模式换楼后的稳定匹配 */
let statsByObfuscatedPuuid = new Map<string, TeammateStats>()
/** obfuscatedSummonerId → TeammateStats 映射，作为匿名模式的第二层兜底 */
let statsByObfuscatedSummonerId = new Map<number, TeammateStats>()
/** 当前 DOM 展示顺序签名，用于位置互换后触发重绑 */
let currentChampSelectTeamSignature = ''
/** 当前选人阶段的队列 ID，用于打开战绩弹窗时自动过滤 */
let currentChampSelectQueueId = 0

/** 选人阶段注入的 DOM 引用，离开 ChampSelect 时直接从 ref 清理，不依赖 querySelector */
interface ChampSelectInjectedRef {
  /** 我们创建的 stats div（胜率/KDA） */
  statsDiv: HTMLDivElement
  /** 被修改了 style 的 iconContainer */
  iconContainer: HTMLElement
  /** 被修改了 overflow 的 summonerContainer（可能为 null） */
  summonerContainer: HTMLElement | null
  /** 被修改了 style 的 playerDetails */
  playerDetails: HTMLElement
  /** iconContainer 上的 click handler，清理时需要 removeEventListener */
  clickHandler: ((e: Event) => void) | null
}
let champSelectInjectedRefs: ChampSelectInjectedRef[] = []

/** 匿名玩家名字增强的 DOM 引用；与战绩引用分开，保证无近期战绩时也能展示真实名字 */
interface ChampSelectHiddenNameRef {
  nameElement: HTMLElement
  suffixElement: HTMLSpanElement
  playerKey: string
  originalAlias: string
  previousTitle: string | null
  previousAriaLabel: string | null
}
let champSelectHiddenNameRefs: ChampSelectHiddenNameRef[] = []

/** 战绩弹窗的独立 React root */
let matchModalRoot: Root | null = null
let matchModalContainer: HTMLDivElement | null = null

function showMatchHistoryModal(puuid: string, playerName: string, queueId?: number) {
  if (!matchModalContainer) {
    matchModalContainer = document.createElement('div')
    matchModalContainer.id = 'sona-match-history-modal-root'
    document.body.appendChild(matchModalContainer)
    matchModalRoot = createRoot(matchModalContainer)
  }

  const close = () => {
    matchModalRoot?.render(
      createElement(MatchHistoryModal, { open: false, onClose: close, puuid: '', playerName: '' }),
    )
  }

  matchModalRoot!.render(
    createElement(MatchHistoryModal, { open: true, onClose: close, puuid, playerName, queueId }),
  )
}

function cleanupMatchModal() {
  if (matchModalRoot) {
    matchModalRoot.unmount()
    matchModalRoot = null
  }
  if (matchModalContainer) {
    matchModalContainer.remove()
    matchModalContainer = null
  }
}

function ensureHiddenPlayerNameStyle() {
  if (document.getElementById(SONA_HIDDEN_NAME_STYLE_ID)) return

  const style = document.createElement('style')
  style.id = SONA_HIDDEN_NAME_STYLE_ID
  style.textContent = `
    .player-name-wrapper[${SONA_HIDDEN_NAME_ATTR}]::before {
      content: attr(${SONA_HIDDEN_REAL_NAME_ATTR}) "(";
    }

    .player-name-wrapper[${SONA_HIDDEN_NAME_ATTR}] > [${SONA_HIDDEN_NAME_SUFFIX_ATTR}] {
      display: inline-flex !important;
      align-items: center;
      gap: 3px;
      vertical-align: -1px;
      white-space: nowrap;
      pointer-events: none;
    }

    .player-name-wrapper[${SONA_HIDDEN_NAME_ATTR}] > [${SONA_HIDDEN_NAME_SUFFIX_ATTR}] > svg {
      width: 11px;
      height: 11px;
      flex: 0 0 11px;
      color: #e6c76a !important;
      -webkit-text-fill-color: #e6c76a !important;
      filter: drop-shadow(0 0 3px rgba(200, 170, 110, 0.55));
    }
  `
  document.head.appendChild(style)
}

function createHiddenNameSuffix(): HTMLSpanElement {
  const suffix = document.createElement('span')
  suffix.setAttribute(SONA_HIDDEN_NAME_SUFFIX_ATTR, 'true')
  suffix.setAttribute('aria-hidden', 'true')
  suffix.appendChild(document.createTextNode(')'))

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 16 16')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('focusable', 'false')

  const shackle = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  shackle.setAttribute('d', 'M5 7V5a3 3 0 0 1 6 0v2')
  shackle.setAttribute('stroke', 'currentColor')
  shackle.setAttribute('stroke-width', '1.6')
  shackle.setAttribute('stroke-linecap', 'round')

  const body = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  body.setAttribute('x', '3')
  body.setAttribute('y', '7')
  body.setAttribute('width', '10')
  body.setAttribute('height', '7')
  body.setAttribute('rx', '2')
  body.setAttribute('fill', 'rgba(230, 199, 106, 0.18)')
  body.setAttribute('stroke', 'currentColor')
  body.setAttribute('stroke-width', '1.4')

  const keyhole = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  keyhole.setAttribute('cx', '8')
  keyhole.setAttribute('cy', '10.5')
  keyhole.setAttribute('r', '0.9')
  keyhole.setAttribute('fill', 'currentColor')

  svg.append(shackle, body, keyhole)
  suffix.appendChild(svg)
  return suffix
}

function readHiddenAlias(nameElement: HTMLElement, suffixElement?: HTMLElement): string {
  return Array.from(nameElement.childNodes)
    .filter((node) => node !== suffixElement)
    .map((node) => node.textContent ?? '')
    .join('')
    .trim()
}

function cleanupHiddenNameRef(ref: ChampSelectHiddenNameRef) {
  ref.suffixElement.remove()
  ref.nameElement.removeAttribute(SONA_HIDDEN_NAME_ATTR)
  ref.nameElement.removeAttribute(SONA_HIDDEN_NAME_KEY_ATTR)
  ref.nameElement.removeAttribute(SONA_HIDDEN_REAL_NAME_ATTR)

  if (ref.previousTitle == null) ref.nameElement.removeAttribute('title')
  else ref.nameElement.setAttribute('title', ref.previousTitle)

  if (ref.previousAriaLabel == null) ref.nameElement.removeAttribute('aria-label')
  else ref.nameElement.setAttribute('aria-label', ref.previousAriaLabel)
}

function applyHiddenPlayerName(wrapper: Element, stat: TeammateStats, playerKey: string) {
  // obfuscatedPuuid 只在客户端匿名模式下存在；公开玩家保持客户端原始显示。
  if (!stat.obfuscatedPuuid || !stat.gameName) return

  const nameElement = wrapper.querySelector('.player-name-wrapper') as HTMLElement | null
  if (!nameElement) return

  let ref = champSelectHiddenNameRefs.find((item) => item.nameElement === nameElement)
  let created = false
  if (ref && ref.playerKey !== playerKey) {
    cleanupHiddenNameRef(ref)
    champSelectHiddenNameRefs = champSelectHiddenNameRefs.filter((item) => item !== ref)
    ref = undefined
  }

  if (!ref) {
    const originalAlias = readHiddenAlias(nameElement)
    if (!originalAlias) return

    const suffixElement = createHiddenNameSuffix()
    ref = {
      nameElement,
      suffixElement,
      playerKey,
      originalAlias,
      previousTitle: nameElement.getAttribute('title'),
      previousAriaLabel: nameElement.getAttribute('aria-label'),
    }
    champSelectHiddenNameRefs.push(ref)
    created = true
  } else {
    const latestAlias = readHiddenAlias(nameElement, ref.suffixElement)
    if (latestAlias) ref.originalAlias = latestAlias
  }

  // Ember 更新可能移除我们追加的尾缀；每次注入轮询都确保它位于文本末尾。
  if (ref.suffixElement.parentElement !== nameElement) {
    nameElement.appendChild(ref.suffixElement)
  } else if (nameElement.lastChild !== ref.suffixElement) {
    nameElement.appendChild(ref.suffixElement)
  }

  ensureHiddenPlayerNameStyle()
  const fullName = `${stat.gameName}(${ref.originalAlias})`
  nameElement.setAttribute(SONA_HIDDEN_NAME_ATTR, 'true')
  nameElement.setAttribute(SONA_HIDDEN_NAME_KEY_ATTR, playerKey)
  nameElement.setAttribute(SONA_HIDDEN_REAL_NAME_ATTR, stat.gameName)
  nameElement.setAttribute('title', `${fullName} · 匿名模式`)
  nameElement.setAttribute('aria-label', `${fullName}，匿名模式`)

  if (created) {
    logger.info('[ChampSelect] %d楼匿名名字增强 → %s', stat.floor, fullName)
  }
}

/**
 * 过滤掉查不到数据的占位玩家：puuid 与 obfuscatedPuuid 均为空字符串。
 */
function getAnalyzableTeamPlayers(session: ChampSelectSession): ChampSelectTeamPlayer[] {
  return session.myTeam.filter((player) => Boolean(player.puuid) || Boolean(player.obfuscatedPuuid))
}

function getTeamDisplaySignature(session: ChampSelectSession): string {
  return getAnalyzableTeamPlayers(session)
    .map((player) => `${getPlayerStatsKey(player)}:${player.cellId}`)
    .join('|')
}

function getCachedStatsForPlayer(player: ChampSelectTeamPlayer, floor: number): TeammateStats {
  const cached = (player.puuid ? statsByPuuid.get(player.puuid) : undefined)
    ?? (player.summonerId ? statsBySummonerId.get(player.summonerId) : undefined)
    ?? (player.obfuscatedPuuid ? statsByObfuscatedPuuid.get(player.obfuscatedPuuid) : undefined)
    ?? (player.obfuscatedSummonerId ? statsByObfuscatedSummonerId.get(player.obfuscatedSummonerId) : undefined)

  if (cached) {
    return {
      ...cached,
      floor,
      gameName: player.gameName || cached.gameName,
      tagLine: player.tagLine || cached.tagLine,
      puuid: player.puuid || cached.puuid,
      summonerId: player.summonerId || cached.summonerId,
      obfuscatedPuuid: player.obfuscatedPuuid || cached.obfuscatedPuuid,
      obfuscatedSummonerId: player.obfuscatedSummonerId || cached.obfuscatedSummonerId,
    }
  }

  return {
    floor,
    summonerId: player.summonerId,
    puuid: resolveChampSelectPuuid(player),
    obfuscatedSummonerId: player.obfuscatedSummonerId,
    obfuscatedPuuid: player.obfuscatedPuuid,
    gameName: player.gameName,
    tagLine: player.tagLine,
    winRate: null,
    wins: 0,
    total: 0,
    avgK: 0,
    avgD: 0,
    avgA: 0,
    kdaNum: 0,
    strengthScore: null,
  }
}

function buildFloorStatsFromSession(session: ChampSelectSession): TeammateStats[] {
  return getAnalyzableTeamPlayers(session)
    .map((player, index) => getCachedStatsForPlayer(player, index + 1))
}

/** 已挂载的 React root */
const mountedRoots: { root: Root; container: HTMLDivElement }[] = []

/** 注入任务：给选人头像附加粒子特效 + 右侧战绩信息 */
function tryInjectChampSelectTier(): boolean {
  //  这里选择wrapper要额外加一个left，因为对方玩家的信息是看不到的，处理不了
  const wrappers = document.querySelectorAll('.party.visible .summoner-wrapper.visible.left')
  if (wrappers.length === 0 || floorStats.length === 0) return true

  const hasMismatchedBinding = Array.from(wrappers).some((wrapper, i) => {
    const iconContainer = wrapper.querySelector('.champion-icon-container') as HTMLElement | null
    const nameElement = wrapper.querySelector('.player-name-wrapper') as HTMLElement | null
    const stat = floorStats[i]
    if (!stat) return false

    const expectedKey = getTeammateStatsKey(stat)
    const existingIconKey = iconContainer?.getAttribute(SONA_PLAYER_KEY_ATTR)
    const existingNameKey = nameElement?.getAttribute(SONA_HIDDEN_NAME_KEY_ATTR)
    return Boolean(
      (existingIconKey && existingIconKey !== expectedKey)
      || (existingNameKey && existingNameKey !== expectedKey),
    )
  })

  if (hasMismatchedBinding) {
    cleanupInjectedDOM()
  }

  const teamPowerTitles = assignTeamPowerTitles(floorStats)

  wrappers.forEach((wrapper, i) => {
    const stat = floorStats[i]
    if (!stat) return
    const playerKey = getTeammateStatsKey(stat)
    applyHiddenPlayerName(wrapper, stat, playerKey)

    const iconContainer = wrapper.querySelector('.champion-icon-container') as HTMLElement | null
    if (!iconContainer || stat.winRate == null) return
    const winRate = stat.winRate
    iconContainer.setAttribute(SONA_PLAYER_KEY_ATTR, playerKey)

    // ---- 粒子特效 ----
    if (!iconContainer.querySelector('[data-sona-particle]')) {
      iconContainer.setAttribute(SONA_TIER_ATTR, 'true')
      iconContainer.style.position = 'relative'
      iconContainer.style.overflow = 'visible'
      iconContainer.style.borderRadius = '50%'

      const config = getTierConfig(winRate)
      if (config.boxShadow) iconContainer.style.boxShadow = config.boxShadow

      const mountDiv = document.createElement('div')
      mountDiv.setAttribute('data-sona-particle', 'true')
      iconContainer.prepend(mountDiv)

      const rect = iconContainer.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) + 40

      const root = createRoot(mountDiv)
      root.render(createElement(ChampSelectIconEffect, { winRate, width: size, height: size }))
      mountedRoots.push({ root, container: mountDiv })

      logger.info('头像粒子特效 → %d楼 胜率%s%% → %s', i + 1, winRate.toFixed(1), config.id)
    }

    // ---- 头像点击 → 弹出战绩弹窗 ----
    let clickHandler: ((e: Event) => void) | null = null
    if (!iconContainer.hasAttribute(SONA_CLICK_ATTR) && stat.puuid) {
      iconContainer.setAttribute(SONA_CLICK_ATTR, 'true')
      iconContainer.style.cursor = 'pointer'
      const boundPlayerKey = playerKey
      clickHandler = (e: Event) => {
        // 放行 swap 按钮等内部交互元素的点击
        const target = e.target as HTMLElement
        if (target.closest('.swap-button-component, .swap-button-btn')) return

        e.stopPropagation()
        e.preventDefault()
        const current = floorStats.find((item) => getTeammateStatsKey(item) === boundPlayerKey)
        if (current?.puuid) {
          const riotId = current.gameName
            ? `${current.gameName}${current.tagLine ? `#${current.tagLine}` : ''}`
            : ''
          showMatchHistoryModal(current.puuid, riotId, currentChampSelectQueueId || undefined)
        }
      }
      iconContainer.addEventListener('click', clickHandler, true)
    }

    // ---- player-details 下方战绩文字 ----
    const playerDetails = wrapper.querySelector('.player-details') as HTMLElement | null
    if (playerDetails && !playerDetails.querySelector(`[${SONA_STATS_ATTR}]`)) {
        playerDetails.style.position = 'relative'
        playerDetails.style.overflow = 'visible'
        const summonerContainer = playerDetails.closest('.summoner-container') as HTMLElement | null
        if (summonerContainer) summonerContainer.style.overflow = 'visible'

        const kdaStr = stat.kdaNum >= 99 ? '完美' : stat.kdaNum.toFixed(1)
        let winColor = '#e74c3c'
        if (winRate >= 55) winColor = '#5bbd72'
        else if (winRate >= 45) winColor = '#c8aa6e'

        const statsDiv = document.createElement('div')
        statsDiv.setAttribute(SONA_STATS_ATTR, 'true')
        statsDiv.style.cssText = 'position:absolute;left:0;top:100%;display:flex;flex-wrap:wrap;align-items:center;gap:3px 0;font-size:11px;line-height:1.2;white-space:nowrap;margin-top:2px;'

        const winSpan = document.createElement('span')
        winSpan.style.cssText = `color:${winColor};font-weight:bold;display:inline-block;min-width:90px;`
        winSpan.textContent = `${winRate.toFixed(0)}% (${stat.wins}胜/${stat.total - stat.wins}负)`

        let kdaColor = '#e74c3c'
        if (stat.kdaNum >= 5) kdaColor = '#5bbd72'
        else if (stat.kdaNum >= 3) kdaColor = '#c8aa6e'
        const kdaSpan = document.createElement('span')
        kdaSpan.style.cssText = `color:${kdaColor};margin-left:8px;font-weight:bold;text-shadow:0 0 4px rgba(200,170,110,0.6);`
        kdaSpan.textContent = `KDA ${kdaStr}`

        statsDiv.appendChild(winSpan)
        statsDiv.appendChild(kdaSpan)
        if (store.get('analyzeTeamPower')) {
          const titleSpan = document.createElement('span')
          titleSpan.setAttribute('data-sona-team-power', 'true')
          titleSpan.style.cssText = 'flex-basis:100%;color:#c8aa6e;font-weight:bold;'
          const title = teamPowerTitles.get(playerKey) ?? '🆕 萌新上线'
          const score = stat.strengthScore?.score.toFixed(1) ?? '--'
          titleSpan.textContent = `${title} · ${score}`
          titleSpan.title = `本模式有效样本：近${stat.total}场`
          statsDiv.appendChild(titleSpan)
        }
        playerDetails.appendChild(statsDiv)

        // 记录注入引用，离开 ChampSelect 时直接清理
        champSelectInjectedRefs.push({ statsDiv, iconContainer, summonerContainer, playerDetails, clickHandler })

        logger.info(
          '[ChampSelect] %d楼战绩更新成功 → %s#%s 胜率%s%% (%d胜/%d负) KDA %s',
          i + 1,
          stat.gameName ?? '?',
          stat.tagLine ?? '?',
          winRate.toFixed(0),
          stat.wins,
          stat.total - stat.wins,
          kdaStr,
        )
    }
  })

  return true
}



let tierInjectionRegistered = false
let champSelectStatsRequestId = 0

function registerTierInjection() {
  if (!tierInjectionRegistered) {
    injector.register(tryInjectChampSelectTier)
    tierInjectionRegistered = true
  }
}

function unregisterTierInjection() {
  champSelectStatsRequestId++
  if (tierInjectionRegistered) {
    injector.unregister(tryInjectChampSelectTier)
    tierInjectionRegistered = false
  }
  floorStats = []
  statsByPuuid.clear()
  statsBySummonerId.clear()
  statsByObfuscatedPuuid.clear()
  statsByObfuscatedSummonerId.clear()
  currentChampSelectTeamSignature = ''
  currentChampSelectQueueId = 0

  cleanupInjectedDOM()
  document.getElementById(SONA_HIDDEN_NAME_STYLE_ID)?.remove()
  cleanupMatchModal()
}


/** 查询胜率并启动头像特效注入 */
async function applyChampSelectIconEffects() {
  if (!store.get('champSelectAssist') && !store.get('analyzeTeamPower')) return
  try {
    // 先清理上一局的残留
    unregisterTierInjection()
    const requestId = champSelectStatsRequestId

    const { stats, queueId } = await fetchTeamStats()
    if (requestId !== champSelectStatsRequestId) return
    if (stats.length === 0) return
    const session = await lcu.getChampSelectSession()
    if (requestId !== champSelectStatsRequestId || session.queueId !== queueId) return
    if (!await isSummonersRiftChampSelect(session) || requestId !== champSelectStatsRequestId) return
    currentChampSelectQueueId = queueId
    // 建立 puuid → stats 映射，换楼后可用新 myTeam 顺序重建 floorStats
    statsByPuuid.clear()
    statsBySummonerId.clear()
    statsByObfuscatedPuuid.clear()
    statsByObfuscatedSummonerId.clear()
    for (const s of stats) {
      if (s.puuid) statsByPuuid.set(s.puuid, s)
      if (s.summonerId) statsBySummonerId.set(s.summonerId, s)
      if (s.obfuscatedPuuid) statsByObfuscatedPuuid.set(s.obfuscatedPuuid, s)
      if (s.obfuscatedSummonerId) statsByObfuscatedSummonerId.set(s.obfuscatedSummonerId, s)
    }
    // 查询过程中也可能换楼，按最新会话绑定头像与评级。
    floorStats = buildFloorStatsFromSession(session)
    currentChampSelectTeamSignature = getTeamDisplaySignature(session)
    registerTierInjection()

    logger.info('头像特效数据就绪，%d 位队友，队列 ID: %d', stats.length, currentChampSelectQueueId)
  } catch (err) {
    logger.error('头像特效查询失败:', err)
  }
}

let champSelectAssistUnsub: (() => void) | null = null
/** CHAMP_SELECT session 更新监听（用于换楼后重建 floorStats） */
let champSelectUpdateUnsub: (() => void) | null = null

/**
 * 当 ChampSelect session 更新时，检查 myTeam 的 puuid 顺序是否变化，
 * 如果变化（换楼），则按新顺序重建 floorStats 并重新注入
 */
function onChampSelectUpdate(event: LCUEventMessage) {
  // 只处理 Update 事件
  if (event.eventType !== 'Update') return
  // 数据还没准备好就不处理
  if (
    statsByPuuid.size === 0
    && statsBySummonerId.size === 0
    && statsByObfuscatedPuuid.size === 0
    && statsByObfuscatedSummonerId.size === 0
  ) return

  const session = event.data as ChampSelectSession
  if (!session?.myTeam) return
  if (session.queueId !== currentChampSelectQueueId) {
    unregisterTierInjection()
    void applyChampSelectIconEffects()
    return
  }

  const nextSignature = getTeamDisplaySignature(session)
  if (nextSignature === currentChampSelectTeamSignature) return

  logger.info('[ChampSelect] 检测到队友展示顺序或分路变化，重建头像战绩绑定')

  // 清理旧注入并重建
  cleanupInjectedDOM()
  floorStats = buildFloorStatsFromSession(session)
  currentChampSelectTeamSignature = nextSignature
  tryInjectChampSelectTier()
}

/** 清理已注入的 DOM（但不重置 floorStats / statsByPuuid / 注入注册状态） */
function cleanupInjectedDOM() {
  mountedRoots.forEach(({ root, container }) => {
    root.unmount()
    container.remove()
  })
  mountedRoots.length = 0

  for (const ref of champSelectHiddenNameRefs) {
    cleanupHiddenNameRef(ref)
  }
  champSelectHiddenNameRefs = []

  for (const ref of champSelectInjectedRefs) {
    ref.statsDiv.remove()
    // 移除 click handler
    if (ref.clickHandler) {
      ref.iconContainer.removeEventListener('click', ref.clickHandler, true)
    }
    ref.iconContainer.style.filter = ''
    ref.iconContainer.style.boxShadow = ''
    ref.iconContainer.removeAttribute(SONA_TIER_ATTR)
    ref.iconContainer.removeAttribute(SONA_CLICK_ATTR)
    ref.iconContainer.removeAttribute(SONA_PLAYER_KEY_ATTR)
    ref.iconContainer.style.cursor = ''
    ref.playerDetails.removeAttribute(SONA_STATS_ATTR)
    ref.playerDetails.style.cursor = ''
    if (ref.summonerContainer) ref.summonerContainer.style.overflow = ''
  }
  champSelectInjectedRefs = []
}

function updateChampSelectAssist(enabled: boolean) {
  if (enabled && !champSelectAssistUnsub) {
    champSelectAssistUnsub = lcu.observe(LcuEventUri.GAMEFLOW_PHASE_CHANGE, (event: LCUEventMessage) => {
      const phase = event.data as GameflowPhase
      if (phase === 'ChampSelect') {
        // 立即清理上一局残留，确保新局开始时是干净的
        unregisterTierInjection()
        applyChampSelectIconEffects()
      } else {
        unregisterTierInjection()
      }
    })
    // 监听 ChampSelect session 更新，检测换楼
    champSelectUpdateUnsub = lcu.observe(LcuEventUri.CHAMP_SELECT, onChampSelectUpdate)
    logger.info('Champ select assist enabled ✓')
  } else if (!enabled && champSelectAssistUnsub) {
    champSelectAssistUnsub()
    champSelectAssistUnsub = null
    unregisterTierInjection()
    if (champSelectUpdateUnsub) {
      champSelectUpdateUnsub()
      champSelectUpdateUnsub = null
    }
    logger.info('Champ select assist disabled')
  }
}

// ==================== 选人阶段辅助信息 ====================

/**
 * 根据胜率和 KDA 给出 LOL 风格幽默评价
 */
export function getRating(winRate: number, kda: number): string {
  if (winRate >= 75 && kda >= 4.5) return '👑 峡谷通天代'
  if (winRate >= 70) return '🚀 降维来炸鱼'
  if (winRate >= 65) return '🔥 绝对真大腿'
  if (winRate >= 60) return '⚔️ 绝活哥出列'
  if (winRate >= 56) return '✨ 稳健老司机'
  if (winRate >= 52) return '🛡️ 上分好帮手'
  if (winRate >= 48) return '🎲 峡谷摇摆人'
  if (winRate >= 45) return '🫠 默默抗压中'
  if (winRate >= 41) return '🍂 随缘在补位'
  if (winRate >= 37) return '💀 连败渡劫中'
  if (winRate >= 33) return '🤡 敌方突破口'
  if (winRate >= 28) return '💸 峡谷提款机'
  if (winRate >= 20) return '🏳️ 投降发起人'
  return '☠️ 演员已就位'
}

const TEAM_POWER_TITLES = [
  '🦄 千里马',
  '🏇 上等马',
  '🐎 中等马',
  '🐴 下等马',
  '🐂 纯牛马',
] as const

function assignTeamPowerTitles(stats: TeammateStats[]): Map<string, string> {
  const ranked = [...stats]
    .filter((stat): stat is TeammateStats & { strengthScore: SonaPlayerStrengthScore } => Boolean(stat.strengthScore))
    .sort((a, b) => b.strengthScore.score - a.strengthScore.score)

  const titles = new Map<string, string>()
  ranked.forEach((stat, index) => {
    titles.set(getTeammateStatsKey(stat), TEAM_POWER_TITLES[Math.min(index, TEAM_POWER_TITLES.length - 1)])
  })

  return titles
}

/** Refresh the shared avatar view when its display options or sample size change. */
function refreshChampSelectStats() {
  const enabled = store.get('champSelectAssist') || store.get('analyzeTeamPower')
  updateChampSelectAssist(enabled)
  if (!enabled) return
  void lcu.getGameflowPhase().then((phase) => {
    if (phase === 'ChampSelect') void applyChampSelectIconEffects()
  }).catch((error) => logger.warn('[ChampSelect] 无法刷新队友战绩:', error))
}

export function initFeatures() {
  refreshChampSelectStats()
  store.onChange('champSelectAssist', refreshChampSelectStats)
  store.onChange('analyzeTeamPower', refreshChampSelectStats)
  store.onChange('champSelectAssistFetchCount', refreshChampSelectStats)
  store.onChange('analyzeTeamPowerFetchCount', refreshChampSelectStats)

  updateChampSelectTierBadge(store.get('champSelectTierBadge'))
  store.onChange('champSelectTierBadge', updateChampSelectTierBadge)

  const updateOpggLifecycle = () => {
    updateOpggBuildRecommendation(
      store.get('opggBuildRecommendation')
      || store.get('smartBuildRecommendation')
      || store.get('smartItemSetBuild'),
    )
  }
  updateOpggLifecycle()
  store.onChange('opggBuildRecommendation', updateOpggLifecycle)
  store.onChange('smartBuildRecommendation', updateOpggLifecycle)
  store.onChange('smartItemSetBuild', updateOpggLifecycle)

  updateLobbyMemberMatchHistory(store.get('lobbyEnhancement'))
  store.onChange('lobbyEnhancement', updateLobbyMemberMatchHistory)

  updateGameAnalysisPopup(store.get('gameAnalysisPopup'))
  store.onChange('gameAnalysisPopup', updateGameAnalysisPopup)

  logger.info('Ranked analysis features initialized ✓')
}
