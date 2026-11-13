export type OpggTier = 'all' | 'ibsg' | 'iron' | 'bronze' | 'silver' | 'gold' | 'gold_plus' | 'platinum' | 'platinum_plus' | 'emerald' | 'emerald_plus' | 'diamond' | 'diamond_plus' | 'master' | 'master_plus' | 'grandmaster' | 'challenger'
export type OpggPosition = 'mid' | 'jungle' | 'adc' | 'top' | 'support' | 'all' | 'none'

export interface OpggVersions {
  data: string[]
}

export interface OpggMeta {
  version: string
  cached_at: string
  match_count?: number
  analyzed_at?: string
}

export interface OpggAverageStats {
  win_rate: number
  pick_rate: number
  ban_rate: number | null
  kda: number
  tier: number
  rank: number
  tier_data?: {
    tier: number
    rank: number
    rank_prev: number | null
    rank_prev_patch: number | null
  }
}

export interface OpggSummary {
  id: number
  is_rotation: boolean
  is_rip: boolean
  average_stats: OpggAverageStats
  positions: null
  roles: unknown[]
}

export interface OpggItemBuild {
  ids: number[]
  win: number
  play: number
  pick_rate: number
  total_place?: number
  first_place?: number
}

export interface OpggRuneBuild {
  id: number
  primary_page_id: number
  primary_rune_ids: number[]
  secondary_page_id: number
  secondary_rune_ids: number[]
  stat_mod_ids: number[]
  play: number
  win: number
  pick_rate: number
}

export interface OpggRunePage {
  id: number
  primary_page_id: number
  secondary_page_id: number
  play: number
  win: number
  pick_rate: number
  builds: OpggRuneBuild[]
}

export interface OpggSkillBuild {
  order: string[]
  play: number
  win: number
  pick_rate: number
  total_place?: number
  first_place?: number
}

export interface OpggSkillMastery {
  ids: string[]
  play: number
  win: number
  pick_rate: number
  total_place?: number
  first_place?: number
  builds: OpggSkillBuild[]
}

export interface OpggTrendPoint {
  version: string
  rate: number
  rank: number
  created_at: string
}

export interface OpggTrends {
  total_rank: number
  total_position_rank: number
  win: OpggTrendPoint[]
  pick: OpggTrendPoint[]
  ban: OpggTrendPoint[]
}

export interface OpggGameLength {
  game_length: number
  rate: number
  average: number
  rank: number
}

export interface OpggCounter {
  champion_id: number
  play: number
  win: number
}

export interface OpggChampionData {
  summary: OpggSummary
  summoner_spells: OpggItemBuild[]
  core_items: OpggItemBuild[]
  mythic_items: OpggItemBuild[]
  boots: OpggItemBuild[]
  starter_items: OpggItemBuild[]
  last_items: OpggItemBuild[]
  rune_pages: OpggRunePage[]
  runes: OpggRuneBuild[]
  skill_masteries: OpggSkillMastery[]
  skills: OpggSkillBuild[]
  skill_evolves: unknown[]
  trends: OpggTrends
  game_lengths: OpggGameLength[]
  counters: OpggCounter[]
}

export interface OpggChampion {
  data: OpggChampionData
  meta: OpggMeta
}

export interface OpggRankedPositionStats {
  win_rate: number
  pick_rate: number
  role_rate: number
  ban_rate: number
  kda: number
  tier_data: {
    tier: number
    rank: number
    rank_prev: number | null
    rank_prev_patch: number | null
  }
}

export interface OpggRankedPosition {
  name: string
  stats: OpggRankedPositionStats
  roles: Array<{
    name: string
    stats: {
      win_rate: number
      role_rate: number
      play: number
      win: number
    }
  }>
  counters: Array<{
    champion_id: number
    play: number
    win: number
  }>
}

export interface OpggRankedDataItem {
  id: number
  is_rotation: boolean
  is_rip: boolean
  average_stats: OpggAverageStats | null
  positions: OpggRankedPosition[]
  roles: unknown[]
}

export interface OpggRankedChampionsSummary {
  data: OpggRankedDataItem[]
  meta: OpggMeta
}

export type OpggChampionsTier = OpggRankedChampionsSummary

export interface OpggRequestOptions {
  signal?: AbortSignal
  timeoutMs?: number
}

export interface OpggGetChampionsTierOptions extends OpggRequestOptions {
  tier: OpggTier
  version?: string
}

export interface OpggGetChampionOptions extends OpggRequestOptions {
  id: number
  tier: OpggTier
  position?: OpggPosition
  version?: string
}

export class OpggApiError extends Error {
  readonly url: string
  readonly status?: number
  readonly statusText?: string
  readonly body?: unknown

  constructor(message: string, options: { url: string; status?: number; statusText?: string; body?: unknown }) {
    super(message)
    this.name = 'OpggApiError'
    this.url = options.url
    this.status = options.status
    this.statusText = options.statusText
    this.body = options.body
  }
}

type QueryParams = Record<string, string | number | boolean | null | undefined>

export class OpggDataApi {
  static readonly BASE_URL = 'https://lol-api-champion.op.gg'
  static readonly DEFAULT_TIMEOUT_MS = 10000

  async getVersions(options: OpggRequestOptions = {}): Promise<OpggVersions> {
    const { signal, timeoutMs } = options
    return this.request(`/api/global/champions/ranked/versions`, { signal, timeoutMs })
  }

  async getChampionsTier(options: OpggGetChampionsTierOptions): Promise<OpggChampionsTier> {
    const { tier, version, signal, timeoutMs } = options
    return this.request(`/api/global/champions/ranked`, {
      params: { tier, version },
      signal,
      timeoutMs,
    })
  }

  async getChampion(options: OpggGetChampionOptions): Promise<OpggChampion> {
    const { id, tier, version, signal, timeoutMs } = options
    const position = options.position
    const path = `/api/global/champions/ranked/${id}/${position ?? 'none'}`

    return this.request(path, {
      params: { tier, version },
      signal,
      timeoutMs,
    })
  }

  private async request<T>(
    path: string,
    options: OpggRequestOptions & { params?: QueryParams } = {},
  ): Promise<T> {
    const url = new URL(path, OpggDataApi.BASE_URL)
    Object.entries(options.params ?? {}).forEach(([key, value]) => {
      if (value != null && value !== '') url.searchParams.set(key, String(value))
    })

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), options.timeoutMs ?? OpggDataApi.DEFAULT_TIMEOUT_MS)
    const relayAbort = () => controller.abort()
    options.signal?.addEventListener('abort', relayAbort, { once: true })

    try {
      const resp = await fetch(url.toString(), {
        method: 'GET',
        mode: 'cors',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      })
      const text = await resp.text()
      const body = parseJson(text)

      if (!resp.ok) {
        throw new OpggApiError(`OP.GG 请求失败： ${resp.status} ${resp.statusText}`, {
          url: url.toString(),
          status: resp.status,
          statusText: resp.statusText,
          body,
        })
      }

      return body as T
    } catch (err) {
      if (err instanceof OpggApiError) throw err
      const message = err instanceof Error ? err.message : String(err)
      throw new OpggApiError(`OP.GG 请求失败： ${message}`, { url: url.toString() })
    } finally {
      window.clearTimeout(timeout)
      options.signal?.removeEventListener('abort', relayAbort)
    }
  }
}

function parseJson(text: string): unknown {
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export function normalizeOpggVersion(gameVersion: string): string | undefined {
  const match = gameVersion.match(/^(\d+\.\d+)/)
  return match?.[1]
}

export const opggApi = new OpggDataApi()
