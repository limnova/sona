import type { OpggItemBuild, OpggPosition, OpggRuneBuild } from '@/lib/opgg-api'

export interface RecommendationContext {
  championId: number
  queueId: number
  gameVersion: string
  gameMode: string
  mapId?: number
  position: OpggPosition
}

export interface BuildRecommendation {
  version: string
  position: OpggPosition
  summary: string[]
  summonerSpells: OpggItemBuild[]
  starterItems: OpggItemBuild[]
  boots: OpggItemBuild[]
  coreItems: OpggItemBuild[]
  lastItems: OpggItemBuild[]
  runePages: OpggRuneBuild[]
  matchups: Array<{
    championId: number
    play: number
    win: number
    winRate: number
  }>
  meta?: RecommendationMeta
  warning?: string
}

export interface RecommendationMeta {
  rank: number | null
  previousRank: number | null
  rankDelta: number | null
  totalRank: number | null
  matchCount: number | null
  version: string
  updatedAt: string
}
