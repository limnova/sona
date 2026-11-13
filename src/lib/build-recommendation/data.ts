import { logger } from '@/index'
import { getAllChampions, getAugmentInfo } from '@/lib/assets'
import { aramggApi, type AramggChampionRecommendation, type AramggChampionStatEntry, type AramggCoreItemBuild, type AramggMayhemAugments } from '@/lib/aramgg-api'
import { opggApi, type OpggAugmentGroup, type OpggArenaModeChampion, type OpggChampion, type OpggMode, type OpggNormalModeChampion, type OpggPosition, type OpggTier, type OpggItemBuild } from '@/lib/opgg-api'
import type { BuildRecommendation, RecommendationContext } from '@/types/build-recommendation'
import { FALLBACK_OPGG_POSITION, resolveOpggMode, isKiwiMode, getModeLabel } from './context'

function isArenaChampion(data: OpggChampion): data is OpggArenaModeChampion {
  return 'synergies' in data.data
}

function isNormalChampion(data: OpggChampion): data is OpggNormalModeChampion {
  return 'rune_pages' in data.data
}

function getAugmentGroups(data: OpggChampion): OpggAugmentGroup[] {
  return 'augment_group' in data.data && Array.isArray(data.data.augment_group)
    ? data.data.augment_group
    : []
}

export async function loadRecommendation(context: RecommendationContext, tier: OpggTier): Promise<BuildRecommendation | null> {
  if (context.championId <= 0) return null

  const mode = resolveOpggMode(context)
  const position = mode === 'ranked'
    ? (context.position === 'none' ? FALLBACK_OPGG_POSITION : context.position)
    : 'none'

  if (isKiwiMode(context)) {
    return loadAramggKiwiRecommendation(context, mode, position, tier)
  }

  const mainChampion = await getChampionWithVersionFallback({
    id: context.championId,
    mode,
    tier,
    position,
  })

  const augmentGroups = getAugmentGroups(mainChampion)

  const normal = isNormalChampion(mainChampion) ? mainChampion : null
  const arena = isArenaChampion(mainChampion) ? mainChampion : null
  const data = mainChampion.data

  return {
    mode,
    modeLabel: getModeLabel(mode, context),
    version: mainChampion.meta.version,
    position,
    summary: getSummaryLines(mainChampion),
    summonerSpells: normal?.data.summoner_spells ?? [],
    starterItems: data.starter_items ?? [],
    boots: data.boots ?? [],
    coreItems: data.core_items ?? [],
    prismItems: arena?.data.prism_items ?? [],
    lastItems: data.last_items ?? [],
    runePages: normal?.data.runes ?? [],
    matchups: normal ? mapOpggMatchups(normal.data.counters) : [],
    augments: mapOpggAugments(augmentGroups),
    meta: getRecommendationMeta(mainChampion),
  }
}

async function loadAramggKiwiRecommendation(
  context: RecommendationContext,
  mode: OpggMode,
  position: OpggPosition,
  tier: OpggTier,
): Promise<BuildRecommendation | null> {
  const [opggChampion, aramgg, mayhemAugments] = await Promise.all([
    getChampionWithVersionFallback({
      id: context.championId,
      mode,
      tier,
      position,
    }).catch((err) => {
      logger.warn('[OPGG] KIWI 基础配装请求失败，将只使用 ARAM.GG 数据:', err)
      return null
    }),
    aramggApi.getChampionRecommendation(context.championId),
    aramggApi.getMayhemAugmentsZhCn().catch((err) => {
      logger.warn('[ARAMGG] 海克斯稀有度请求失败，将尝试使用客户端资源兜底:', err)
      return {} as AramggMayhemAugments
    }),
  ])

  const normal = opggChampion && isNormalChampion(opggChampion) ? opggChampion : null
  const data = opggChampion?.data
  const aramggCoreItems = mapAramggCoreItemBuilds(aramgg.coreItemBuilds)
  const aramggLastItems = mapAramggItems(aramgg.items)

  // ARAM.GG 偶尔会在页面结构升级后暂时解析不到装备数据。海克斯模式仍然
  // 需要优先使用它的专属数据，但每个空分段都必须退回 OP.GG，避免生成的
  // 本地配装只剩鞋子。出门装则始终由 OP.GG 提供，因为 ARAM.GG 没有该分段。
  if (aramggCoreItems.length === 0 || aramggLastItems.length === 0) {
    logger.warn(
      '[BuildRecommendation] ARAM.GG 装备分段为空，回退 OP.GG：champion=%d core=%d last=%d',
      context.championId,
      aramggCoreItems.length,
      aramggLastItems.length,
    )
  }

  return {
    mode,
    modeLabel: getModeLabel(mode, context),
    version: aramgg.championStats?.version || opggChampion?.meta.version || context.gameVersion || '',
    position,
    summary: getAramggSummaryLines(aramgg),
    summonerSpells: normal?.data.summoner_spells ?? [],
    starterItems: data?.starter_items ?? [],
    boots: data?.boots ?? [],
    coreItems: aramggCoreItems.length > 0 ? aramggCoreItems : (data?.core_items ?? []),
    prismItems: [],
    lastItems: aramggLastItems.length > 0 ? aramggLastItems : (data?.last_items ?? []),
    runePages: [],
    matchups: [],
    augments: mapAramggAugments(aramgg.augments, mayhemAugments),
    meta: undefined,
  }
}

function getAramggSummaryLines(data: AramggChampionRecommendation): string[] {
  const stats = data.championStats
  return [
    `总体胜率 ${formatRate(toOptionalNumber(stats?.win_rate))}`,
    `登场 ${formatRate(toOptionalNumber(stats?.pick_rate))}`,
    `Tier ${stats?.tier || '-'}`,
  ]
}

function formatRate(value: number | null): string {
  return value != null && Number.isFinite(value) ? `${(value * 100).toFixed(1)}%` : '-'
}

function toOptionalNumber(value: unknown): number | null {
  if (value == null || value === '') return null
  const numberValue = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(numberValue) ? numberValue : null
}

function toNumber(value: unknown): number {
  const numberValue = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(numberValue) ? numberValue : 0
}

function mapAramggCoreItemBuilds(builds: AramggCoreItemBuild[]): OpggItemBuild[] {
  return builds.map((build) => {
    const play = toNumber(build.games)
    const win = toNumber(build.wins)
    return {
      ids: build.itemIds.split(',').map((id) => Number(id)).filter((id) => Number.isFinite(id) && id > 0),
      win,
      play,
      pick_rate: toNumber(build.pick_rate),
    }
  }).filter((build) => build.ids.length > 0)
}

function mapAramggItems(items: Record<string, AramggChampionStatEntry>): OpggItemBuild[] {
  return Object.entries(items)
    .map(([id, item]) => ({
      ids: [Number(id)].filter((value) => Number.isFinite(value) && value > 0),
      win: toNumber(item.num_win_games),
      play: toNumber(item.num_games),
      pick_rate: toNumber(item.pick_rate),
      tier: Number(item.tier),
    }))
    .filter((item) => item.ids.length > 0)
    .sort((a, b) => {
      const tierDiff = (Number.isFinite(a.tier) ? a.tier : 99) - (Number.isFinite(b.tier) ? b.tier : 99)
      return tierDiff || b.pick_rate - a.pick_rate
    })
    .map(({ tier: _tier, ...item }) => item)
}

function getAugmentRaritySortValue(rarity: number): number {
  if (rarity === 8) return 0
  if (rarity === 4) return 1
  if (rarity === 1) return 2
  return 99
}

function normalizeAugmentRarity(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value !== 'string') return null

  const normalized = value.toLowerCase()
  if (normalized.includes('prismatic')) return 8
  if (normalized.includes('gold')) return 4
  if (normalized.includes('silver')) return 1

  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : null
}

function normalizeMayhemAugmentRarity(value: unknown, mayhemAugments: AramggMayhemAugments): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return normalizeAugmentRarity(value)

  const knownRarities = new Set(Object.values(mayhemAugments).map((augment) => augment.rarity))
  if (knownRarities.has(4) || knownRarities.has(8)) return value

  // Some data dumps use 0/1/2 instead of Riot's 1/4/8 rarity values.
  if (value === 2) return 8
  if (value === 1) return 4
  if (value === 0) return 1
  return value
}

function mapOpggAugments(augmentGroups: OpggAugmentGroup[]): BuildRecommendation['augments'] {
  return augmentGroups
    .map((group) => ({
      rarity: group.rarity,
      items: group.augments.slice(0, 5).map((augment) => ({
        id: augment.id,
        pickRate: augment.pick_rate,
        averagePlace: augment.total_place / Math.max(augment.play, 1),
        firstPlace: augment.first_place / Math.max(augment.play, 1),
      })),
    }))
    .sort((a, b) => getAugmentRaritySortValue(a.rarity) - getAugmentRaritySortValue(b.rarity))
}

function getAramggAugmentRarity(augmentId: number, mayhemAugments: AramggMayhemAugments): number | null {
  return normalizeAugmentRarity(getAugmentInfo(augmentId)?.rarity)
    ?? normalizeMayhemAugmentRarity(mayhemAugments[String(augmentId)]?.rarity, mayhemAugments)
}

function mapOpggMatchups(counters: NonNullable<OpggNormalModeChampion['data']['counters']>): BuildRecommendation['matchups'] {
  return counters
    .map((counter) => ({
      championId: counter.champion_id,
      play: counter.play,
      win: counter.win,
      winRate: counter.play > 0 ? counter.win / counter.play : 0,
    }))
    .filter((counter) => counter.championId > 0 && counter.play > 0)
}

function mapAramggAugments(augments: Record<string, AramggChampionStatEntry>, mayhemAugments: AramggMayhemAugments): BuildRecommendation['augments'] {
  const groups = new Map<number, Array<{ id: number; pickRate: number; winRate: number }>>()

  Object.entries(augments).forEach(([id, augment]) => {
    const augmentId = Number(id)
    const rarity = getAramggAugmentRarity(augmentId, mayhemAugments)
    if (!Number.isFinite(augmentId) || rarity == null) return

    const items = groups.get(rarity) ?? []
    items.push({
      id: augmentId,
      pickRate: toNumber(augment.pick_rate),
      winRate: toNumber(augment.win_rate),
    })
    groups.set(rarity, items)
  })

  return Array.from(groups.entries())
    .sort(([a], [b]) => getAugmentRaritySortValue(a) - getAugmentRaritySortValue(b))
    .map(([rarity, items]) => ({
      rarity,
      items: items
        .sort((a, b) => b.winRate - a.winRate || b.pickRate - a.pickRate)
        .slice(0, 5)
        .map((augment) => ({
          id: augment.id,
          pickRate: augment.pickRate,
          winRate: augment.winRate,
        })),
    }))
}

function getRecommendationMeta(champion: OpggChampion): BuildRecommendation['meta'] {
  const stats = champion.data.summary.average_stats
  const tierData = 'tier_data' in stats ? stats.tier_data : undefined
  const rank = tierData?.rank && tierData.rank > 0 ? tierData.rank : stats.rank > 0 ? stats.rank : null
  const previousRank = tierData?.rank_prev && tierData.rank_prev > 0 ? tierData.rank_prev : null
  const totalRank = getAllChampions().length || null

  return {
    rank,
    previousRank,
    // 排名数字越小越强：从 #80 到 #60 记为上升 20。
    rankDelta: rank != null && previousRank != null ? previousRank - rank : null,
    totalRank,
    matchCount: champion.meta.match_count ?? null,
    version: champion.meta.version,
    updatedAt: champion.meta.analyzed_at ?? champion.meta.cached_at ?? '',
  }
}

async function getChampionWithVersionFallback(options: {
  id: number
  mode: OpggMode
  tier: OpggTier
  position?: OpggPosition
  version?: string
}): Promise<OpggChampion> {
  try {
    return await opggApi.getChampion(options)
  } catch (err) {
    if (!options.version) throw err
    logger.warn('[OPGG] 版本 %s 请求失败，回退到 OP.GG 最新版本:', options.version, err)
    return opggApi.getChampion({ ...options, version: undefined })
  }
}

function getSummaryLines(champion: OpggChampion): string[] {
  if (isArenaChampion(champion)) {
    const stats = champion.data.summary.average_stats
    return [
      `排名 #${stats.rank || '-'}`,
      `Tier ${stats.tier || '-'}`,
      `登场 ${(stats.pick_rate * 100).toFixed(1)}%`,
    ]
  }

  const stats = champion.data.summary.average_stats
  return [
    `总体胜率 ${(stats.win_rate * 100).toFixed(1)}%`,
    `登场 ${(stats.pick_rate * 100).toFixed(1)}%`,
    `Tier ${stats.tier || '-'}`,
  ]
}
