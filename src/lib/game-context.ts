import { getQueue } from '@/lib/assets'
import { isSummonersRift, isSummonersRiftGameflow } from '@/lib/game-mode'
import { lcu } from '@/lib/lcu'
import type { ChampSelectSession } from '@/types/lcu'

export async function isSummonersRiftChampSelect(session: ChampSelectSession): Promise<boolean> {
  const queue = getQueue(session.queueId)
  if (queue) return isSummonersRift(queue)

  const gameflow = await lcu.getGameflowSession().catch(() => null)
  return Boolean(gameflow
    && gameflow.gameData?.queue?.id === session.queueId
    && isSummonersRiftGameflow(gameflow))
}
