import { describe, expect, it, vi } from 'vitest'
import { createManagedItemSet, planManagedItemSetUpsert } from '@/lib/build-recommendation/item-sets'
import { context, itemBuild, recommendation } from './fixtures'

vi.mock('@/lib/assets', () => ({
  getItemPrice: (id: number) => ({ 3001: 3000, 3002: 2500, 3003: 3000 }[id] ?? 0),
  getChampionById: () => ({ name: '娑娜', title: '琴瑟仙女' }),
  getQueueName: () => '',
}))

describe('推荐装备集', () => {
  it('跳过空推荐，不生成空装备集', () => {
    expect(createManagedItemSet(context, recommendation({ coreItems: [] }))).toBeNull()
  })

  it('按胜率挑选核心装，去掉无效和重复装备，保留两瓶红药', () => {
    const set = createManagedItemSet(context, recommendation({
      starterItems: [itemBuild([2003, 2003, 0, -1, NaN, 1001])],
      coreItems: [itemBuild([3002], 30), itemBuild([3001], 80)],
      lastItems: [itemBuild([3002, 3001, 3003, 3001])],
    }))!
    expect(set.blocks.map((block) => block.items)).toEqual([
      [{ id: '2003', count: 2 }, { id: '1001', count: 1 }],
      [{ id: '3001', count: 1 }],
      [{ id: '3002', count: 1 }],
      [{ id: '3001', count: 1 }, { id: '3003', count: 1 }, { id: '3002', count: 1 }],
    ])
  })

  it('内容相同时保留客户端标准化后的对象，避免重复写出文件', () => {
    const next = createManagedItemSet(context, recommendation())!
    const existing = { ...next, map: '11', sortrank: 12, associatedMaps: [11] }
    const plan = planManagedItemSetUpsert([existing], [next])
    expect(plan.changed).toBe(false)
    expect(plan.itemSets[0]).toBe(existing)
  })

  it('更新推荐并清理重复项，保留用户配装和其他分路', () => {
    const next = createManagedItemSet(context, recommendation())!
    const old = { ...next, blocks: [] }
    const custom = { ...next, uid: 'custom', title: '我的配装' }
    const top = createManagedItemSet({ ...context, position: 'top' }, recommendation())!
    const plan = planManagedItemSetUpsert([custom, old, old, top], [next])
    expect(plan).toEqual({ itemSets: [custom, next, top], changed: true, removedDuplicates: 1 })
    expect(planManagedItemSetUpsert(plan.itemSets, [next]).changed).toBe(false)
  })

  it('批量合并五路装备集后再次同步无需写入', () => {
    const next = (['top', 'mid', 'jungle', 'adc', 'support'] as const)
      .map((position) => createManagedItemSet({ ...context, position }, recommendation())!)
    const first = planManagedItemSetUpsert([], next)
    expect(first.itemSets).toHaveLength(5)
    expect(planManagedItemSetUpsert(first.itemSets, next).changed).toBe(false)
  })

  it.each(['KIWI', 'kiwi', 'ARAM', 'CHERRY', 'ARENA', 'URF', 'ARURF', 'NEXUSBLITZ', 'NEXUS_BLITZ'])(
    '模式 %s 不再生成装备集', (gameMode) => {
      expect(createManagedItemSet({ ...context, gameMode }, recommendation())).toBeNull()
    },
  )

  it('仅关联峡谷地图，同步时保留已有的其他模式装备集', () => {
    const ranked = createManagedItemSet(context, recommendation())!
    const existingKiwi = { ...ranked, uid: 'sona-37-kiwi-none', title: '[Sona] 海克斯大乱斗', associatedMaps: [12] }
    expect(ranked.associatedMaps).toEqual([11])
    expect(planManagedItemSetUpsert([existingKiwi], [ranked]).itemSets).toEqual([existingKiwi, ranked])
  })
})
