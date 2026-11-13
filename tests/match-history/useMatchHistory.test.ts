// @vitest-environment jsdom
import { act, createElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useMatchHistory } from '@/components/ui/match-history/useMatchHistory'
import { lcu } from '@/lib/lcu'
import type { SgpGameSummaryLol, SgpMatchHistoryLol } from '@/types/sgp'

vi.mock('@/lib/assets', () => ({ isSummonersRiftQueue: (id: number) => [420, 440, 430].includes(id) }))

vi.mock('@/lib/lcu', () => ({
  lcu: { getSgpMatchHistory: vi.fn() },
  queueIdToTag: (id: number) => id ? `q_${id}` : '',
}))

function deferred() {
  let resolve!: (value: SgpMatchHistoryLol) => void
  let reject!: (error: Error) => void
  const promise = new Promise<SgpMatchHistoryLol>((yes, no) => { resolve = yes; reject = no })
  return { promise, resolve, reject }
}

function page(startId: number, count = 20, queueId = 420): SgpMatchHistoryLol {
  return { games: Array.from({ length: count }, (_, i) => ({ json: { gameId: startId + i, gameMode: 'CLASSIC', mapId: 11, queueId } } as SgpGameSummaryLol)) }
}

let root: Root
let container: HTMLDivElement
let current: ReturnType<typeof useMatchHistory>
let props: { open: boolean; puuid: string; queueId: number }
function Harness() {
  current = useMatchHistory(props.open, props.puuid, props.queueId)
  return null
}
async function render(overrides: Partial<typeof props> = {}) {
  props = { ...props, ...overrides }
  await act(async () => { root.render(createElement(Harness)) })
}

beforeEach(() => {
  vi.resetAllMocks()
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
  props = { open: true, puuid: 'player-a', queueId: 420 }
  container = document.createElement('div')
  root = createRoot(container)
})
afterEach(async () => { await act(async () => { root.unmount() }); container.remove() })

describe('战绩分页会话', () => {
  it('混合响应只展示峡谷，下一页游标仍按原始返回数量推进', async () => {
    const mixed = page(1)
    mixed.games[0].json.gameMode = 'KIWI'
    mixed.games[0].json.mapId = 12
    mixed.games[1].json.gameMode = 'URF'
    vi.mocked(lcu.getSgpMatchHistory).mockResolvedValueOnce(mixed).mockResolvedValueOnce(page(21, 1))
    await render()
    expect(current.games).toHaveLength(18)
    expect(current.hasMore).toBe(true)
    await act(async () => { current.loadMore() })
    expect(lcu.getSgpMatchHistory).toHaveBeenLastCalledWith('player-a', { startIndex: 20, count: 20, tag: 'q_420' })
    expect(current.games).toHaveLength(19)
  })

  it('整页都是其他模式时继续翻页，不因空列表而漏掉后面的峡谷战绩', async () => {
    const unsupported = page(1)
    unsupported.games.forEach((game) => { game.json.gameMode = 'ARAM'; game.json.mapId = 12 })
    vi.mocked(lcu.getSgpMatchHistory).mockResolvedValueOnce(unsupported).mockResolvedValueOnce(page(21, 1))
    await render()
    expect(current.games.map((game) => game.json.gameId)).toEqual([21])
    expect(lcu.getSgpMatchHistory).toHaveBeenCalledTimes(2)
    expect(current.hasMore).toBe(false)
  })

  it('非峡谷默认队列回到全部峡谷，不发送其他模式的查询标签', async () => {
    vi.mocked(lcu.getSgpMatchHistory).mockResolvedValueOnce(page(1, 1))
    await render({ queueId: 450 })
    expect(current.filterQueueId).toBe(0)
    expect(lcu.getSgpMatchHistory).toHaveBeenCalledWith('player-a', { startIndex: 0, count: 20, tag: undefined })
    expect(current.games).toHaveLength(1)
  })

  it('切换队列后忽略旧请求结果和 finally，不提前解锁新请求', async () => {
    const old = deferred(), fresh = deferred()
    vi.mocked(lcu.getSgpMatchHistory).mockReturnValueOnce(old.promise).mockReturnValueOnce(fresh.promise)
    await render()
    await act(async () => { current.changeFilter(440) })
    await act(async () => { old.resolve(page(1)) })
    expect(current.games).toEqual([])
    expect(current.loading).toBe(true)
    await act(async () => { current.loadMore() })
    expect(lcu.getSgpMatchHistory).toHaveBeenCalledTimes(2)
    await act(async () => { fresh.resolve(page(100, 1, 440)) })
    expect(current.games[0].json.gameId).toBe(100)
    expect(current.filterQueueId).toBe(440)
    expect(current.hasMore).toBe(false)
  })

  it('切换玩家后忽略旧错误，重新使用默认队列', async () => {
    const old = deferred()
    vi.mocked(lcu.getSgpMatchHistory).mockReturnValueOnce(old.promise).mockResolvedValueOnce(page(100, 1, 440))
    await render()
    await render({ puuid: 'player-b', queueId: 440 })
    await act(async () => { old.reject(new Error('old failure')) })
    expect(current.error).toBe('')
    expect(current.games[0].json.gameId).toBe(100)
    expect(lcu.getSgpMatchHistory).toHaveBeenLastCalledWith('player-b', { startIndex: 0, count: 20, tag: 'q_440' })
  })

  it('连续滚动只请求一页，失败后在同一游标重试', async () => {
    const more = deferred()
    vi.mocked(lcu.getSgpMatchHistory).mockResolvedValueOnce(page(1)).mockReturnValueOnce(more.promise).mockResolvedValueOnce(page(21, 2))
    await render()
    await act(async () => { current.loadMore(); current.loadMore(); current.loadMore() })
    expect(lcu.getSgpMatchHistory).toHaveBeenCalledTimes(2)
    await act(async () => { more.reject(new Error('retry')) })
    expect(current.games).toHaveLength(20)
    expect(current.error).toBe('')
    await act(async () => { current.loadMore() })
    expect(lcu.getSgpMatchHistory).toHaveBeenLastCalledWith('player-a', { startIndex: 20, count: 20, tag: 'q_420' })
    expect(current.games).toHaveLength(22)
    expect(current.hasMore).toBe(false)
  })

  it('分页中切换过滤器，旧页不能混入新队列', async () => {
    const more = deferred()
    vi.mocked(lcu.getSgpMatchHistory).mockResolvedValueOnce(page(1)).mockReturnValueOnce(more.promise).mockResolvedValueOnce(page(100, 1, 440))
    await render()
    await act(async () => { current.loadMore() })
    await act(async () => { current.changeFilter(440) })
    await act(async () => { more.resolve(page(21)) })
    expect(current.games.map((game) => game.json.gameId)).toEqual([100])
    expect(current.loadingMore).toBe(false)
  })

  it('关闭后忽略请求，重开后从第一页重新加载', async () => {
    const old = deferred()
    vi.mocked(lcu.getSgpMatchHistory).mockReturnValueOnce(old.promise).mockResolvedValueOnce(page(100, 1))
    await render()
    await render({ open: false })
    await act(async () => { old.resolve(page(1)) })
    expect(current.games).toEqual([])
    await render({ open: true })
    expect(current.games[0].json.gameId).toBe(100)
    expect(lcu.getSgpMatchHistory).toHaveBeenCalledTimes(2)
  })

  it('首屏失败后停止自动翻页，重新选择队列可重试', async () => {
    vi.mocked(lcu.getSgpMatchHistory).mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(page(1, 1))
    await render()
    expect(current.error).toBe('战绩加载失败')
    await act(async () => { current.loadMore() })
    expect(lcu.getSgpMatchHistory).toHaveBeenCalledTimes(1)
    await act(async () => { current.changeFilter(420) })
    expect(current.error).toBe('')
    expect(current.games).toHaveLength(1)
  })
})
