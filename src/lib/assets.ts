/**
 * 全局游戏资源映射
 *
 * 通过 LCU JSON 接口动态获取装备、召唤师技能和峡谷队列资源。
 * 在 index.tsx 的 load() 中调用 initAssets() 初始化，
 * 之后任何模块都可以直接 import 使用查询函数。
 *
 * 英雄头像可以直接用 /lol-game-data/assets/v1/champion-icons/{id}.png 拼接，
 * 不需要额外映射。
 */

import { lcu } from '@/lib/lcu'
import { logger } from '@/index'
import type { GameQueue } from '@/types/lcu'
import { isSummonersRift } from '@/lib/game-mode'

/** 路径小写化，LCU 资源路径不区分大小写但统一小写更安全 */
function normalizePath(raw: string): string {
  return raw.toLowerCase()
}

/** Riot 资源描述里常带 HTML 标签，这里转成适合 tooltip 的纯文本。 */
function normalizeDescription(raw: unknown): string {
  if (typeof raw !== 'string') return ''

  return raw
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(li|p|div)>/gi, '\n')
    .replace(/<li>/gi, '• ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function pickDescription(source: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const description = normalizeDescription(source[key])
    if (description) return description
  }
  return ''
}

// ==================== 映射表 ====================

const itemMap = new Map<number, string>()
const itemNameMap = new Map<number, string>()
const itemDescriptionMap = new Map<number, string>()
const itemPriceMap = new Map<number, number>()
const spellMap = new Map<number, string>()
const spellNameMap = new Map<number, string>()
const spellDescriptionMap = new Map<number, string>()
const perkMap = new Map<number, string>()
const perkNameMap = new Map<number, string>()
const perkDescriptionMap = new Map<number, string>()
const perkStyleMap = new Map<number, string>()
const perkStyleNameMap = new Map<number, string>()
const queueMap = new Map<number, GameQueue>()

/** 英雄信息：id → { id, name(英雄名), title(称号), alias(英文名) } */
export interface ChampionInfo {
  id: number
  /** 英雄名字，如 "安妮" */
  name: string
  /** 英雄称号，如 "黑暗之女" */
  title: string
  /** 英文名，如 "Annie" */
  alias: string
}
const championMap = new Map<number, ChampionInfo>()

let initialized = false

// ==================== 当前账号 puuid ====================

/** 当前登录账号的 puuid，在插件 load 时获取一次，整个生命周期内不会变化 */
let currentPuuid = ''

/** 获取当前账号的 puuid（插件加载时初始化，之后不变） */
export function getPuuid(): string {
  return currentPuuid
}

// ==================== 初始化 ====================

/**
 * 拉取装备、召唤师技能和队列数据，构建全局映射。
 * 应在插件 load() 时调用一次，失败不阻塞启动。
 */
export async function initAssets() {
  if (initialized) return

  // 最先获取当前账号 puuid。
  try {
    const summoner = await lcu.getSummonerInfo()
    currentPuuid = summoner.puuid || ''
    logger.info('[Assets] 当前账号 puuid=%s', currentPuuid)
  } catch (err) {
    logger.warn('[Assets] 获取 puuid 失败:', err)
  }

  // 每个资源独立 catch，失败不影响其他；最多重试 3 次（每次间隔 3 秒）
  await tryInit(0)
}

/**
 * 尝试初始化（失败的资源自动重试）
 * @param attempt 当前重试次数
 */
async function tryInit(attempt: number) {
  const MAX_RETRY = 3
  const RETRY_DELAY = 2000

  const [items, spells, queues, perks, perkStyles, champions] = await Promise.all([
    lcu.getItems().catch((e) => { logger.warn('[Assets] getItems 失败:', e); return [] }),
    lcu.getSummonerSpells().catch((e) => { logger.warn('[Assets] getSummonerSpells 失败:', e); return [] }),
    lcu.getQueues().catch((e) => { logger.warn('[Assets] getQueues 失败:', e); return [] }),
    lcu.getPerks().catch((e) => { logger.warn('[Assets] getPerks 失败:', e); return [] }),
    lcu.getPerkStyles().catch((e) => { logger.warn('[Assets] getPerkStyles 失败:', e); return { styles: [] } }),
    lcu.getChampionSummary().catch((e) => { logger.warn('[Assets] getChampionSummary 失败:', e); return [] }),
  ])

  // 只填充获取到的数据（失败的返回空数组，for 循环自然跳过）
  for (const item of items) {
    if (item.id > 0 && item.iconPath) itemMap.set(item.id, normalizePath(item.iconPath))
    if (item.id > 0 && item.name) itemNameMap.set(item.id, item.name)
    if (item.id > 0) {
      const description = pickDescription(item as Record<string, unknown>, [
        'description',
        'shortDescription',
        'longDescription',
        'tooltip',
        'tooltipText',
      ])
      if (description) itemDescriptionMap.set(item.id, description)
      const price = item.priceTotal ?? item.price ?? 0
      if (Number.isFinite(price) && price > 0) itemPriceMap.set(item.id, price)
    }
  }
  for (const spell of spells) {
    if (spell.id > 0 && spell.iconPath) spellMap.set(spell.id, normalizePath(spell.iconPath))
    if (spell.id > 0 && spell.name) spellNameMap.set(spell.id, spell.name)
    if (spell.id > 0) {
      const description = pickDescription(spell as unknown as Record<string, unknown>, [
        'description',
        'shortDescription',
        'longDescription',
        'tooltip',
        'tooltipText',
      ])
      if (description) spellDescriptionMap.set(spell.id, description)
    }
  }
  for (const queue of queues) {
    queueMap.set(queue.id, queue)
  }
  for (const perk of perks) {
    if (perk.id > 0 && perk.iconPath) perkMap.set(perk.id, normalizePath(perk.iconPath))
    if (perk.id > 0 && perk.name) perkNameMap.set(perk.id, perk.name)
    if (perk.id > 0) {
      const description = pickDescription(perk as Record<string, unknown>, [
        'shortDesc',
        'longDesc',
        'description',
        'tooltip',
        'tooltipText',
      ])
      if (description) perkDescriptionMap.set(perk.id, description)
    }
  }
  for (const style of perkStyles.styles) {
    if (style.id > 0 && style.iconPath) perkStyleMap.set(style.id, normalizePath(style.iconPath))
    if (style.id > 0 && style.name) perkStyleNameMap.set(style.id, style.name)
  }
  for (const champ of champions) {
    if (champ.id > 0) {
      championMap.set(champ.id, {
        id: champ.id,
        name: champ.description || '',
        title: champ.name || '',
        alias: champ.alias,
      })
    }
  }
  logger.info(
    '[Assets] 资源映射初始化 (attempt %d) → 装备 %d, 技能 %d, 符文 %d, 符文系 %d, 队列 %d, 英雄 %d',
    attempt + 1,
    itemMap.size, spellMap.size, perkMap.size, perkStyleMap.size, queueMap.size, championMap.size,
  )

  // 判断是否有关键资源缺失，决定是否重试
  const missing = [
    itemMap.size === 0 && 'items',
    spellMap.size === 0 && 'spells',
    queueMap.size === 0 && 'queues',
    championMap.size === 0 && 'champions',
  ].filter(Boolean)

  if (missing.length > 0 && attempt < MAX_RETRY) {
    logger.warn('[Assets] 关键资源缺失: %s，%d 秒后重试 (%d/%d)', missing.join(','), RETRY_DELAY / 1000, attempt + 1, MAX_RETRY)
    setTimeout(() => tryInit(attempt + 1), RETRY_DELAY)
    return
  }

  initialized = true
  if (missing.length > 0) {
    logger.error('[Assets] 重试 %d 次后仍有资源缺失: %s', MAX_RETRY, missing.join(','))
  } else {
    logger.info('[Assets] 资源映射初始化完成 ✓')
  }
}

// ==================== 查询 ====================

/** 获取英雄头像路径（直接用 ID 拼接即可） */
export function getChampIcon(id: number): string {
  return `/lol-game-data/assets/v1/champion-icons/${id}.png`
}

/** 获取装备图标路径 */
export function getItemIcon(id: number): string {
  return itemMap.get(id) ?? (id > 0 ? `/lol-game-data/assets/v1/item-icons/${id}.png` : '')
}

/** 获取装备名称 */
export function getItemName(id: number): string {
  return itemNameMap.get(id) ?? String(id)
}

/** 获取装备总价（金币）；未知返回 0 */
export function getItemPrice(id: number): number {
  return itemPriceMap.get(id) ?? 0
}

/** 获取装备完整信息（名称、图标、描述） */
export function getItemInfo(id: number): { name: string; iconPath: string; description: string; price: number } {
  return {
    name: itemNameMap.get(id) ?? String(id),
    iconPath: getItemIcon(id),
    description: itemDescriptionMap.get(id) ?? '',
    price: itemPriceMap.get(id) ?? 0,
  }
}

/** 获取召唤师技能图标路径 */
export function getSpellIcon(id: number): string {
  return spellMap.get(id) ?? ''
}

/** 获取召唤师技能名称 */
export function getSpellName(id: number): string {
  return spellNameMap.get(id) ?? String(id)
}

/** 获取召唤师技能完整信息（名称、图标、描述） */
export function getSpellInfo(id: number): { name: string; iconPath: string; description: string } {
  return {
    name: spellNameMap.get(id) ?? String(id),
    iconPath: spellMap.get(id) ?? '',
    description: spellDescriptionMap.get(id) ?? '',
  }
}

/** 获取单个符文图标路径（基石符文等） */
export function getPerkIcon(id: number): string {
  return perkMap.get(id) ?? ''
}

/** 获取单个符文名称 */
export function getPerkName(id: number): string {
  return perkNameMap.get(id) ?? String(id)
}

/** 获取单个符文完整信息（名称、图标、描述） */
export function getPerkInfo(id: number): { name: string; iconPath: string; description: string } {
  return {
    name: perkNameMap.get(id) ?? String(id),
    iconPath: perkMap.get(id) ?? '',
    description: perkDescriptionMap.get(id) ?? '',
  }
}

/** 获取符文系图标路径（主系/副系） */
export function getPerkStyleIcon(id: number): string {
  return perkStyleMap.get(id) ?? ''
}

/** 获取符文系名称 */
export function getPerkStyleName(id: number): string {
  return perkStyleNameMap.get(id) ?? String(id)
}

/** 峡谷队列名称，用于区分匹配、单双排和灵活组排。 */
export function getQueueName(queueId: number): string {
  if (queueId <= 0) return '召唤师峡谷'
  return queueMap.get(queueId)?.name ?? `队列${queueId}`
}

/** 通过 queueId 获取完整队列数据 */
export function getQueue(queueId: number): GameQueue | undefined {
  return queueMap.get(queueId)
}

export function isSummonersRiftQueue(queueId: number): boolean {
  const queue = getQueue(queueId)
  return Boolean(queue && isSummonersRift(queue))
}

/** 资源映射是否已就绪 */
export function isAssetsReady(): boolean {
  return initialized
}

/** 获取所有英雄列表 */
export function getAllChampions(): ChampionInfo[] {
  return Array.from(championMap.values()).filter(c => c.id > 0)
}

/** 通过 ID 获取英雄信息 */
export function getChampionById(id: number): ChampionInfo | undefined {
  return championMap.get(id)
}

/**
 * 模糊搜索英雄（名字、称号、英文名）
 * @param keyword 搜索关键词
 * @param limit 最大返回数量，默认 8
 */
export function searchChampions(keyword: string, limit = 8): ChampionInfo[] {
  if (!keyword.trim()) return []
  const kw = keyword.trim().toLowerCase()
  const results: ChampionInfo[] = []

  championMap.forEach((c) => {
    if (c.id <= 0) return
    if (
      c.name.toLowerCase().includes(kw) ||
      c.title.toLowerCase().includes(kw) ||
      c.alias.toLowerCase().includes(kw)
    ) {
      results.push(c)
    }
  })

  // 精确匹配名字的排前面
  results.sort((a, b) => {
    const aExact = a.name.toLowerCase() === kw ? 0 : 1
    const bExact = b.name.toLowerCase() === kw ? 0 : 1
    return aExact - bExact
  })

  return results.slice(0, limit)
}

/** 可选择的召唤师峡谷队列。 */
export function getPlayableQueues(): { id: number; name: string }[] {
  const result: { id: number; name: string }[] = []
  queueMap.forEach((q) => {
    if (q.id <= 0 || q.isCustom) return
    if (!q.isEnabled || q.queueAvailability !== 'Available') return
    if (!isSummonersRift(q)) return
    result.push({ id: q.id, name: q.name || q.shortName || `队列${q.id}` })
  })
  // 按名称排序
  result.sort((a, b) => a.name.localeCompare(b.name, 'zh'))
  return result
}
