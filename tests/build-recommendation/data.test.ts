import { beforeEach, describe, expect, it, vi } from 'vitest'
import { loadRecommendation } from '@/lib/build-recommendation/data'
import { opggApi, type OpggChampion, type OpggPosition } from '@/lib/opgg-api'
import { context, itemBuild } from './fixtures'

vi.mock('@/index', () => ({ logger: { warn: vi.fn() } }))
vi.mock('@/lib/assets', () => ({
  getAllChampions: () => [37, 1], getQueueName: () => '',
}))
vi.mock('@/lib/opgg-api', () => ({ opggApi: { getChampion: vi.fn() } }))
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
  it.each<[string, OpggPosition, OpggPosition]>([
    ['CLASSIC', 'support', 'support'],
    ['CLASSIC', 'none', 'mid'],
  ])('模式 %s、分路 %s 使用对应的请求参数', async (gameMode, position, expectedPosition) => {
    vi.mocked(opggApi.getChampion).mockResolvedValue(opggChampion)
    const result = await loadRecommendation({ ...context, gameMode, position }, 'master_plus')
    expect(opggApi.getChampion).toHaveBeenCalledWith({ id: 37, tier: 'master_plus', position: expectedPosition })
    expect(result?.position).toBe(expectedPosition)
  })

  it.each(['KIWI', 'kiwi', 'ARAM', 'CHERRY', 'ARENA', 'URF', 'ARURF', 'NEXUSBLITZ', 'NEXUS_BLITZ', 'ONEFORALL', 'ULTBOOK', 'TFT', '', 'UNKNOWN'])(
    '模式 %s 不再加载推荐，也不回退峡谷数据', async (gameMode) => {
      const result = await loadRecommendation({ ...context, gameMode }, 'master_plus')
      expect(result).toBeNull()
      expect(opggApi.getChampion).not.toHaveBeenCalled()
    },
  )

  it('普通排位保留段位和分路，转换排名变化', async () => {
    vi.mocked(opggApi.getChampion).mockResolvedValue(opggChampion)
    const result = await loadRecommendation(context, 'master_plus')
    expect(opggApi.getChampion).toHaveBeenCalledWith({ id: 37, tier: 'master_plus', position: 'support' })
    expect(result?.coreItems).toEqual([itemBuild([3001])])
    expect(result?.meta).toMatchObject({ rank: 60, previousRank: 80, rankDelta: 20, totalRank: 2 })
  })
})
