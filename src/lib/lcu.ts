/**
 * LCUManager - Sona 的 LCU 接口管理器
 *
 * 在 Pengu Loader 环境中，插件运行在 League Client 内置浏览器中，
 * 可以直接通过 fetch 请求 LCU API（无需 port/token/https）。
 * WebSocket 事件则通过 PenguContext.socket.observe 来监听。
 *
 * @see https://pengu.lol/guide/lcu-request
 * @see https://pengu.lol/runtime-api
 */

import type {
  SummonerInfo,
  Lobby,
  GameflowPhase,
  GameflowSession,
  ChampSelectSession,
  ChampSelectPlayerDetail,
  QueueId,
  LCUEventMessage,
  MatchHistoryResponse,
  MatchDetail,
  MatchGame,
  Participant,
  ParticipantIdentity,
  MatchTeam,
  SummonerSpellData,
  ChampionSummaryData,
  GameQueue,
  ChampSelectSummoner,
} from '@/types/lcu'
import { SGP_SERVERS, TENCENT_MATCH_HISTORY_INTEROP } from '@/types/sgp'
import type { SgpEntitlementsToken, SgpGameSummaryLol, SgpMatchHistoryLol, SgpParticipantLol, SgpPerks, SgpTeam } from '@/types/sgp'
import { deobfuscateChampSelectPuuid } from '@/lib/champ-select-puuid'


// Re-export types for convenience
export type { SummonerInfo, Lobby, GameflowPhase, GameflowSession, LCUEventMessage, ChampSelectSession, ChampSelectPlayerDetail, MatchHistoryResponse, MatchDetail, ChampSelectSummoner }
export type { SgpEntitlementsToken, SgpMatchHistoryLol } from '@/types/sgp'
export { SGP_SERVERS, TENCENT_MATCH_HISTORY_INTEROP, TENCENT_SERVER_NAMES, queueIdToTag } from '@/types/sgp'

export { LcuEventUri, QueueId } from '@/types/lcu'

/** SGP summoner-ledge 按名查询返回的关键字段（仅取解析所需，容错处理） */
interface SgpSummonerLite {
  puuid?: string
  gameName?: string
  tagLine?: string
  name?: string
}

// ==================== 底层请求方法 ====================

/**
 * 发起 LCU REST API 请求
 * @param endpoint API 端点 (e.g. '/lol-summoner/v1/current-summoner')
 * @param options fetch 配置项
 */
async function request<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`[LCU] 请求失败: ${options.method ?? 'GET'} ${url} → ${response.status} ${response.statusText}`)
  }

  // 204 No Content 等情况不需要解析 body
  const text = await response.text()
  return text ? (JSON.parse(text) as T) : (undefined as unknown as T)
}

function get<T = unknown>(endpoint: string): Promise<T> {
  return request<T>(endpoint, { method: 'GET' })
}

function post<T = unknown>(endpoint: string, body?: unknown): Promise<T> {
  return request<T>(endpoint, {
    method: 'POST',
    body: body != null ? JSON.stringify(body) : undefined,
  })
}

function put<T = unknown>(endpoint: string, body?: unknown): Promise<T> {
  return request<T>(endpoint, {
    method: 'PUT',
    body: body != null ? JSON.stringify(body) : undefined,
  })
}

export interface RunePagePayload {
  name: string
  primaryStyleId: number
  subStyleId: number
  selectedPerkIds: number[]
  current: boolean
}

export interface RunePage extends RunePagePayload {
  id: number
  isActive?: boolean
  isDeletable?: boolean
  isEditable?: boolean
  order?: number
}

export interface ItemSetEntry {
  id: string
  count: number
}

export interface ItemSetBlock {
  type: string
  items: ItemSetEntry[]
}

export interface ItemSet {
  uid: string
  title: string
  type: string
  mode: string
  map: string
  associatedChampions: number[]
  associatedMaps: number[]
  blocks: ItemSetBlock[]
  preferredItemSlots: unknown[]
  sortrank: number
  startedFrom: string
}

export interface ItemSetWrapper {
  accountId: number
  itemSets: ItemSet[]
  timestamp: number
}

function del<T = unknown>(endpoint: string): Promise<T> {
  return request<T>(endpoint, { method: 'DELETE' })
}

function patch<T = unknown>(endpoint: string, body?: unknown): Promise<T> {
  return request<T>(endpoint, {
    method: 'PATCH',
    body: body != null ? JSON.stringify(body) : undefined,
  })
}

/** 将国服平台标识转换为已配置的 SGP 大区。 */
function getTencentSgpServerKey(rawCode: string): string {
  const code = rawCode.toUpperCase()
  const key = code.startsWith('TENCENT_') ? code : `TENCENT_${code}`
  return SGP_SERVERS[key] ? key : ''
}

// ==================== LCUManager 类 ====================

type EventCallback = (message: LCUEventMessage) => void

/**
 * LCUManager - 集中管理 LCU 的 REST API 和 WebSocket 事件
 *
 * 使用方式：
 * ```ts
 * import { lcu } from '@/lib/lcu'
 *
 * // REST API
 * const summoner = await lcu.getSummonerInfo()
 *
 * // WebSocket 事件监听
 * lcu.observe('/lol-gameflow/v1/gameflow-phase', (event) => {
 *   console.log('Gameflow phase:', event.data)
 * })
 * ```
 */
class LCUManager {
  private eventListeners = new Map<string, Set<EventCallback>>()
  /** 当前 socket 上已经实际调用过 observe 的 URI 集合 */
  private observedUris = new Set<string>()
  private penguContext: PenguContext | null = null

  // -------------------- SGP Token 缓存 --------------------

  /**
   * Entitlements Token 缓存
   *
   * 通过 WS 事件 `/entitlements/v1/token` 自动保活：
   * LCU 会在 token 即将过期时主动推送新 token，无需自己算过期时间。
   * 初始值通过主动拉取填充，后续由 WS 事件驱动更新。
   */
  private _entitlementsToken: SgpEntitlementsToken | null = null

  /**
   * League Session Token 缓存
   *
   * 通过 WS 事件 `/lol-league-session/v1/league-session-token` 自动保活。
   */
  private _leagueSessionToken: string | null = null

  /** SGP Token 是否已就绪（两个 token 都已拿到） */
  get isSgpTokenReady(): boolean {
    return this._entitlementsToken !== null && this._leagueSessionToken !== null
  }

  /** 获取缓存的 Entitlements Token（不会发起网络请求） */
  get cachedEntitlementsToken(): SgpEntitlementsToken | null {
    return this._entitlementsToken
  }

  /** 获取缓存的 League Session Token（不会发起网络请求） */
  get cachedLeagueSessionToken(): string | null {
    return this._leagueSessionToken
  }


  // -------------------- 初始化 --------------------

  /**
   * 绑定 PenguContext，用于 WebSocket 事件监听
   * 应在 init(context) 生命周期中调用
   */
  bindContext(context: PenguContext) {
    this.penguContext = context

    // context / socket 变了，但已有业务回调仍然有效：
    // 这里只清空"底层 socket 已订阅 URI"状态，然后把现有回调重新挂到新 socket 上。
    const uris = Array.from(this.eventListeners.keys())
    this.observedUris.clear()

    console.log('[LCUManager] bindContext() → replay %d observed uri(s)', uris.length)
    uris.forEach((uri) => this.observeUriOnSocket(uri))

    // 绑定 context 后立即初始化 SGP Token 保活
    this._initSgpTokenKeepAlive()
  }

  /**
   * SGP Token 保活机制
   *
   * 参考 LeagueAkari 的 _maintainEntitlementsToken / _maintainLeagueSessionToken 实现。
   *
   * 策略：
   * 1. 启动时主动拉取一次 token 填充缓存
   * 2. 监听 LCU WebSocket 事件，token 变化时自动更新缓存
   *    - `/entitlements/v1/token` → Entitlements Token
   *    - `/lol-league-session/v1/league-session-token` → League Session Token
   * 3. LCU 会在 token 即将过期时主动推送新 token，无需自己算过期时间
   */
  private _initSgpTokenKeepAlive() {
    // 1. 主动拉取初始 token
    this._fetchInitialTokens()

    // 2. 监听 WS 事件保活
    this.observe('/entitlements/v1/token', (event) => {
      const token = event.data as SgpEntitlementsToken | null
      if (token) {
        this._entitlementsToken = token
        console.log('[LCUManager] Entitlements Token 已通过 WS 事件更新')
      } else {
        this._entitlementsToken = null
        console.log('[LCUManager] Entitlements Token 已清空（WS 事件）')
      }
    })

    this.observe('/lol-league-session/v1/league-session-token', (event) => {
      const token = event.data as string | null
      if (token) {
        this._leagueSessionToken = token
        console.log('[LCUManager] League Session Token 已通过 WS 事件更新')
      } else {
        this._leagueSessionToken = null
        console.log('[LCUManager] League Session Token 已清空（WS 事件）')
      }
    })
  }

  /** 主动拉取初始 token 填充缓存 */
  private async _fetchInitialTokens() {
    try {
      const [entToken, sessionToken] = await Promise.all([
        this.getEntitlementsToken().catch((e) => {
          console.warn('[LCUManager] 初始拉取 Entitlements Token 失败:', e)
          return null
        }),
        this.getLeagueSessionToken().catch((e) => {
          console.warn('[LCUManager] 初始拉取 League Session Token 失败:', e)
          return null
        }),
      ])
      if (entToken) {
        this._entitlementsToken = entToken
        console.log('[LCUManager] 初始 Entitlements Token 已获取')
      }
      if (sessionToken) {
        this._leagueSessionToken = sessionToken
        console.log('[LCUManager] 初始 League Session Token 已获取')
      }
    } catch (error) {
      console.warn('[LCUManager] 初始拉取 SGP Token 异常:', error)
    }
  }


  // -------------------- 底层请求 (公开) --------------------

  /** 通用 REST 请求 */
  request = request
  get = get
  post = post
  put = put
  patch = patch
  delete = del

  // ==================== 召唤师 ====================

  /** 获取当前登录的召唤师信息 */
  getSummonerInfo(): Promise<SummonerInfo> {
    return get<SummonerInfo>('/lol-summoner/v1/current-summoner')
  }

  /** 通过 summoner ID 获取召唤师信息 */
  getSummonerById(summonerId: number): Promise<SummonerInfo> {
    return get<SummonerInfo>(`/lol-summoner/v1/summoners/${summonerId}`)
  }

  /** 通过 puuid 获取召唤师信息 */
  getSummonerByPuuid(puuid: string): Promise<SummonerInfo> {
    return get<SummonerInfo>(`/lol-summoner/v2/summoners/puuid/${puuid}`)
  }

  /** 通过 gameName + tagLine (Riot ID) 获取召唤师信息 */
  getSummonerByRiotId(gameName: string, tagLine: string): Promise<SummonerInfo> {
    return get<SummonerInfo>(`/lol-summoner/v1/alias/lookup?gameName=${encodeURIComponent(gameName)}&tagLine=${encodeURIComponent(tagLine)}`)
  }

  /**
   * 按 Riot ID 解析召唤师 puuid（支持国服跨大区）
   *
   * 解析顺序：
   * 1. 先用 LCU `alias/lookup` 查本区，命中即返回
   * 2. 本区查不到时，借助"所有腾讯大区共享同一 JWT"特性，并发查询
   *    所有互通大区的 SGP `summoner-ledge` 按名接口，再用返回的 tagLine 精确匹配
   *
   * 拿到 puuid 后即可走 `getSgpMatchHistory`（国服互通，可跨区出战绩）。
   *
   * @returns 命中的 puuid；查不到返回空字符串
   */
  async resolveSummonerPuuidByRiotId(gameName: string, tagLine: string): Promise<string> {
    const name = gameName.trim()
    const tag = tagLine.trim()
    if (!name || !tag) return ''

    // 1. 本区精确查询
    const local = await this.getSummonerByRiotId(name, tag).catch((err) => {
      console.warn('[CrossRegion] 本区 alias/lookup 失败:', err)
      return null
    })
    console.log('[CrossRegion] 本区 alias/lookup 结果:', local?.puuid ? `puuid=${local.puuid}` : '无')
    if (local?.puuid) return local.puuid

    // 2. 仅国服支持跨大区搜集
    const sgpServerId = (await this.getSgpServerId().catch(() => '')).toUpperCase()
    console.log('[CrossRegion] 当前 SGP 服务器:', sgpServerId || '(未解析到)')
    if (!sgpServerId.startsWith('TENCENT_')) {
      console.log('[CrossRegion] 未识别到国服大区，跳过跨大区搜集')
      return ''
    }

    const token = this._entitlementsToken ?? await this.getEntitlementsToken().catch((err) => {
      console.warn('[CrossRegion] 获取 Entitlements Token 失败:', err)
      return null
    })
    if (!token?.accessToken) {
      console.warn('[CrossRegion] 无可用 accessToken，无法跨大区查询')
      return ''
    }
    this._entitlementsToken = token

    const wantTag = tag.toLowerCase()
    const wantName = name.toLowerCase()
    console.log('[CrossRegion] 开始跨大区搜集 → 目标 %s#%s，大区数 %d', name, tag, TENCENT_MATCH_HISTORY_INTEROP.length)

    const results = await Promise.allSettled(
      TENCENT_MATCH_HISTORY_INTEROP.map((regionKey) =>
        this._getSgpSummonerByName(regionKey, name, token.accessToken),
      ),
    )

    let matched = ''
    results.forEach((r, idx) => {
      const regionKey = TENCENT_MATCH_HISTORY_INTEROP[idx]
      if (r.status !== 'fulfilled') {
        console.warn('[CrossRegion] [%s] 查询异常:', regionKey, r.reason)
        return
      }
      if (!r.value) {
        console.log('[CrossRegion] [%s] 无返回 / 非 200', regionKey)
        return
      }
      const sTag = (r.value.tagLine ?? '').trim().toLowerCase()
      const sName = (r.value.gameName ?? r.value.name ?? '').trim().toLowerCase()
      console.log('[CrossRegion] [%s] 命中召唤师: name=%s tag=%s puuid=%s', regionKey, sName || '(空)', sTag || '(空)', r.value.puuid || '(空)')
      if (!matched && r.value.puuid && ((sTag && sTag === wantTag) || (!sTag && sName === wantName))) {
        matched = r.value.puuid
        console.log('[CrossRegion] ✓ 匹配成功 → 大区 %s，puuid=%s', regionKey, matched)
      }
    })

    if (!matched) console.log('[CrossRegion] ✗ 全大区均未匹配到 %s#%s', name, tag)
    return matched
  }

  /** 调用指定腾讯大区的 SGP `summoner-ledge` 按召唤师名查询 */
  private async _getSgpSummonerByName(
    regionKey: string,
    gameName: string,
    accessToken: string,
  ): Promise<SgpSummonerLite | null> {
    const server = SGP_SERVERS[regionKey]
    const base = server?.common ?? server?.matchHistory
    if (!base) return null

    const regionCode = regionKey.replace(/^TENCENT_/, '')
    const url = `${base}/summoner-ledge/v1/regions/${regionCode}/summoners/name/${encodeURIComponent(gameName)}`

    const resp = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'LeagueOfLegendsClient/14.13.596.7996 (rcp-be-lol-summoner)',
      },
    })

    const text = await resp.text().catch(() => '')
    console.log('[CrossRegion] [%s] %s → %d %s | body: %s', regionKey, url, resp.status, resp.statusText, text.slice(0, 800) || '(空)')

    if (!resp.ok) return null
    if (!text) return null

    try {
      return JSON.parse(text) as SgpSummonerLite
    } catch (err) {
      console.warn('[CrossRegion] [%s] JSON 解析失败:', regionKey, err)
      return null
    }
  }

  /** 获取指定召唤师的客户端装备集 wrapper */
  getItemSets(summonerId: number): Promise<ItemSetWrapper> {
    return get<ItemSetWrapper>(`/lol-item-sets/v1/item-sets/${summonerId}/sets`)
  }

  /** 覆盖写入指定召唤师的客户端装备集 wrapper */
  putItemSets(summonerId: number, wrapper: ItemSetWrapper): Promise<ItemSetWrapper> {
    return put<ItemSetWrapper>(`/lol-item-sets/v1/item-sets/${summonerId}/sets`, wrapper)
  }


  /** 获取当前玩家的排位数据 */
  getCurrentRankedStats(): Promise<unknown> {
    return get('/lol-ranked/v1/current-ranked-stats')
  }

  /** 通过 puuid 获取排位数据 */
  getRankedStats(puuid: string): Promise<unknown> {
    return get(`/lol-ranked/v1/ranked-stats/${puuid}`)
  }

  // ==================== 房间/大厅 ====================

  /** 获取当前房间信息 */
  getLobby(): Promise<Lobby> {
    return get<Lobby>('/lol-lobby/v2/lobby')
  }

  // ==================== 游戏流程 ====================

  /** 获取当前游戏流程阶段 */
  getGameflowPhase(): Promise<GameflowPhase> {
    return get<GameflowPhase>('/lol-gameflow/v1/gameflow-phase')
  }

  /** 获取游戏流程会话详情 */
  getGameflowSession(): Promise<GameflowSession> {
    return get<GameflowSession>('/lol-gameflow/v1/session')
  }

  // ==================== 英雄选择 ====================

  /** 获取英雄选择会话 */
  getChampSelectSession(): Promise<ChampSelectSession> {
    return get<ChampSelectSession>('/lol-champ-select/v1/session')
  }

  /** 获取英雄选择阶段指定格子的召唤师状态 */
  getChampSelectSummoner(cellId: number): Promise<ChampSelectSummoner> {
    return get<ChampSelectSummoner>(`/lol-champ-select/v1/summoners/${cellId}`)
  }

  /**
   * 应用推荐的召唤师技能
   * @param selection 选择参数
   */
  updateMySelection(selection: { spell1Id?: number; spell2Id?: number }): Promise<unknown> {
    return patch('/lol-champ-select/v1/session/my-selection', selection)
  }

  /**
   * 获取本局选人阶段所有玩家的详细信息
   * 包含召唤师信息、排位数据、近期战绩
   * @returns 我方和敌方玩家信息数组
   */
  async getChampSelectPlayers(): Promise<{
    myTeam: ChampSelectPlayerDetail[]
    theirTeam: ChampSelectPlayerDetail[]
  }> {
    const session = await this.getChampSelectSession()

    const fetchDetail = async (player: ChampSelectSession['myTeam'][number]): Promise<ChampSelectPlayerDetail> => {
      const resolvedPuuid = player.puuid
        || (player.nameVisibilityType === 'HIDDEN'
          ? deobfuscateChampSelectPuuid(player.obfuscatedPuuid)
          : '')
      try {
        const summoner = resolvedPuuid
          ? await this.getSummonerByPuuid(resolvedPuuid)
          : await this.getSummonerById(player.summonerId)
        const [ranked, matchHistory] = await Promise.all([
          this.getRankedStats(summoner.puuid).catch(() => null),
          this.getMatchHistory(summoner.puuid, 0, 19).catch(() => null),
        ])
        return {
          summonerId: player.summonerId || summoner.summonerId,
          championId: player.championId,
          assignedPosition: player.assignedPosition,
          gameName: summoner.gameName,
          tagLine: summoner.tagLine,
          summonerLevel: summoner.summonerLevel,
          puuid: summoner.puuid,
          profileIconId: summoner.profileIconId,
          ranked,
          recentMatches: matchHistory,
        }
      } catch {
        return {
          summonerId: player.summonerId,
          championId: player.championId,
          assignedPosition: player.assignedPosition,
          gameName: player.gameName || 'Unknown',
          tagLine: player.tagLine,
          summonerLevel: 0,
          puuid: resolvedPuuid,
          profileIconId: 0,
          ranked: null,
          recentMatches: null,
        }
      }
    }

    const [myTeam, theirTeam] = await Promise.all([
      Promise.all(session.myTeam.map(fetchDetail)),
      Promise.all(session.theirTeam.map(fetchDetail)),
    ])

    return { myTeam, theirTeam }
  }

  // ==================== 队列信息 ====================

  /** 获取所有可用队列（含中文名、游戏模式、地图等） */
  getQueues(): Promise<GameQueue[]> {
    return get<GameQueue[]>('/lol-game-queues/v1/queues')
  }

  /** 获取当前游戏模式信息 */
  getCurrentGamemode(): Promise<unknown> {
    return get('/lol-lobby/v1/parties/gamemode')
  }

  /** 获取所有游戏模式 */
  getGameModes(): Promise<unknown[]> {
    return get<unknown[]>('/lol-game-queues/v1/game-type-config')
  }

  /** 获取所有地图信息 */
  getMaps(): Promise<unknown[]> {
    return get<unknown[]>('/lol-maps/v1/maps')
  }

  // ==================== 战绩 ====================

  /**
   * 获取战绩列表
   * @param puuid 不传则查当前玩家，传入则查指定玩家
   * @param begIndex 起始索引，默认 0
   * @param endIndex 结束索引，默认 19（共 20 条）
   */
  getMatchHistory(puuid?: string, begIndex = 0, endIndex = 19): Promise<MatchHistoryResponse> {
    const base = puuid
      ? `/lol-match-history/v1/products/lol/${puuid}/matches`
      : '/lol-match-history/v1/products/lol/current-summoner/matches'
    return get(`${base}?begIndex=${begIndex}&endIndex=${endIndex}`)
  }

  /**
   * 获取单局对局详情
   * @param gameId 对局 ID
   */
  getMatchDetail(gameId: number): Promise<MatchDetail> {
    return get<MatchDetail>(`/lol-match-history/v1/games/${gameId}`)
  }

  /**
   * 获取单局时间线数据
   * @param gameId 对局 ID
   */
  getMatchTimeline(gameId: number): Promise<unknown> {
    return get(`/lol-match-history/v1/game-timelines/${gameId}`)
  }

  /** 获取最近一起玩过的召唤师 */
  getRecentlyPlayedSummoners(): Promise<unknown> {
    return get('/lol-match-history/v1/recently-played-summoners')
  }

  // ==================== SGP Token ====================

  /**
   * 获取 Entitlements Token（SGP 战绩查询所需）
   *
   * 返回值说明：
   * - `accessToken`: JWT，用于 `Authorization: Bearer {accessToken}` 请求 SGP 战绩/对局详情接口
   * - `token`: Entitlements JWT（格式不同，部分 SGP 接口可能需要）
   * - `issuer`: 签发者 URL，如 `http://hn1-k8s-bcs-internal.lol.qq.com:28088`
   *   可从中解析当前区服（hn1 = 艾欧尼亚、hn10 = 黑色玫瑰 等）
   * - `subject`: 玩家 PUUID
   * - `entitlements`: 权限列表（通常为空数组）
   *
   * Akari 通过 WS 事件 `/entitlements/v1/token` 自动刷新，我们这里按需拉取。
   */
  getEntitlementsToken(): Promise<SgpEntitlementsToken> {
    return get('/entitlements/v1/token')
  }

  /**
   * 获取 League Session Token（SGP 通用查询所需）
   *
   * 返回纯 JWT 字符串，用于 `Authorization: Bearer {token}` 请求 SGP 通用接口（召唤师/排位等）。
   */
  getLeagueSessionToken(): Promise<string> {
    return get('/lol-league-session/v1/league-session-token')
  }

  /** 优先读取客户端 platformId，失败时从国服 Token issuer 解析大区。 */
  async getSgpServerId(): Promise<string> {
    // Akari 以客户端启动参数为准；Pengu 内优先使用 ChatMe.platformId 近似它。
    const fromPlatformId = await this._parseSgpServerIdFromPlatformId()
    if (fromPlatformId) return fromPlatformId

    const fromIssuer = this._parseSgpServerIdFromIssuer()
    if (fromIssuer) return fromIssuer

    return ''
  }

  /** 从 issuer URL 解析 SGP 服务器 ID */
  private _parseSgpServerIdFromIssuer(): string {
    const tokenRes = this._entitlementsToken
    if (!tokenRes) return ''

    const issuer = tokenRes.issuer ?? ''

    // 国服: 匹配 lol.qq.com 域名下的 issuer
    // 已知格式：
    //   http://hn1-k8s-bcs-internal.lol.qq.com:28088  (含 k8s)
    //   http://nj100-bcs-internal.lol.qq.com:28088     (不含 k8s)
    // 提取第一个子域名段（即服务器代码），忽略中间的 -k8s 等段
    const tencentMatch = issuer.match(/https?:\/\/([a-z0-9]+)(?:-[a-z0-9]+)*\.lol\.qq\.com/)
    if (tencentMatch) {
      const serverCode = tencentMatch[1].toUpperCase() // e.g. "HN1", "NJ100"
      return getTencentSgpServerKey(`TENCENT_${serverCode}`)
    }

    return ''
  }

  /** 从 /lol-chat/v1/me 的 platformId 解析国服 SGP 大区 */
  private async _parseSgpServerIdFromPlatformId(): Promise<string> {
    try {
      // 只读取区服标识，供战绩接口路由使用。
      const me = await get<{ platformId?: string }>('/lol-chat/v1/me')
      const platformId = me.platformId?.toUpperCase() ?? ''
      if (!platformId) return ''

      return getTencentSgpServerKey(platformId)
    } catch {
      return ''
    }
  }

  /**
   * 通过 SGP 查询战绩列表
   *
   * 相比 LCU 接口的优势：
   * - 支持 `tag` 参数按队列模式过滤（如 `q_420` 只查单双排）
   * - 无浏览器缓存问题
   * - 国服跨区查询
   * - 突破 LCU 100 场上限
   *
   * @param puuid 玩家 PUUID
   * @param options 查询参数
   * @param options.startIndex 起始索引（默认 0，注意：SGP 用 startIndex 而非 LCU 的 begIndex）
   * @param options.count 获取数量（默认 100，注意：SGP 用 count 而非 LCU 的 endIndex）
   * @param options.tag 按队列模式过滤，如 `q_420`（单双排），不传则获取原始战绩，由调用方过滤峡谷对局。使用 `queueIdToTag()` 生成。
   */
  async getSgpMatchHistory(puuid: string, options?: {
    startIndex?: number
    count?: number
    tag?: string
  }): Promise<SgpMatchHistoryLol> {
    const debugContext: {
      platformId: string
      sgpServerId: string
      matchHistoryBaseUrl: string
      requestUrl: string
      issuer: string
    } = {
      platformId: '',
      sgpServerId: '',
      matchHistoryBaseUrl: '',
      requestUrl: '',
      issuer: this._entitlementsToken?.issuer ?? '',
    }

    try {
      const chatMe = await get<{ platformId?: string }>('/lol-chat/v1/me').catch(() => null)
      debugContext.platformId = chatMe?.platformId ?? ''

      const token = this._entitlementsToken ?? await this.getEntitlementsToken()
      if (!this._entitlementsToken) {
        this._entitlementsToken = token
      }
      debugContext.issuer = token.issuer ?? debugContext.issuer

      const sgpServerId = await this.getSgpServerId()
      debugContext.sgpServerId = sgpServerId
      const server = SGP_SERVERS[sgpServerId.toUpperCase()]
      debugContext.matchHistoryBaseUrl = server?.matchHistory ?? ''
      if (!server?.matchHistory) {
        throw new Error(`[SGP] 找不到服务器配置: ${sgpServerId}`)
      }

      const params = new URLSearchParams()
      params.set('startIndex', String(options?.startIndex ?? 0))
      params.set('count', String(options?.count ?? 100))
      if (options?.tag) {
        params.set('tag', options.tag)
      }

      const url = `${server.matchHistory}/match-history-query/v1/products/lol/player/${puuid}/SUMMARY?${params}`
      debugContext.requestUrl = url

      const resp = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token.accessToken}`,
          'User-Agent': 'LeagueOfLegendsClient/14.13.596.7996 (rcp-be-lol-match-history)',
        },
      })

      if (!resp.ok) {
        const body = await resp.text().catch(() => '')
        throw new Error(`[SGP] 请求失败: ${resp.status} ${resp.statusText} ${body.slice(0, 1000)}`)
      }

      return resp.json()
    } catch (err) {
      console.error('[SGP] 战绩查询失败，回退到客户端原生战绩接口', {
        platformId: debugContext.platformId || 'unknown',
        sgpServerId: debugContext.sgpServerId || 'unknown',
        matchHistoryBaseUrl: debugContext.matchHistoryBaseUrl || 'unknown',
        issuer: debugContext.issuer || 'unknown',
        puuid,
        startIndex: options?.startIndex ?? 0,
        count: options?.count ?? 100,
        tag: options?.tag ?? '',
        requestUrl: debugContext.requestUrl || 'not-built',
        errorName: err instanceof Error ? err.name : typeof err,
        errorMessage: err instanceof Error ? err.message : String(err),
        error: err,
      })
      return this.getNativeMatchHistoryAsSgp(puuid, options)
    }
  }

  private async getNativeMatchHistoryAsSgp(puuid: string, options?: {
    startIndex?: number
    count?: number
    tag?: string
  }): Promise<SgpMatchHistoryLol> {
    const startIndex = Math.max(0, options?.startIndex ?? 0)
    const count = Math.max(1, options?.count ?? 100)
    const queueId = this.parseQueueIdFromSgpTag(options?.tag)

    // LCU 原生接口不支持 tag。带队列过滤时从最近 100 场中本地过滤后再模拟 SGP 分页。
    const begIndex = queueId ? 0 : startIndex
    const endIndex = queueId
      ? 99
      : startIndex + count - 1
    const native = await this.getMatchHistory(puuid, begIndex, endIndex)
    const nativeGames = native.games?.games ?? []
    const filteredGames = queueId
      ? nativeGames.filter((game) => game.queueId === queueId).slice(startIndex, startIndex + count)
      : nativeGames

    return {
      games: filteredGames.map((game) => this.mapNativeMatchGameToSgpGame(game)),
    }
  }

  private parseQueueIdFromSgpTag(tag: string | undefined): number | null {
    const match = tag?.match(/^q_(\d+)$/)
    if (!match) return null

    const queueId = Number.parseInt(match[1], 10)
    return Number.isFinite(queueId) && queueId > 0 ? queueId : null
  }

  private mapNativeMatchGameToSgpGame(game: MatchGame): SgpGameSummaryLol {
    const identitiesByParticipantId = new Map<number, ParticipantIdentity>()
    game.participantIdentities.forEach((identity) => {
      identitiesByParticipantId.set(identity.participantId, identity)
    })

    const participants = game.participants.map((participant) => {
      return this.mapNativeParticipantToSgpParticipant(participant, identitiesByParticipantId.get(participant.participantId), game.gameDuration)
    })

    return {
      metadata: {
        product: 'lol',
        tags: [`q_${game.queueId}`],
        participants: participants.map((participant) => participant.puuid).filter(Boolean),
        timestamp: new Date(game.gameCreation).toISOString(),
        data_version: '',
        info_type: 'SUMMARY',
        match_id: `${game.platformId}_${game.gameId}`,
        private: false,
      },
      json: {
        endOfGameResult: game.endOfGameResult,
        gameCreation: game.gameCreation,
        gameDuration: game.gameDuration,
        gameEndTimestamp: game.gameCreation + game.gameDuration * 1000,
        gameId: game.gameId,
        gameMode: game.gameMode,
        gameName: '',
        gameStartTimestamp: game.gameCreation,
        gameType: game.gameType,
        gameVersion: game.gameVersion,
        mapId: game.mapId,
        participants,
        platformId: game.platformId,
        queueId: game.queueId,
        seasonId: game.seasonId,
        teams: game.teams.map((team) => this.mapNativeTeamToSgpTeam(team)),
        tournamentCode: '',
      },
    }
  }

  private mapNativeTeamToSgpTeam(team: MatchTeam): SgpTeam {
    return {
      bans: [],
      objectives: {
        baron: { first: team.firstBaron, kills: team.baronKills },
        champion: { first: team.firstBlood, kills: 0 },
        dragon: { first: team.firstDargon, kills: team.dragonKills },
        horde: { first: false, kills: team.hordeKills },
        inhibitor: { first: team.firstInhibitor, kills: team.inhibitorKills },
        riftHerald: { first: false, kills: team.riftHeraldKills },
        tower: { first: team.firstTower, kills: team.towerKills },
      },
      teamId: team.teamId,
      win: team.win === 'Win',
    }
  }

  private mapNativeParticipantToSgpParticipant(
    participant: Participant,
    identity: ParticipantIdentity | undefined,
    gameDuration: number,
  ): SgpParticipantLol {
    const stats = participant.stats
    const player = identity?.player
    const timePlayed = gameDuration || 0
    const perks: SgpPerks = {
      statPerks: {
        defense: 0,
        flex: 0,
        offense: 0,
      },
      styles: [
        {
          description: 'primaryStyle',
          style: stats.perkPrimaryStyle || 0,
          selections: [
            { perk: stats.perk0 || 0, var1: stats.perk0Var1 || 0, var2: stats.perk0Var2 || 0, var3: stats.perk0Var3 || 0 },
            { perk: stats.perk1 || 0, var1: stats.perk1Var1 || 0, var2: stats.perk1Var2 || 0, var3: stats.perk1Var3 || 0 },
            { perk: stats.perk2 || 0, var1: stats.perk2Var1 || 0, var2: stats.perk2Var2 || 0, var3: stats.perk2Var3 || 0 },
            { perk: stats.perk3 || 0, var1: stats.perk3Var1 || 0, var2: stats.perk3Var2 || 0, var3: stats.perk3Var3 || 0 },
          ],
        },
        {
          description: 'subStyle',
          style: stats.perkSubStyle || 0,
          selections: [
            { perk: stats.perk4 || 0, var1: stats.perk4Var1 || 0, var2: stats.perk4Var2 || 0, var3: stats.perk4Var3 || 0 },
            { perk: stats.perk5 || 0, var1: stats.perk5Var1 || 0, var2: stats.perk5Var2 || 0, var3: stats.perk5Var3 || 0 },
          ],
        },
      ],
    }

    const challenges = {
      damagePerMinute: timePlayed > 0 ? (stats.totalDamageDealtToChampions / timePlayed) * 60 : 0,
      goldPerMinute: timePlayed > 0 ? (stats.goldEarned / timePlayed) * 60 : 0,
      kda: stats.deaths > 0 ? (stats.kills + stats.assists) / stats.deaths : stats.kills + stats.assists,
      visionScorePerMinute: timePlayed > 0 ? (stats.visionScore / timePlayed) * 60 : 0,
    } as SgpParticipantLol['challenges']

    return {
      PlayerBehavior: { PlayerBehavior_IsHeroInCombat: 0 },
      PlayerScore0: stats.playerScore0 || 0,
      PlayerScore1: stats.playerScore1 || 0,
      PlayerScore2: stats.playerScore2 || 0,
      PlayerScore3: stats.playerScore3 || 0,
      PlayerScore4: stats.playerScore4 || 0,
      PlayerScore5: stats.playerScore5 || 0,
      PlayerScore6: stats.playerScore6 || 0,
      PlayerScore7: stats.playerScore7 || 0,
      PlayerScore8: stats.playerScore8 || 0,
      PlayerScore9: stats.playerScore9 || 0,
      PlayerScore10: 0,
      PlayerScore11: 0,
      assists: stats.assists,
      challenges,
      champExperience: 0,
      champLevel: stats.champLevel,
      championId: participant.championId,
      championName: '',
      championTransform: 0,
      damageDealtToBuildings: stats.damageDealtToTurrets,
      damageDealtToEpicMonsters: 0,
      damageDealtToObjectives: stats.damageDealtToObjectives,
      damageDealtToTurrets: stats.damageDealtToTurrets,
      damageSelfMitigated: stats.damageSelfMitigated,
      deaths: stats.deaths,
      detectorWardsPlaced: stats.visionWardsBoughtInGame,
      doubleKills: stats.doubleKills,
      dragonKills: 0,
      eligibleForProgression: true,
      firstBloodAssist: stats.firstBloodAssist,
      firstBloodKill: stats.firstBloodKill,
      firstTowerAssist: stats.firstTowerAssist,
      firstTowerKill: stats.firstTowerKill,
      gameEndedInEarlySurrender: stats.gameEndedInEarlySurrender,
      gameEndedInSurrender: stats.gameEndedInSurrender,
      goldEarned: stats.goldEarned,
      goldSpent: stats.goldSpent,
      individualPosition: participant.timeline?.lane || '',
      inhibitorKills: stats.inhibitorKills,
      item0: stats.item0,
      item1: stats.item1,
      item2: stats.item2,
      item3: stats.item3,
      item4: stats.item4,
      item5: stats.item5,
      item6: stats.item6,
      killingSprees: stats.killingSprees,
      kills: stats.kills,
      lane: participant.timeline?.lane || '',
      largestCriticalStrike: stats.largestCriticalStrike,
      largestKillingSpree: stats.largestKillingSpree,
      largestMultiKill: stats.largestMultiKill,
      longestTimeSpentLiving: stats.longestTimeSpentLiving,
      magicDamageDealt: stats.magicDamageDealt,
      magicDamageDealtToChampions: stats.magicDamageDealtToChampions,
      magicDamageTaken: stats.magicalDamageTaken,
      missions: {},
      neutralMinionsKilled: stats.neutralMinionsKilled,
      participantId: participant.participantId,
      pentaKills: stats.pentaKills,
      perks,
      physicalDamageDealt: stats.physicalDamageDealt,
      physicalDamageDealtToChampions: stats.physicalDamageDealtToChampions,
      physicalDamageTaken: stats.physicalDamageTaken,
      profileIcon: player?.profileIcon ?? 0,
      puuid: player?.puuid ?? '',
      quadraKills: stats.quadraKills,
      riotIdGameName: player?.gameName ?? player?.summonerName ?? '',
      riotIdTagline: player?.tagLine ?? '',
      role: participant.timeline?.role || '',
      roleBoundItem: stats.roleBoundItem,
      sightWardsBoughtInGame: stats.sightWardsBoughtInGame,
      spell1Id: participant.spell1Id,
      spell2Id: participant.spell2Id,
      summonerId: player?.summonerId ?? 0,
      summonerLevel: 0,
      summonerName: player?.summonerName ?? player?.gameName ?? '',
      teamEarlySurrendered: stats.teamEarlySurrendered,
      teamId: participant.teamId,
      teamPosition: participant.timeline?.lane || '',
      timeCCingOthers: stats.timeCCingOthers,
      timePlayed,
      totalDamageDealt: stats.totalDamageDealt,
      totalDamageDealtToChampions: stats.totalDamageDealtToChampions,
      totalDamageShieldedOnTeammates: 0,
      totalDamageTaken: stats.totalDamageTaken,
      totalHeal: stats.totalHeal,
      totalHealsOnTeammates: 0,
      totalMinionsKilled: stats.totalMinionsKilled,
      totalTimeCCDealt: stats.totalTimeCrowdControlDealt,
      totalTimeSpentDead: 0,
      totalUnitsHealed: stats.totalUnitsHealed,
      tripleKills: stats.tripleKills,
      trueDamageDealt: stats.trueDamageDealt,
      trueDamageDealtToChampions: stats.trueDamageDealtToChampions,
      trueDamageTaken: stats.trueDamageTaken,
      turretKills: stats.turretKills,
      turretTakedowns: stats.turretKills,
      turretsLost: 0,
      unrealKills: stats.unrealKills,
      visionScore: stats.visionScore,
      visionWardsBoughtInGame: stats.visionWardsBoughtInGame,
      wardsKilled: stats.wardsKilled,
      wardsPlaced: stats.wardsPlaced,
      win: stats.win,
      allInPings: 0,
      assistMePings: 0,
      baronKills: 0,
      basicPings: 0,
      commandPings: 0,
      consumablesPurchased: 0,
      dangerPings: 0,
      enemyMissingPings: 0,
      enemyVisionPings: 0,
      getBackPings: 0,
      holdPings: 0,
      inhibitorTakedowns: stats.inhibitorKills,
      inhibitorsLost: 0,
      itemsPurchased: 0,
      needVisionPings: 0,
      nexusKills: 0,
      nexusLost: 0,
      nexusTakedowns: 0,
      objectivesStolen: 0,
      objectivesStolenAssists: 0,
      onMyWayPings: 0,
      pushPings: 0,
      retreatPings: 0,
      spell1Casts: 0,
      spell2Casts: 0,
      spell3Casts: 0,
      spell4Casts: 0,
      summoner1Casts: 0,
      summoner2Casts: 0,
      totalAllyJungleMinionsKilled: stats.neutralMinionsKilledTeamJungle,
      totalEnemyJungleMinionsKilled: stats.neutralMinionsKilledEnemyJungle,
      visionClearedPings: 0,
    }
  }

  // ==================== 游戏资源 ====================

  /** 获取当前客户端的游戏版本号（如 "14.7.580.1234"） */
  getGameVersion(): Promise<string> {
    return get<string>('/lol-patch/v1/game-version')
  }

  /** 获取所有物品数据（含 iconPath / description） */
  getItems(): Promise<Array<{ id: number; iconPath: string; name: string; description?: string; shortDescription?: string; longDescription?: string; price?: number; priceTotal?: number }>> {
    return get('/lol-game-data/assets/v1/items.json')
  }

  /** 获取所有召唤师技能数据（含 iconPath） */
  getSummonerSpells(): Promise<SummonerSpellData[]> {
    return get('/lol-game-data/assets/v1/summoner-spells.json')
  }

  /** 获取所有英雄摘要数据（含 squarePortraitPath） */
  getChampionSummary(): Promise<ChampionSummaryData[]> {
    return get('/lol-game-data/assets/v1/champion-summary.json')
  }

  /** 获取所有符文数据（含 iconPath / description，对应单个符文 ID） */
  getPerks(): Promise<Array<{ id: number; iconPath: string; name: string; shortDesc?: string; longDesc?: string; description?: string }>> {
    return get('/lol-game-data/assets/v1/perks.json')
  }

  /** 获取所有符文系样式（对应 perkPrimaryStyle / perkSubStyle） */
  getPerkStyles(): Promise<{ styles: Array<{ id: number; iconPath: string; name: string }> }> {
    return get('/lol-game-data/assets/v1/perkstyles.json')
  }

  /** 获取玩家符文页 */
  getRunePages(): Promise<RunePage[]> {
    return get<RunePage[]>('/lol-perks/v1/pages')
  }

  /** 创建符文页 */
  createRunePage(page: RunePagePayload): Promise<RunePage> {
    return post<RunePage>('/lol-perks/v1/pages', page)
  }

  /** 更新指定符文页 */
  updateRunePage(id: number, page: RunePagePayload): Promise<RunePage> {
    return put<RunePage>(`/lol-perks/v1/pages/${id}`, page)
  }

  /** 删除指定符文页 */
  deleteRunePage(id: number): Promise<void> {
    return del<void>(`/lol-perks/v1/pages/${id}`)
  }

  /** 创建或更新 Sona 管理的符文页，并设为当前使用页 */
  async applyRunePage(page: Omit<RunePagePayload, 'current'>): Promise<RunePage> {
    const payload: RunePagePayload = {
      ...page,
      current: true,
    }
    const pages = await this.getRunePages()
    const isEditable = (p: RunePage) => p.isEditable !== false
    const isSonaManaged = (p: RunePage) => /\s-\s*Sona$/i.test(p.name)
    const cleanupDuplicateSonaPages = async (keepId: number) => {
      await Promise.allSettled(
        pages
          .filter((p) => p.id !== keepId && isSonaManaged(p) && p.isDeletable !== false)
          .map((p) => this.deleteRunePage(p.id)),
      )
    }

    const existing = pages.find((p) => p.name === page.name && p.isEditable !== false)
    if (existing) {
      const updated = await this.updateRunePage(existing.id, payload)
      await cleanupDuplicateSonaPages(existing.id)
      return updated
    }

    const managed = pages.find((p) => isSonaManaged(p) && isEditable(p))
    if (managed) {
      const updated = await this.updateRunePage(managed.id, payload)
      await cleanupDuplicateSonaPages(managed.id)
      return updated
    }

    try {
      return await this.createRunePage(payload)
    } catch (err) {
      const fallback = pages.find((p) => p.current && p.isEditable !== false) ?? pages.find((p) => p.isEditable !== false)
      if (fallback) {
        return this.updateRunePage(fallback.id, payload)
      }
      throw err
    }
  }


  // ==================== 通知 ====================


  /**
   * 发送客户端原生通知（右下角弹窗）
   * @param title 通知标题
   * @param details 通知内容
   */
  sendNotification(title: string, details: string): Promise<unknown> {
    return post('/player-notifications/v1/notifications', {
      detailKey: 'pre_translated_details',
      titleKey: 'pre_translated_title',
      backgroundUrl: '',
      data: { title, details },
      iconUrl: '/lol-game-data/assets/v1/profile-icons/3867.jpg',// https://heimerdinger.lol/index.php/icon/sona-champie-icon-5s8jq
      source: 'sona',
      state: 'toast',
      type: 'string',
    })
  }

  // ==================== WebSocket 事件 ====================

  private observeUriOnSocket(uri: string) {
    if (!this.penguContext) {
      console.warn('[LCUManager] PenguContext 未绑定，无法监听事件。请先调用 lcu.bindContext(context)')
      return
    }

    if (this.observedUris.has(uri)) {
      console.log('[LCUManager] URI 已订阅到底层 socket，跳过重复 observe: %s', uri)
      return
    }

    this.observedUris.add(uri)
    console.log('[LCUManager] 向当前 socket 订阅 URI: %s', uri)
    this.penguContext.socket.observe(uri, (data) => {
      console.log('[LCUManager] WS 收到事件 → uri=%s, data=%o', uri, data)
      const message = data as LCUEventMessage
      const cbs = this.eventListeners.get(uri)
      cbs?.forEach((cb) => cb(message))
    })
  }

  /**
   * 监听 LCU WebSocket 事件
   *
   * 基于 Pengu Loader 的 context.socket.observe 实现。
   * 支持同一 URI 注册多个回调。
   *
   * @param uri 事件 URI (e.g. '/lol-gameflow/v1/gameflow-phase')
   * @param callback 事件回调
   * @returns 取消监听的函数
   *
   * @example
   * ```ts
   * const unsubscribe = lcu.observe('/lol-gameflow/v1/gameflow-phase', (event) => {
   *   console.log('Phase changed:', event.data)
   * })
   *
   * // 稍后取消监听
   * unsubscribe()
   * ```
   */
  observe(uri: string, callback: EventCallback): () => void {
    console.log('[LCUManager] observe() called → uri=%s, hasContext=%s', uri, String(Boolean(this.penguContext)))
    console.log('[LCUManager] eventListeners has uri? %s, listeners count: %d', this.eventListeners.has(uri), this.eventListeners.get(uri)?.size ?? 0)

    let listeners = this.eventListeners.get(uri)
    if (!listeners) {
      listeners = new Set()
      this.eventListeners.set(uri, listeners)
    }

    listeners.add(callback)
    this.observeUriOnSocket(uri)

    // 返回取消监听函数
    return () => {
      const currentListeners = this.eventListeners.get(uri)
      currentListeners?.delete(callback)
      if (currentListeners && currentListeners.size === 0) {
        this.eventListeners.delete(uri)
      }
    }
  }


  /**
   * 断开所有 WebSocket 事件监听
   * 应在插件卸载时调用
   */
  disconnect() {
    if (this.penguContext) {
      this.penguContext.socket.disconnect()
    }
    this.eventListeners.clear()
    this.observedUris.clear()
  }

}

// ==================== 单例导出 ====================

/** LCU 管理器单例 */
export const lcu = new LCUManager()
