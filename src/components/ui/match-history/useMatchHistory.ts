import { useCallback, useEffect, useRef, useState } from 'react'
import { lcu, queueIdToTag } from '@/lib/lcu'
import type { SgpGameSummaryLol } from '@/types/sgp'
import { isSummonersRiftQueue } from '@/lib/assets'
import { isSummonersRift } from '@/lib/game-mode'

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
      let page: SgpGameSummaryLol[] = []
      // 游标按原始响应推进；整页都是其他玩法时继续查找，避免空列表卡住分页。
      do {
        const response = await lcu.getSgpMatchHistory(session.puuid, {
          startIndex: session.nextIndex,
          count: PAGE_SIZE,
          tag: queueIdToTag(session.queueId) || undefined,
        })
        if (sessionRef.current !== session) return
        const rawPage = response.games ?? []
        page = rawPage.filter((game) => isSummonersRift(game.json)
          && (session.queueId === 0 || game.json.queueId === session.queueId))
        session.nextIndex += rawPage.length
        session.hasMore = rawPage.length >= PAGE_SIZE
      } while (page.length === 0 && session.hasMore)
      setGames((previous) => initial ? page : [...previous, ...page])
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
    const supportedQueueId = isSummonersRiftQueue(queueId) ? queueId : 0
    const session: HistorySession = { puuid, queueId: supportedQueueId, nextIndex: 0, busy: false, hasMore: true }
    sessionRef.current = session
    setFilterQueueId(supportedQueueId)
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
