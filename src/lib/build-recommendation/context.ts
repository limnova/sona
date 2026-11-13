import { getChampionById, getQueueName } from '@/lib/assets'
import type { OpggMode, OpggPosition } from '@/lib/opgg-api'
import type { RecommendationContext } from '@/types/build-recommendation'

export const FALLBACK_OPGG_POSITION: OpggPosition = 'mid'

export function resolveOpggMode(context: RecommendationContext): OpggMode {
  const mode = context.gameMode.toLowerCase()
  if (mode === 'aram' || mode === 'kiwi') return 'aram'
  if (mode === 'cherry' || mode === 'arena') return 'arena'
  if (mode === 'nexusblitz' || mode === 'nexus_blitz') return 'nexus_blitz'
  if (mode === 'urf' || mode === 'arurf') return 'urf'
  return 'ranked'
}

export function isKiwiMode(context: RecommendationContext): boolean {
  return context.gameMode.toLowerCase() === 'kiwi'
}

export function resolveRecommendationPosition(mode: OpggMode, position: OpggPosition): OpggPosition {
  if (mode !== 'ranked') return 'none'
  if (position === 'none') return FALLBACK_OPGG_POSITION
  return position
}

export function getChampionName(championId: number): string {
  const champion = getChampionById(championId)
  if (!champion) return `英雄 ${championId}`

  return [champion.title, champion.name].filter(Boolean).join(' ')
}

export function getPositionLabel(position: OpggPosition): string {
  switch (position) {
    case 'top':
      return '上路'
    case 'jungle':
      return '打野'
    case 'mid':
      return '中路'
    case 'adc':
      return '下路'
    case 'support':
      return '辅助'
    default:
      return ''
  }
}

export function getModeLabel(mode: OpggMode, context: RecommendationContext): string {
  const queueName = context.queueId > 0 ? getQueueName(context.queueId) : ''
  if (isKiwiMode(context)) return queueName || '海克斯大乱斗'
  if (queueName) return queueName
  switch (mode) {
    case 'aram':
      return '极地大乱斗'
    case 'arena':
      return '斗魂竞技场'
    case 'urf':
      return '无限火力'
    case 'nexus_blitz':
      return '极限闪击'
    default:
      return '召唤师峡谷'
  }
}
