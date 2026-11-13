import type { BuildRecommendation, RecommendationContext } from '@/types/build-recommendation'
import type { OpggItemBuild } from '@/lib/opgg-api'

export const context: RecommendationContext = {
  championId: 37, queueId: 420, gameVersion: '16.1', gameMode: 'CLASSIC', mapId: 11, position: 'support',
}

export function itemBuild(ids: number[], win = 50, play = 100): OpggItemBuild {
  return { ids, win, play, pick_rate: 0.5 }
}

export function recommendation(overrides: Partial<BuildRecommendation> = {}): BuildRecommendation {
  return {
    version: '16.1', position: 'support', summary: [],
    summonerSpells: [], starterItems: [], boots: [], coreItems: [itemBuild([3001])],
    lastItems: [], runePages: [], matchups: [], ...overrides,
  }
}
