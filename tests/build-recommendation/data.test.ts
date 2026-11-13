import { beforeEach, describe, expect, it, vi } from 'vitest'
import { loadRecommendation } from '@/lib/build-recommendation/data'
import { opggApi, type OpggChampion, type OpggMode, type OpggPosition } from '@/lib/opgg-api'
import { aramggApi } from '@/lib/aramgg-api'
import { context, itemBuild } from './fixtures'

vi.mock('@/index', () => ({ logger: { warn: vi.fn() } }))
vi.mock('@/lib/assets', () => ({
  getAllChampions: () => [37, 1], getAugmentInfo: () => undefined, getQueueName: () => '',
}))
vi.mock('@/lib/opgg-api', () => ({ opggApi: { getChampion: vi.fn() } }))
vi.mock('@/lib/aramgg-api', () => ({
  aramggApi: { getChampionRecommendation: vi.fn(), getMayhemAugmentsZhCn: vi.fn() },
}))

const opggChampion = {
  meta: { version: '16.1', match_count: 100, cached_at: '2026-01-01' },
  data: {
    rune_pages: [], runes: [], summoner_spells: [], counters: [],
    starter_items: [itemBuild([2003])], boots: [itemBuild([1001])],
    core_items: [itemBuild([3001])], last_items: [itemBuild([3002])],
    summary: { average_stats: { win_rate: 0.5, pick_rate: 0.1, tier: 2, rank: 60, tier_data: { rank: 60, rank_prev: 80 } } },
  },
} as unknown as OpggChampion

beforeEach(() => { vi.resetAllMocks() })

describe('推荐数据适配', () => {
  it.each<[string, OpggPosition, OpggMode, OpggPosition]>([
    ['CLASSIC', 'support', 'ranked', 'support'],
    ['CLASSIC', 'none', 'ranked', 'mid'],
    ['ARAM', 'top', 'aram', 'none'],
    ['URF', 'mid', 'urf', 'none'],
  ])('模式 %s、分路 %s 使用对应的请求参数', async (gameMode, position, expectedMode, expectedPosition) => {
    vi.mocked(opggApi.getChampion).mockResolvedValue(opggChampion)
    const result = await loadRecommendation({ ...context, gameMode, position }, 'master_plus')
    expect(opggApi.getChampion).toHaveBeenCalledWith({ id: 37, mode: expectedMode, tier: 'master_plus', position: expectedPosition })
    expect(result?.position).toBe(expectedPosition)
  })

  it('普通排位保留段位和分路，转换排名变化', async () => {
    vi.mocked(opggApi.getChampion).mockResolvedValue(opggChampion)
    const result = await loadRecommendation(context, 'master_plus')
    expect(opggApi.getChampion).toHaveBeenCalledWith({ id: 37, mode: 'ranked', tier: 'master_plus', position: 'support' })
    expect(result?.coreItems).toEqual([itemBuild([3001])])
    expect(result?.meta).toMatchObject({ rank: 60, previousRank: 80, rankDelta: 20, totalRank: 2 })
  })

  it('ARAM.GG 分段为空时分别退回 OP.GG 配装', async () => {
    vi.mocked(opggApi.getChampion).mockResolvedValue(opggChampion)
    vi.mocked(aramggApi.getChampionRecommendation).mockResolvedValue({ championStats: null, coreItemBuilds: [], items: {}, augments: {} })
    vi.mocked(aramggApi.getMayhemAugmentsZhCn).mockRejectedValue(new Error('offline'))
    const result = await loadRecommendation({ ...context, gameMode: 'KIWI' }, 'all')
    expect(result).toMatchObject({ coreItems: [itemBuild([3001])], lastItems: [itemBuild([3002])], starterItems: [itemBuild([2003])] })
  })

  it('OP.GG 失败后仍能展示 ARAM.GG 海克斯推荐', async () => {
    vi.mocked(opggApi.getChampion).mockRejectedValue(new Error('offline'))
    vi.mocked(aramggApi.getMayhemAugmentsZhCn).mockResolvedValue({})
    vi.mocked(aramggApi.getChampionRecommendation).mockResolvedValue({
      championStats: null, coreItemBuilds: [], items: { '3002': { tier: '1', num_win_games: '10', win_rate: '0.5', num_games: '20', pick_rate: '0.5' } }, augments: {},
    })
    const result = await loadRecommendation({ ...context, gameMode: 'KIWI' }, 'all')
    expect(result?.lastItems).toEqual([itemBuild([3002], 10, 20)])
    expect(result?.starterItems).toEqual([])
  })

  it('ARAM.GG 装备忽略无效 ID，按 tier 和登场率排序，不泄漏临时排序字段', async () => {
    vi.mocked(opggApi.getChampion).mockResolvedValue(opggChampion)
    vi.mocked(aramggApi.getMayhemAugmentsZhCn).mockResolvedValue({})
    const stats = { tier: '2', num_win_games: '10', win_rate: '0.5', num_games: '20', pick_rate: '0.5' }
    vi.mocked(aramggApi.getChampionRecommendation).mockResolvedValue({
      championStats: null, coreItemBuilds: [], augments: {},
      items: {
        '0': stats,
        invalid: stats,
        '3001': stats,
        '3002': { ...stats, pick_rate: '0.8' },
        '3003': { ...stats, tier: '1' },
        '3004': { ...stats, tier: 'unknown' },
      },
    })
    const result = await loadRecommendation({ ...context, gameMode: 'KIWI' }, 'all')
    expect(result?.lastItems).toEqual([
      itemBuild([3003], 10, 20),
      { ...itemBuild([3002], 10, 20), pick_rate: 0.8 },
      itemBuild([3001], 10, 20),
      itemBuild([3004], 10, 20),
    ])
  })
})
