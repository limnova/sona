import { describe, expect, it, vi } from 'vitest'
import { getPlayableQueues, getQueueName, initAssets, isSummonersRiftQueue } from '@/lib/assets'

vi.mock('@/index', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))
vi.mock('@/lib/lcu', () => ({ lcu: {
  getSummonerInfo: async () => ({ puuid: 'player' }),
  getItems: async () => [{ id: 1001, name: '鞋子', iconPath: '/1001.png' }],
  getSummonerSpells: async () => [{ id: 4, name: '闪现', iconPath: '/4.png' }],
  getPerks: async () => [],
  getPerkStyles: async () => ({ styles: [] }),
  getChampionSummary: async () => [{ id: 37, name: '琴瑟仙女', description: '娑娜', alias: 'Sona' }],
  getQueues: async () => [
    { id: 420, name: '单双排', gameMode: 'CLASSIC', mapId: 11 },
    { id: 440, name: '灵活组排', gameMode: 'CLASSIC', mapId: 11 },
    { id: 430, name: '匹配', gameMode: 'CLASSIC', mapId: 11 },
    { id: 450, name: '大乱斗', gameMode: 'ARAM', mapId: 12 },
    { id: 2400, name: '海克斯', gameMode: 'KIWI', mapId: 12 },
    { id: 900, name: '无限火力', gameMode: 'URF', mapId: 11 },
    { id: 1700, name: '竞技场', gameMode: 'CHERRY', mapId: 30 },
    { id: 1200, name: '闪击', gameMode: 'NEXUSBLITZ', mapId: 21 },
    { id: 470, name: '旧地图', gameMode: 'CLASSIC', mapId: 10 },
  ].map((queue) => ({ isEnabled: true, isCustom: false, queueAvailability: 'Available', ...queue })),
} }))

describe('峡谷队列列表', () => {
  it('保留匹配和两种排位的名称，移除其他地图和峡谷上的轮换玩法', async () => {
    await initAssets()
    expect(getPlayableQueues().map((queue) => queue.id).sort()).toEqual([420, 430, 440])
    expect(getQueueName(420)).toBe('单双排')
    expect(getQueueName(430)).toBe('匹配')
    expect(getQueueName(0)).toBe('召唤师峡谷')
    expect(isSummonersRiftQueue(420)).toBe(true)
    expect(isSummonersRiftQueue(900)).toBe(false)
    expect(isSummonersRiftQueue(2400)).toBe(false)
    expect(isSummonersRiftQueue(99999)).toBe(false)
  })
})
