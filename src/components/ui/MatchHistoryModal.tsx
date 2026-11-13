import { useState, useEffect, useRef, useMemo } from 'react'
import { Modal } from '@/components/ui/Modal'
import { MatchDetailModal } from '@/components/ui/MatchDetailModal'
import { lcu } from '@/lib/lcu'
import { getQueueName, getPlayableQueues } from '@/lib/assets'
import { MatchRow, parseSgpMatch, type MatchRowData } from './match-history/MatchRow'
import { useMatchHistory } from './match-history/useMatchHistory'
import '@/styles/MatchHistoryModal.css'

export interface MatchHistoryModalProps {
  open: boolean
  onClose: () => void
  puuid: string
  playerName: string
  /** 可选：默认过滤的队列 ID，不传则查全部峡谷队列 */
  queueId?: number
}

/**
 * 战绩弹窗
 *
 * 使用 SGP 接口查询战绩，支持通过 tag 参数按队列模式服务端过滤。
 * 下拉切换模式时会重新请求 SGP，而非前端过滤。
 */
export function MatchHistoryModal({ open, onClose, puuid, playerName, queueId: defaultQueueId }: MatchHistoryModalProps) {
  const [resolvedPlayerName, setResolvedPlayerName] = useState(playerName)
  const { games, loading, loadingMore, error, hasMore, filterQueueId, changeFilter, loadMore } = useMatchHistory(open, puuid, defaultQueueId)
  const matches = useMemo(() => games
    .map((game) => parseSgpMatch(game, puuid))
    .filter((match): match is MatchRowData => match !== null), [games, puuid])
  const [filterOpen, setFilterOpen] = useState(false)
  const [detailGameId, setDetailGameId] = useState<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  // 调用方可能只有从匿名会话还原出的 PUUID，传入的名字会是空串或单独的 "#"。
  // 弹窗自身再做一层兜底，保证所有入口都能用真实 PUUID 回填 Riot ID。
  useEffect(() => {
    const providedName = playerName.trim()
    const hasUsableProvidedName = Boolean(providedName.replace(/#/g, '').trim())
    setResolvedPlayerName(hasUsableProvidedName ? providedName : '未知')

    if (!open || !puuid || hasUsableProvidedName) return

    let cancelled = false
    void lcu.getSummonerByPuuid(puuid)
      .then((summoner) => {
        if (cancelled) return
        const riotId = summoner.gameName
          ? `${summoner.gameName}${summoner.tagLine ? `#${summoner.tagLine}` : ''}`
          : summoner.displayName
        if (riotId) setResolvedPlayerName(riotId)
      })
      .catch(() => {
        // 战绩查询本身不依赖名字；回填失败时保留“未知”，不影响主流程。
      })

    return () => {
      cancelled = true
    }
  }, [open, playerName, puuid])

  // 可玩队列缓存
  const [queueOptions, setQueueOptions] = useState<{ id: number; name: string }[]>([])
  useEffect(() => {
    const all = getPlayableQueues()
    setQueueOptions(all)
  }, [])

  // 点击外部关闭下拉框
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // 滚动到底部触发加载更多
  useEffect(() => {
    if (!open) return
    let cleanupScroll: (() => void) | undefined
    // 等 Modal DOM 渲染后再绑定
    const raf = requestAnimationFrame(() => {
      const el = listRef.current
      if (!el) return
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = el
        if (scrollHeight - scrollTop - clientHeight < 60) {
          loadMore()
        }
      }
      el.addEventListener('scroll', handleScroll, { passive: true })
      cleanupScroll = () => el.removeEventListener('scroll', handleScroll)
    })

    return () => {
      cancelAnimationFrame(raf)
      cleanupScroll?.()
    }
  }, [open, loadMore])

  const handleFilterChange = (queueId: number) => {
    setFilterOpen(false)
    changeFilter(queueId)
  }

  const currentFilterLabel = filterQueueId > 0
    ? (queueOptions.find(q => q.id === filterQueueId)?.name ?? getQueueName(filterQueueId))
    : '全部峡谷队列'

  return (
    <Modal open={open} onClose={onClose} width={860} height={620}>
      <div className="smh-container">
        <div className="smh-header">
          <span className="smh-title">{`❖ ${resolvedPlayerName} 的近期战报`}</span>
          <div className="smh-filter" ref={filterRef}>
            <button
              className={`smh-filter-trigger${filterOpen ? ' smh-filter-trigger--open' : ''}`}
              onClick={() => setFilterOpen(!filterOpen)}
              type="button"
            >
              <span>{currentFilterLabel}</span>
              <svg className={`smh-filter-arrow${filterOpen ? ' smh-filter-arrow--open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {filterOpen && (
              <div className="smh-filter-dropdown">
                <button
                  className={`smh-filter-option${filterQueueId === 0 ? ' smh-filter-option--active' : ''}`}
                  onClick={() => handleFilterChange(0)}
                  type="button"
                >
                  {'全部峡谷队列'}
                </button>
                {queueOptions.map((q) => (
                  <button
                    key={q.id}
                    className={`smh-filter-option${filterQueueId === q.id ? ' smh-filter-option--active' : ''}`}
                    onClick={() => handleFilterChange(q.id)}
                    type="button"
                  >
                    {q.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="smh-list" ref={listRef}>
          {loading && <div className="smh-empty">{'正在拉取战绩...'}</div>}
          {error && <div className="smh-empty smh-error">{error}</div>}
          {!loading && !error && matches.length === 0 && (
            <div className="smh-empty">{'暂无对局数据'}</div>
          )}
          {matches.map((m) => (
            <MatchRow key={m.gameId} match={m} onOpenDetail={setDetailGameId} />
          ))}
          {loadingMore && <div className="smh-empty">{'正在加载更多...'}</div>}
          {!loading && !error && matches.length > 0 && (
            <div className="smh-empty smh-no-more">
              {hasMore ? '↓ 下滑加载更多' : `— 共 ${matches.length} 条战绩 —`}
            </div>
          )}
        </div>
        <MatchDetailModal
          open={detailGameId != null}
          onClose={() => setDetailGameId(null)}
          gameId={detailGameId}
          focusPuuid={puuid}
        />
      </div>
    </Modal>
  )
}
