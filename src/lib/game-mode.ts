import type { GameflowSession } from '@/types/lcu'

/** 地图相同的轮换玩法也不属于经典召唤师峡谷。未知模式保持禁用。 */
export function isSummonersRift(context: { gameMode?: string; mapId?: number }): boolean {
  return context.gameMode?.toUpperCase() === 'CLASSIC'
    && context.mapId === 11
}

export function isSummonersRiftGameflow(session: GameflowSession): boolean {
  return isSummonersRift({
    gameMode: session.gameData?.queue?.gameMode || session.map?.gameMode,
    mapId: session.map?.id ?? session.gameData?.queue?.mapId,
  })
}
