import { isSummonersRift } from '@/lib/game-mode'
import { getItemPrice, getQueueName } from '@/lib/assets'
import type { ItemSet, ItemSetBlock } from '@/lib/lcu'
import type { OpggItemBuild } from '@/lib/opgg-api'
import type { BuildRecommendation, RecommendationContext } from '@/types/build-recommendation'
import { getChampionName, getPositionLabel } from './context'

const SONA_ITEM_SET_TITLE_PREFIX = '[Sona]'
const HEALTH_POTION_ID = 2003
const ITEM_SET_ASSOCIATED_MAPS = [11]

function toItemSetEntry(id: number) {
  return {
    id: String(id),
    count: id === HEALTH_POTION_ID ? 2 : 1,
  }
}

function normalizeItemIds(ids: number[]): number[] {
  const seen = new Set<number>()
  const normalized: number[] = []

  for (const id of ids) {
    const itemId = Number(id)
    if (!Number.isFinite(itemId) || itemId <= 0 || seen.has(itemId)) continue
    seen.add(itemId)
    normalized.push(itemId)
  }

  return normalized
}

function flattenItemBuilds(builds: OpggItemBuild[]): number[] {
  return normalizeItemIds(builds.flatMap((build) => build.ids))
}

/** 按装备总价从高到低排序（价格相同保持原有顺序） */
function sortItemIdsByPriceDesc(itemIds: number[]): number[] {
  return itemIds
    .map((id, index) => ({ id, index, price: getItemPrice(id) }))
    .sort((a, b) => b.price - a.price || a.index - b.index)
    .map((entry) => entry.id)
}

function getItemBuildWinRate(build: OpggItemBuild): number {
  return build.play > 0 ? build.win / build.play : 0
}

function sortItemBuildsByWinRate(builds: OpggItemBuild[]): OpggItemBuild[] {
  return [...builds].sort((a, b) => {
    const winRateDiff = getItemBuildWinRate(b) - getItemBuildWinRate(a)
    return winRateDiff || b.pick_rate - a.pick_rate || b.play - a.play
  })
}

function createItemSetBlock(type: string, itemIds: number[]): ItemSetBlock | null {
  const ids = normalizeItemIds(itemIds)
  if (ids.length === 0) return null

  return {
    type,
    items: ids.map(toItemSetEntry),
  }
}

function appendItemSetBlock(blocks: ItemSetBlock[], type: string, itemIds: number[]): void {
  const block = createItemSetBlock(type, itemIds)
  if (block) blocks.push(block)
}

function buildItemSetBlocks(recommendation: BuildRecommendation): ItemSetBlock[] {
  const blocks: ItemSetBlock[] = []
  const starterItems = sortItemBuildsByWinRate(recommendation.starterItems)
  const boots = sortItemBuildsByWinRate(recommendation.boots)
  const coreItems = sortItemBuildsByWinRate(recommendation.coreItems)
  const lastItems = sortItemBuildsByWinRate(recommendation.lastItems)

  starterItems.slice(0, 3).forEach((build, index) => {
    appendItemSetBlock(blocks, `${index + 1}. 出门装`, build.ids)
  })

  appendItemSetBlock(blocks, `${blocks.length + 1}. 鞋子`, flattenItemBuilds(boots))

  coreItems.slice(0, 5).forEach((build, index) => {
    appendItemSetBlock(blocks, `${blocks.length + 1}. 核心装 ${index + 1}`, build.ids)
  })

  appendItemSetBlock(blocks, `${blocks.length + 1}. 后续装备`, sortItemIdsByPriceDesc(flattenItemBuilds(lastItems)))

  return blocks
}

export function getManagedItemSetUid(context: RecommendationContext): string {
  // 保持既有 UID，避免升级后重复创建峡谷装备集。
  return `sona-${context.championId}-ranked-${context.position}`
}

function getManagedItemSetTitle(context: RecommendationContext): string {
  const championName = getChampionName(context.championId)
  const positionLabel = getPositionLabel(context.position)
  const queueName = getQueueName(context.queueId)
  const suffix = positionLabel ? `${queueName}/${positionLabel}` : queueName
  return `${SONA_ITEM_SET_TITLE_PREFIX} ${championName} - ${suffix}`
}

export function createManagedItemSet(context: RecommendationContext, recommendation: BuildRecommendation): ItemSet | null {
  if (!isSummonersRift(context)) return null
  const blocks = buildItemSetBlocks(recommendation)
  if (blocks.length === 0) return null

  return {
    uid: getManagedItemSetUid(context),
    title: getManagedItemSetTitle(context),
    type: 'custom',
    mode: 'any',
    map: 'any',
    associatedChampions: [context.championId],
    associatedMaps: ITEM_SET_ASSOCIATED_MAPS,
    blocks,
    preferredItemSlots: [],
    sortrank: 0,
    startedFrom: 'blank',
  }
}

function isSameManagedItemSetContext(itemSet: ItemSet, nextItemSet: ItemSet): boolean {
  // 仅在 uid 或标题完全一致时替换；其他分路和既有 Sona 配装得以并存，
  // 不再因"同英雄"被整体清掉。
  return itemSet.uid === nextItemSet.uid || itemSet.title === nextItemSet.title
}

function areNumberArraysEqual(left: number[], right: number[]): boolean {
  if (left.length !== right.length) return false

  const sortedLeft = [...left].sort((a, b) => a - b)
  const sortedRight = [...right].sort((a, b) => a - b)
  return sortedLeft.every((value, index) => value === sortedRight[index])
}

function areItemSetBlocksEqual(left: ItemSetBlock[], right: ItemSetBlock[]): boolean {
  if (left.length !== right.length) return false

  return left.every((leftBlock, blockIndex) => {
    const rightBlock = right[blockIndex]
    if (!rightBlock || leftBlock.type !== rightBlock.type || leftBlock.items.length !== rightBlock.items.length) {
      return false
    }

    return leftBlock.items.every((leftItem, itemIndex) => {
      const rightItem = rightBlock.items[itemIndex]
      return Boolean(rightItem)
        && String(leftItem.id) === String(rightItem.id)
        && Number(leftItem.count) === Number(rightItem.count)
    })
  })
}

/**
 * 比较会影响推荐内容的字段。
 *
 * LCU / 游戏端会把 map、sortrank 以及 block 上的显示条件等字段标准化，
 * 因此不能直接 JSON.stringify 整个对象，否则同一份配装会被误判成有变化。
 */
function isManagedItemSetContentEqual(itemSet: ItemSet, nextItemSet: ItemSet): boolean {
  return itemSet.uid === nextItemSet.uid
    && itemSet.title === nextItemSet.title
    && itemSet.type === nextItemSet.type
    && itemSet.mode === nextItemSet.mode
    && areNumberArraysEqual(itemSet.associatedChampions ?? [], nextItemSet.associatedChampions)
    && areNumberArraysEqual(itemSet.associatedMaps ?? [], nextItemSet.associatedMaps)
    && areItemSetBlocksEqual(itemSet.blocks ?? [], nextItemSet.blocks)
}

interface ItemSetUpsertPlan {
  itemSets: ItemSet[]
  changed: boolean
  removedDuplicates: number
}

/**
 * 幂等合并 Sona 装备集。
 *
 * `/lol-item-sets/.../sets` 是整包 PUT。即使内容完全相同，游戏端也会再次向
 * Game/Config/Champions 写出新的 RIOT_ItemSet_N.json，且不会覆盖旧编号文件。
 * 所以只有首次创建、推荐内容变化或需要清理 LCU 内重复项时才允许 PUT。
 */
export function planManagedItemSetUpsert(existingItemSets: ItemSet[], nextItemSets: ItemSet[]): ItemSetUpsertPlan {
  const mergedItemSets: ItemSet[] = []
  const matchedNextIndexes = new Set<number>()
  let changed = false
  let removedDuplicates = 0

  for (const existingItemSet of existingItemSets) {
    const nextIndex = nextItemSets.findIndex((nextItemSet) =>
      isSameManagedItemSetContext(existingItemSet, nextItemSet),
    )

    if (nextIndex < 0) {
      mergedItemSets.push(existingItemSet)
      continue
    }

    // 同一 uid / 标题在 LCU 数据中出现多次时，只保留一份。
    if (matchedNextIndexes.has(nextIndex)) {
      changed = true
      removedDuplicates += 1
      continue
    }

    matchedNextIndexes.add(nextIndex)
    const nextItemSet = nextItemSets[nextIndex]
    if (isManagedItemSetContentEqual(existingItemSet, nextItemSet)) {
      // 保留 LCU 返回的对象，避免 map / sortrank 等标准化字段造成无意义改写。
      mergedItemSets.push(existingItemSet)
    } else {
      mergedItemSets.push(nextItemSet)
      changed = true
    }
  }

  nextItemSets.forEach((nextItemSet, index) => {
    if (matchedNextIndexes.has(index)) return
    mergedItemSets.push(nextItemSet)
    changed = true
  })

  return {
    itemSets: mergedItemSets,
    changed,
    removedDuplicates,
  }
}
