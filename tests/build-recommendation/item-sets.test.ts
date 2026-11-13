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
    const existing = { ...next, map: '11', sortrank: 12, associatedMaps: [30, 12, 11] }
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

  it('海克斯和普通大乱斗同英雄装备集并存，旧海克斯 UID 通过标题迁移', () => {
    const aramContext = { ...context, position: 'none' as const, gameMode: 'ARAM', queueId: 450 }
    const aram = createManagedItemSet(aramContext, recommendation({ modeLabel: '极地大乱斗' }))!
    const kiwi = createManagedItemSet({ ...aramContext, gameMode: 'KIWI', queueId: 2400 }, recommendation({ modeLabel: '海克斯大乱斗' }))!
    expect(aram.uid).not.toBe(kiwi.uid)
    expect(planManagedItemSetUpsert([aram], [kiwi]).itemSets).toEqual([aram, kiwi])
    const legacyKiwi = { ...kiwi, uid: aram.uid }
    const migrated = planManagedItemSetUpsert([legacyKiwi], [kiwi])
    expect(migrated.itemSets).toEqual([kiwi])
    expect(migrated.changed).toBe(true)
    expect(planManagedItemSetUpsert(migrated.itemSets, [aram]).itemSets).toEqual([kiwi, aram])
  })
})
