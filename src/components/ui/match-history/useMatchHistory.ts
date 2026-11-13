import { useCallback, useEffect, useRef, useState } from 'react'
import { lcu, queueIdToTag } from '@/lib/lcu'
import type { SgpGameSummaryLol } from '@/types/sgp'

const PAGE_SIZE = 20

interface HistorySession {
  puuid: string
  queueId: number
  nextIndex: number
  busy: boolean
  hasMore: boolean
}

/** 每次切换玩家、队列或重新打开弹窗都创建新会话，过期响应不能更新分页状态。 */
export function useMatchHistory(open: boolean, puuid: string, defaultQueueId = 0) {
  const [games, setGames] = useState<SgpGameSummaryLol[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [filterQueueId, setFilterQueueId] = useState(defaultQueueId)
  const sessionRef = useRef<HistorySession | null>(null)

  const fetchPage = useCallback(async (session: HistorySession, initial: boolean) => {
    // 同步加锁，连续 scroll 事件不必等待 React 提交 loadingMore。
    if (session.busy || !session.hasMore) return
    session.busy = true
    if (initial) setLoading(true)
    else setLoadingMore(true)

    try {
      const response = await lcu.getSgpMatchHistory(session.puuid, {
        startIndex: session.nextIndex,
        count: PAGE_SIZE,
        tag: queueIdToTag(session.queueId) || undefined,
      })
      if (sessionRef.current !== session) return

      const page = response.games ?? []
      setGames((previous) => initial ? page : [...previous, ...page])
      session.nextIndex += page.length
      session.hasMore = page.length >= PAGE_SIZE
      setHasMore(session.hasMore)
    } catch {
      if (sessionRef.current !== session) return
      if (initial) {
        setError('战绩加载失败')
        session.hasMore = false
        setHasMore(false)
      }
      // 加载更多失败时保留已展示的数据和游标，允许再次滚动重试。
    } finally {
      session.busy = false
      if (sessionRef.current === session) {
        setLoading(false)
        setLoadingMore(false)
      }
    }
  }, [])

  const startSession = useCallback((queueId: number) => {
    const session: HistorySession = { puuid, queueId, nextIndex: 0, busy: false, hasMore: true }
    sessionRef.current = session
    setFilterQueueId(queueId)
    setGames([])
    setError('')
    setHasMore(true)
    setLoadingMore(false)
    void fetchPage(session, true)
  }, [puuid, fetchPage])

  useEffect(() => {
    if (open && puuid) startSession(defaultQueueId)
    else {
      setGames([])
      setLoading(false)
      setLoadingMore(false)
    }
    return () => { sessionRef.current = null }
  }, [open, puuid, defaultQueueId, startSession])

  const changeFilter = useCallback((queueId: number) => {
    if (open && puuid) startSession(queueId)
  }, [open, puuid, startSession])

  const loadMore = useCallback(() => {
    const session = sessionRef.current
    if (session) void fetchPage(session, false)
  }, [fetchPage])

  return { games, loading, loadingMore, error, hasMore, filterQueueId, changeFilter, loadMore }
}
