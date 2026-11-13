import { useState, type MouseEvent as ReactMouseEvent } from 'react'
import { getChampIcon, getItemIcon, getSpellIcon, getPerkIcon, getPerkStyleIcon, getQueueName, getMapName } from '@/lib/assets'
import type { SgpGameSummaryLol, SgpParticipantLol } from '@/types/sgp'

// ==================== 数据解析 ====================

function formatK(value: number): string {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value)
}

/** 将 UTC 时间戳格式化为本地友好格式：今天/昨天/前天 HH:MM，更远则显示日期 */
function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()

  // 取本地日期的零点，用于比较天数差
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffDays = Math.round((today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24))

  const time = date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })

  if (diffDays === 0) return `${'今天'} ${time}`
  if (diffDays === 1) return `${'昨天'} ${time}`
  if (diffDays === 2) return `${'前天'} ${time}`
  return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }) + ' ' + time
}

export interface MatchRowData {
  gameId: number
  queueId: number
  win: boolean
  championId: number
  level: number
  kills: number
  deaths: number
  assists: number
  cs: number
  gold: number
  damage: number
  queueName: string
  mapName: string
  spell1Id: number
  spell2Id: number
  perk0: number
  perkSubStyle: number
  items: number[]
  gameCreation: number
}

/** 从 SGP 对局数据中解析指定玩家的战绩行 */
export function parseSgpMatch(game: SgpGameSummaryLol, puuid: string): MatchRowData | null {
  const json = game.json
  const participant = json.participants.find((p: SgpParticipantLol) => p.puuid === puuid)
  if (!participant) return null

  // mapId=12 的地图有多个皮肤变体，通过 gameModeMutators 区分
  let mapName = getMapName(json.mapId)
  if (json.mapId === 12) {
    const mutator = json.gameModeMutators?.[0]
    if (mutator === 'mapskin_ha_bilgewater') mapName = '屠夫之桥'
    else if (mutator === 'mapskin_map12_bloom') mapName = '莲华栈桥'
    else mapName = '嚎哭深渊'
  }

  // SGP 的符文结构：perks.styles[0] = 主系, styles[1] = 副系
  const primaryStyle = participant.perks?.styles?.[0]
  const subStyle = participant.perks?.styles?.[1]
  const perk0 = primaryStyle?.selections?.[0]?.perk ?? 0
  const perkSubStyle = subStyle?.style ?? 0

  return {
    gameId: json.gameId,
    queueId: json.queueId,
    win: participant.win,
    championId: participant.championId,
    level: participant.champLevel,
    kills: participant.kills,
    deaths: participant.deaths,
    assists: participant.assists,
    cs: participant.totalMinionsKilled + participant.neutralMinionsKilled,
    gold: participant.goldEarned,
    damage: participant.totalDamageDealtToChampions,
    queueName: getQueueName(json.queueId),
    mapName,
    spell1Id: participant.spell1Id,
    spell2Id: participant.spell2Id,
    perk0,
    perkSubStyle,
    items: [participant.item0, participant.item1, participant.item2, participant.item3, participant.item4, participant.item5, participant.item6],
    gameCreation: json.gameCreation,
  }
}

// ==================== 组件 ====================

export function MatchRow({ match, onOpenDetail }: { match: MatchRowData; onOpenDetail: (gameId: number) => void }) {
  const statusClass = match.win ? 'smh-win' : 'smh-loss'
  const statusText = match.win ? '胜利' : '失败'
  const [copied, setCopied] = useState(false)

  const handleCopyGameId = (e: ReactMouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(String(match.gameId)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div
      className={`smh-row ${statusClass}`}
      role="button"
      tabIndex={0}
      onClick={() => onOpenDetail(match.gameId)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpenDetail(match.gameId)
        }
      }}
      title={'点击查看单局详情'}
    >
      <div className="smh-row-left">
        <div className="smh-champion">
          <div className="smh-champion-mask">
            <img className="smh-champion-icon" src={getChampIcon(match.championId)} alt="" />
          </div>
          <span className="smh-champion-level">{match.level}</span>
        </div>
        <div className="smh-row-info">
          <span className={`smh-status ${statusClass}`}>{statusText}</span>
          <span className="smh-gamemode">{match.queueName}</span>
          <div className="smh-spells">
            <img className="smh-spell" src={getSpellIcon(match.spell1Id)} alt="" />
            <img className="smh-spell" src={getSpellIcon(match.spell2Id)} alt="" />
            {match.perk0 > 0 && getPerkIcon(match.perk0) && (
              <>
                <img className="smh-perk smh-perk-primary" src={getPerkIcon(match.perk0)} alt="" />
                {match.perkSubStyle > 0 && getPerkStyleIcon(match.perkSubStyle) && (
                  <img className="smh-perk smh-perk-sub" src={getPerkStyleIcon(match.perkSubStyle)} alt="" />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="smh-row-center">
        <div className="smh-items">
          {match.items.map((id, idx) => (
            <div key={idx} className="smh-item-slot">
              {id > 0 && <img className="smh-item-icon" src={getItemIcon(id)} alt="" />}
            </div>
          ))}
        </div>
        <div className="smh-stats-line">
          <span className="smh-kda">
            <span className="smh-sprite-icon" style={{ WebkitMaskImage: 'url(/fe/lol-match-history/icons.png)', WebkitMaskPositionY: '0%', width: '22px', height: '22px' }} />
            <span className={`smh-kda-num${match.kills >= match.deaths && match.kills >= match.assists ? ' smh-kda-highlight' : ''}`}>{match.kills}</span>
            {' / '}
            <span className={`smh-kda-num${match.deaths > match.kills && match.deaths > match.assists ? ' smh-kda-highlight' : ''}`}>{match.deaths}</span>
            {' / '}
            <span className={`smh-kda-num${match.assists > match.kills && match.assists > match.deaths ? ' smh-kda-highlight' : ''}`}>{match.assists}</span>
          </span>
          <span className="smh-cs">
            <span className="smh-stat-icon" style={{ WebkitMaskImage: 'url(/fe/lol-match-history/icon_minions.png)' }} />
            {match.cs}
          </span>
          <span className="smh-gold">
            <span className="smh-stat-icon" style={{ WebkitMaskImage: 'url(/fe/lol-match-history/icon_gold.png)' }} />
            {formatK(match.gold)}
          </span>
          <span className="smh-damage">
            🗡️ {formatK(match.damage)}
          </span>
        </div>
      </div>

      <div className="smh-row-right">
        <span className="smh-mapname">{match.mapName}</span>
        <span className="smh-date">{formatDate(match.gameCreation)}</span>
        <span className="smh-gameid" onClick={handleCopyGameId}>
          ID:{match.gameId}
          <span className={`smh-copy-icon ${copied ? 'smh-copied' : ''}`} style={{ WebkitMaskImage: 'url(/fe/lol-static-assets/images/game-id-clipboard-copy.svg)' }} />
        </span>
      </div>
    </div>
  )
}
