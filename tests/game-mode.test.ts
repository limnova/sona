import { describe, expect, it } from 'vitest'
import { isSummonersRift, isSummonersRiftGameflow } from '@/lib/game-mode'
import type { GameflowSession } from '@/types/lcu'
import type { SgpGameSummaryLol } from '@/types/sgp'
import { calculateSonaGameStrengthScore, calculateSonaPlayerStrengthScore, filterSonaStrengthGamesByQueue } from '@/lib/player-strength-score'

const participant = {
  puuid: 'player', teamId: 100, championId: 37, teamPosition: 'UTILITY', win: true,
  kills: 5, deaths: 2, assists: 15, timePlayed: 1800,
  totalDamageDealtToChampions: 15000, goldEarned: 10000, totalDamageTaken: 20000,
  damageDealtToObjectives: 2000, totalMinionsKilled: 30, neutralMinionsKilled: 0,
  visionScore: 50, wardsPlaced: 20, wardsKilled: 5, detectorWardsPlaced: 4,
  turretTakedowns: 2, damageSelfMitigated: 10000, totalHeal: 2000,
  totalHealsOnTeammates: 3000, totalDamageShieldedOnTeammates: 4000,
}

function game(gameId: number, gameMode = 'CLASSIC', mapId = 11, queueId = 420): SgpGameSummaryLol {
  return { metadata: { tags: [`q_${queueId}`] }, json: {
    gameId, gameMode, mapId, queueId, gameDuration: 1800, participants: [participant],
  } } as unknown as SgpGameSummaryLol
}

describe('仅支持经典召唤师峡谷', () => {
  it.each(['CLASSIC', 'classic'])('接受经典峡谷 %s', (gameMode) => {
    expect(isSummonersRift({ gameMode, mapId: 11 })).toBe(true)
  })

  it.each(['ARAM', 'KIWI', 'CHERRY', 'ARENA', 'URF', 'ARURF', 'NEXUSBLITZ', 'ONEFORALL', 'ULTBOOK', 'TFT', 'UNKNOWN', ''])(
    '拒绝 %s，即使地图 ID 是 11', (gameMode) => {
      expect(isSummonersRift({ gameMode, mapId: 11 })).toBe(false)
      expect(calculateSonaGameStrengthScore(game(1, gameMode), 'player')).toBeNull()
    },
  )

  it.each([undefined, 0, 10, 12, 30])('经典模式地图 %s 不属于已确认峡谷', (mapId) => {
    expect(isSummonersRift({ gameMode: 'CLASSIC', mapId })).toBe(false)
  })

  it('游戏流程使用队列的玩法和实际地图，避免将峡谷地图上的轮换玩法放行', () => {
    const session = { gameData: { queue: { gameMode: 'URF', mapId: 11 } }, map: { id: 11, gameMode: 'CLASSIC' } } as GameflowSession
    expect(isSummonersRiftGameflow(session)).toBe(false)
    session.gameData.queue.gameMode = 'CLASSIC'
    expect(isSummonersRiftGameflow(session)).toBe(true)
    session.map.id = 12
    expect(isSummonersRiftGameflow(session)).toBe(false)
  })

  it('全部队列和指定队列的评分均剔除其他玩法，保留峡谷原有评分', () => {
    const ranked = game(1), normal = game(2, 'CLASSIC', 11, 430)
    const others = [game(3, 'KIWI', 12, 2400), game(4, 'URF', 11, 900), game(5, 'CLASSIC', 10)]
    // 即使服务端错误地给轮换玩法贴上当前队列标签，也不能进入统计。
    others[1].metadata.tags = ['q_420']
    expect(filterSonaStrengthGamesByQueue([ranked, normal, ...others], 0)).toEqual([ranked, normal])
    expect(filterSonaStrengthGamesByQueue([ranked, normal, ...others], 420)).toEqual([ranked])
    const expected = calculateSonaPlayerStrengthScore([ranked], 'player')
    expect(expected?.score).toBeGreaterThan(0)
    expect(calculateSonaPlayerStrengthScore([ranked, ...others], 'player')).toEqual(expected)
    expect(calculateSonaPlayerStrengthScore(others, 'player')).toBeNull()
  })
})
