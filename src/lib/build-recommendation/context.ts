import { getChampionById } from '@/lib/assets'
import type { OpggPosition } from '@/lib/opgg-api'

export const FALLBACK_OPGG_POSITION: OpggPosition = 'mid'

export function resolveRecommendationPosition(position: OpggPosition): OpggPosition {
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
