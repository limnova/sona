/**
 * LCU (League Client Update) 接口类型定义
 *
 * 基于 LCU Swagger 定义 (客户端版本 26.05) 和 LeagueAkari 类型定义校验
 * @see https://lcu.kebs.dev/swagger.html
 */

// ==================== 召唤师相关 ====================

/** ARAM 重随点数 */
export interface RerollPoints {
  currentPoints: number
  maxRolls: number
  numberOfRolls: number
  pointsCostToRoll: number
  pointsToReroll: number
}

/** 当前召唤师信息 — GET /lol-summoner/v1/current-summoner */
export interface SummonerInfo {
  accountId: number
  displayName: string
  gameName: string
  tagLine: string
  internalName: string
  nameChangeFlag: boolean
  percentCompleteForNextLevel: number
  privacy: 'PUBLIC' | 'PRIVATE' | (string & {})
  profileIconId: number
  puuid: string
  rerollPoints: RerollPoints
  summonerId: number
  summonerLevel: number
  unnamed: boolean
  xpSinceLastLevel: number
  xpUntilNextLevel: number
}

/** 房间游戏配置 — GET /lol-lobby/v2/lobby 中的 gameConfig 字段 */
export interface LobbyGameConfig {
  allowablePremadeSizes: number[]
  customLobbyName: string
  customMutatorName: string
  customSpectatorPolicy: string
  customSpectators: unknown[]
  customTeam100: unknown[]
  customTeam200: unknown[]
  gameMode: string
  isCustom: boolean
  isLobbyFull: boolean
  isTeamBuilderManaged: boolean
  mapId: number
  maxHumanPlayers: number
  maxLobbySize: number
  maxTeamSize: number
  pickType: string
  premadeSizeAllowed: boolean
  queueId: number
  shouldForceScarcePositionSelection: boolean
  showPositionSelector: boolean
  showQuickPlaySlotSelection: boolean
}

/** 房间信息 — GET /lol-lobby/v2/lobby */
export interface Lobby {
  canStartActivity: boolean
  gameConfig: LobbyGameConfig
  invitations: LobbyInvitation[]
  localMember: LobbyMember
  members: LobbyMember[]
  mucJwtDto: {
    channelClaim: string
    domain: string
    jwt: string
    targetRegion: string
  }
  multiUserChatId: string
  multiUserChatPassword: string
  partyId: string
  partyType: string
  restrictions: unknown[]
  scarcePositions: string[]
  warnings: unknown[]
}

/** 房间邀请 */
export interface LobbyInvitation {
  invitationId: string
  invitationType: string
  state: string
  timestamp: string
  toSummonerId: number
  toSummonerName: string
}

/** 房间成员 — GET /lol-lobby/v2/lobby/members */
export interface LobbyMember {
  allowedChangeActivity: boolean
  allowedInviteOthers: boolean
  allowedKickOthers: boolean
  allowedStartActivity: boolean
  allowedToggleInvite: boolean
  autoFillEligible: boolean
  autoFillProtectedForPromos: boolean
  autoFillProtectedForSoloing: boolean
  autoFillProtectedForStreaking: boolean
  botChampionId: number
  botDifficulty: string
  botId: string
  firstPositionPreference: string
  intraSubteamPosition: number
  isBot: boolean
  isLeader: boolean
  isSpectator: boolean
  puuid: string
  ready: boolean
  secondPositionPreference: string
  showGhostedBanner: boolean
  subteamIndex: number
  summonerIconId: number
  summonerId: number
  summonerInternalName: string
  summonerLevel: number
  summonerName: string
  teamId: number
}

// ==================== 游戏流程相关 ====================

/** 游戏流程阶段 — GET /lol-gameflow/v1/gameflow-phase */
export type GameflowPhase =
  | 'None'
  | 'Lobby'
  | 'Matchmaking'
  | 'ReadyCheck'
  | 'ChampSelect'
  | 'GameStart'
  | 'InProgress'
  | 'Reconnect'
  | 'WaitingForStats'
  | 'PreEndOfGame'
  | 'EndOfGame'
  | 'WatchInProgress'
  | 'TerminatedInError'

/** 游戏客户端连接信息 */
export interface GameClient {
  running: boolean
  visible: boolean
  serverIp: string
  serverPort: number
  observerServerIp: string
  observerServerPort: number
}

/** 游戏流程会话 — GET /lol-gameflow/v1/session */
export interface GameflowSession {
  phase: GameflowPhase
  gameClient: GameClient
  gameData: {
    gameId: number
    gameName: string
    isCustomGame: boolean
    password: string
    playerChampionSelections: PlayerChampionSelection[]
    queue: GameQueue
    spectatorKey: string
    spectatorsAllowed: boolean
    teamOne: GameflowTeamPlayer[]
    teamTwo: GameflowTeamPlayer[]
  }
  gameDodge: {
    dodgeIds: number[]
    phase: string
    state: string
  }
  map: {
    id: number
    name: string
    description: string
    gameMode: string
    gameModeName: string
    gameModeShortName: string
    gameMutator: string
    isRGM: boolean
    mapStringId: string
    platformId: string
    platformName: string
    assets: Record<string, string>
    categorizedContentBundles: Record<string, unknown>
    perPositionDisallowedSummonerSpells: Record<string, unknown>
    perPositionRequiredSummonerSpells: Record<string, unknown>
    properties: Record<string, unknown>
  }
}

/** 游戏流程中的队伍玩家 */
export interface GameflowTeamPlayer {
  championId: number
  puuid: string
  profileIconId: number
  lastSelectedSkinIndex: number
  selectedPosition: string
  selectedRole: string
  summonerId: number
  /** 注意：在 InProgress 阶段此字段始终为空字符串，需通过 getSummonerByPuuid 获取 displayName */
  summonerInternalName: string
  /** 注意：在 InProgress 阶段此字段始终为空字符串，需通过 getSummonerByPuuid 获取 displayName */
  summonerName: string
  teamOwner: boolean
  teamParticipantId: number
  /**
   * 名称可见性类型：
   * - "HIDDEN" — 主播模式，身份信息被混淆
   * - "PUBLIC" — 正常可见
   */
  nameVisibilityType?: 'HIDDEN' | 'PUBLIC' | (string & {})
  /** 混淆后的 PUUID，主播模式下替代 puuid 使用 */
  obfuscatedPuuid?: string
}

/** 玩家英雄选择信息 */
export interface PlayerChampionSelection {
  championId: number
  puuid: string
  selectedSkinIndex: number
  spell1Id: number
  spell2Id: number
}

// ==================== 英雄选择相关 ====================

/** 英雄选择会话 — GET /lol-champ-select/v1/session */
export interface ChampSelectSession {
  actions: ChampSelectAction[][][]
  allowBattleBoost: boolean
  allowDuplicatePicks: boolean
  allowLockedEvents: boolean
  allowPlayerPickSameChampion: boolean
  allowRerolling: boolean
  allowSkinSelection: boolean
  allowSubsetChampionPicks: boolean
  benchChampions: BenchChampion[] // ARAM 模式，共享池中的英雄
  benchEnabled: boolean
  boostableSkinCount: number
  chatDetails: {
    mucJwtDto: {
      channelClaim: string
      domain: string
      jwt: string
      targetRegion: string
    }
    multiUserChatId: string
    multiUserChatPassword: string
  }
  counter: number
  disallowBanningTeammateHoveredChampions: boolean
  gameId: number
  hasSimultaneousBans: boolean
  hasSimultaneousPicks: boolean
  id: string
  isCustomGame: boolean
  isLegacyChampSelect: boolean
  isSpectating: boolean
  localPlayerCellId: number
  lockedEventIndex: number
  myTeam: ChampSelectPlayer[]
  pickOrderSwaps: unknown[]
  positionSwaps: unknown[]
  queueId: number
  rerollsRemaining: number
  showQuitButton: boolean
  skipChampionSelect: boolean
  theirTeam: ChampSelectPlayer[]
  timer: {
    adjustedTimeLeftInPhase: number
    internalNowInEpochMs: number
    isInfinite: boolean
    phase: 'PLANNING' | 'BAN_PICK' | 'FINALIZATION' | 'GAME_STARTING' | (string & {})
    totalTimeInPhase: number
  }
  trades: ChampSelectTrade[]
  bans: {
    myTeamBans: number[]
    theirTeamBans: number[]
    numBans: number
  }
}

/** 替补席英雄（ARAM 模式） */
export interface BenchChampion {
  championId: number
  isPriority: boolean
}

/** 英雄交易状态 */
export interface ChampSelectTrade {
  cellId: number
  id: number
  state: 'INVALID' | 'AVAILABLE' | 'BUSY' | 'RECEIVED' | 'SENT' | (string & {})
}

/** 英雄选择阶段单个召唤师状态 — GET /lol-champ-select/v1/summoners/{cellId} */
export interface ChampSelectSummoner {
  actingBackgroundAnimationState: string
  activeActionType: string
  areSummonerActionsComplete: boolean
  assignedPosition: string
  banIntentSquarePortratPath: string
  cellId: number
  championIconStyle: string
  championId: number
  championName: string
  currentChampionVotePercentInteger: number
  isActingNow: boolean
  isDonePicking: boolean
  isOnPlayersTeam: boolean
  isPickIntenting: boolean
  isPlaceholder: boolean
  isSelf: boolean
  nameVisibilityType: 'HIDDEN' | 'PUBLIC' | (string & {})
  obfuscatedPuuid: string
  obfuscatedSummonerId: number
  pickSnipedClass: string
  puuid: string
  shouldShowActingBar: boolean
  shouldShowBanIntentIcon: boolean
  shouldShowExpanded: boolean
  shouldShowRingAnimations: boolean
  shouldShowSelectedSkin: boolean
  shouldShowSpells: boolean
  showMuted: boolean
  showSwaps: boolean
  showTrades: boolean
  skinId: number
  skinSplashPath: string
  slotId: number
  spell1IconPath: string
  spell2IconPath: string
  statusMessageKey: string
  summonerId: number
  swapId: number
  tradeId: number
}

/** 英雄选择操作 */
export interface ChampSelectAction {
  actorCellId: number
  championId: number
  completed: boolean
  id: number
  isInProgress: boolean
  type: 'pick' | 'ban' | 'ten_bans_reveal' | (string & {})
}

/**
 * 英雄选择中的玩家
 *
 * 主播模式（nameVisibilityType === 'HIDDEN'）下：
 *   - puuid 为空字符串 ""，使用 obfuscatedPuuid 替代
 *   - summonerId 为 0，使用 obfuscatedSummonerId 替代
 *   - gameName / tagLine / internalName / playerAlias 均为空字符串
 */
export interface ChampSelectPlayer {
  /** 分配位置，如 "top"/"jungle"/"mid"/"bot"/"utility"，未分配时为 "" */
  assignedPosition: string
  /** 格子 ID（0-4 己方，5-9 对方） */
  cellId: number
  /** 已选定英雄 ID，未选时为 0 */
  championId: number
  /** 意向选择英雄 ID，未选时为 0 */
  championPickIntent: number
  /** Riot ID 名称，主播模式下为 "" */
  gameName: string
  /** 内部名称，主播模式下为 "" */
  internalName: string
  /** 是否被自动补位 */
  isAutofilled: boolean
  /** 是否为人类玩家（人机为 false） */
  isHumanoid: boolean
  /**
   * 名称可见性类型：
   * - "HIDDEN" — 主播模式，身份信息被混淆
   * - "PUBLIC" — 正常可见
   */
  nameVisibilityType: 'HIDDEN' | 'PUBLIC' | (string & {})
  /**
   * 混淆后的 PUUID，主播模式下替代 puuid 使用
   * 格式如 "d6b1c306-6893-02eb-22a2-199bfd58f170"
   */
  obfuscatedPuuid: string
  /** 混淆后的召唤师 ID，主播模式下替代 summonerId 使用 */
  obfuscatedSummonerId: number
  /** 选择模式 */
  pickMode: number
  /** 选择轮次 */
  pickTurn: number
  /** 玩家别名，主播模式下为 "" */
  playerAlias: string
  /** 玩家类型 */
  playerType: string
  /**
   * 玩家 PUUID，主播模式下为空字符串 ""
   * 主播模式下请使用 obfuscatedPuuid
   */
  puuid: string
  /** 选中的皮肤 ID，未选时为 0 */
  selectedSkinId: number
  /** 召唤师技能1 ID */
  spell1Id: number
  /** 召唤师技能2 ID */
  spell2Id: number
  /**
   * 召唤师 ID，主播模式下为 0
   * 主播模式下请使用 obfuscatedSummonerId
   */
  summonerId: number
  /** Riot ID Tag，主播模式下为 "" */
  tagLine: string
  /** 队伍：1 = 己方（蓝方），2 = 对方（红方） */
  team: 1 | 2 | number
  /** 守卫皮肤 ID，未选择时为 -1 */
  wardSkinId: number
}

/** 选人阶段玩家详细信息（组合查询结果） */
export interface ChampSelectPlayerDetail {
  summonerId: number
  championId: number
  assignedPosition: string
  gameName: string
  tagLine: string
  summonerLevel: number
  puuid: string
  profileIconId: number
  ranked: unknown
  recentMatches: unknown
}

// ==================== 队列相关 ====================

/** 常用队列ID */
export enum QueueId {
  /** 云顶之弈 (普通) */
  TFT_NORMAL = 1090,
  /** 云顶之弈 (排位) */
  TFT_RANKED = 1100,
  /** 云顶之弈 (超级激斗) */
  TFT_HYPER_ROLL = 1130,
  /** 云顶之弈 (双人作战) */
  TFT_DOUBLE_UP = 1160,
  /** 单/双排位 */
  RANKED_SOLO = 420,
  /** 灵活排位 */
  RANKED_FLEX = 440,
  /** 匹配模式 */
  NORMAL_BLIND = 430,
  /** 征召模式 */
  NORMAL_DRAFT = 400,
  /** 极地大乱斗 */
  ARAM = 450,
}

// ==================== 战绩相关 ====================

/** 战绩列表响应 — GET /lol-match-history/v1/products/lol/{puuid}/matches */
export interface MatchHistoryResponse {
  accountId: number
  games: {
    gameBeginDate: string
    gameCount: number
    gameEndDate: string
    gameIndexBegin: number
    gameIndexEnd: number
    games: MatchGame[]
  }
  platformId: string
}

/** 单场对局 */
export interface MatchGame {
  endOfGameResult: string
  gameCreation: number
  gameCreationDate: string
  gameDuration: number
  gameId: number
  gameMode: string
  gameModeMutators: string[]
  gameType: string
  gameVersion: string
  mapId: number
  participantIdentities: ParticipantIdentity[]
  participants: Participant[]
  platformId: string
  queueId: number
  seasonId: number
  teams: MatchTeam[]
}

/** 单局对局详情 — GET /lol-match-history/v1/games/{gameId} */
export type MatchDetail = MatchGame

/** 参与者时间线数据 */
export interface ParticipantTimeline {
  creepsPerMinDeltas: Record<string, number>
  csDiffPerMinDeltas: Record<string, number>
  damageTakenDiffPerMinDeltas: Record<string, number>
  damageTakenPerMinDeltas: Record<string, number>
  goldPerMinDeltas: Record<string, number>
  lane: string
  participantId: number
  role: string
  xpDiffPerMinDeltas: Record<string, number>
  xpPerMinDeltas: Record<string, number>
}

/** 对局队伍数据 */
export interface MatchTeam {
  bans: unknown[]
  baronKills: number
  dominionVictoryScore: number
  dragonKills: number
  firstBaron: boolean
  firstBlood: boolean
  firstDargon: boolean
  firstInhibitor: boolean
  firstTower: boolean
  hordeKills: number
  inhibitorKills: number
  riftHeraldKills: number
  teamId: number
  towerKills: number
  vilemawKills: number
  win: string
}

/** 参与者身份 */
export interface ParticipantIdentity {
  participantId: number
  player: {
    accountId: number
    currentAccountId: number
    currentPlatformId: string
    gameName: string
    matchHistoryUri: string
    platformId: string
    profileIcon: number
    puuid: string
    summonerId: number
    summonerName: string
    tagLine: string
  }
}

/** 参与者数据 */
export interface Participant {
  championId: number
  highestAchievedSeasonTier: string
  participantId: number
  spell1Id: number
  spell2Id: number
  stats: ParticipantStats
  teamId: number
  timeline: ParticipantTimeline
}

/** 参与者统计数据 */
export interface ParticipantStats {
  assists: number
  causedEarlySurrender: boolean
  champLevel: number
  combatPlayerScore: number
  damageDealtToObjectives: number
  damageDealtToTurrets: number
  damageSelfMitigated: number
  deaths: number
  doubleKills: number
  earlySurrenderAccomplice: boolean
  firstBloodAssist: boolean
  firstBloodKill: boolean
  firstInhibitorAssist: boolean
  firstInhibitorKill: boolean
  firstTowerAssist: boolean
  firstTowerKill: boolean
  gameEndedInEarlySurrender: boolean
  gameEndedInSurrender: boolean
  goldEarned: number
  goldSpent: number
  inhibitorKills: number
  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number
  killingSprees: number
  kills: number
  largestCriticalStrike: number
  largestKillingSpree: number
  largestMultiKill: number
  longestTimeSpentLiving: number
  magicDamageDealt: number
  magicDamageDealtToChampions: number
  magicalDamageTaken: number
  neutralMinionsKilled: number
  neutralMinionsKilledEnemyJungle: number
  neutralMinionsKilledTeamJungle: number
  objectivePlayerScore: number
  participantId: number
  pentaKills: number
  perk0: number
  perk0Var1: number
  perk0Var2: number
  perk0Var3: number
  perk1: number
  perk1Var1: number
  perk1Var2: number
  perk1Var3: number
  perk2: number
  perk2Var1: number
  perk2Var2: number
  perk2Var3: number
  perk3: number
  perk3Var1: number
  perk3Var2: number
  perk3Var3: number
  perk4: number
  perk4Var1: number
  perk4Var2: number
  perk4Var3: number
  perk5: number
  perk5Var1: number
  perk5Var2: number
  perk5Var3: number
  perkPrimaryStyle: number
  perkSubStyle: number
  physicalDamageDealt: number
  physicalDamageDealtToChampions: number
  physicalDamageTaken: number
  playerAugment1: number
  playerAugment2: number
  playerAugment3: number
  playerAugment4: number
  playerAugment5: number
  playerAugment6: number
  playerScore0: number
  playerScore1: number
  playerScore2: number
  playerScore3: number
  playerScore4: number
  playerScore5: number
  playerScore6: number
  playerScore7: number
  playerScore8: number
  playerScore9: number
  playerSubteamId: number
  quadraKills: number
  roleBoundItem: number
  sightWardsBoughtInGame: number
  subteamPlacement: number
  teamEarlySurrendered: boolean
  timeCCingOthers: number
  totalDamageDealt: number
  totalDamageDealtToChampions: number
  totalDamageTaken: number
  totalHeal: number
  totalMinionsKilled: number
  totalPlayerScore: number
  totalScoreRank: number
  totalTimeCrowdControlDealt: number
  totalUnitsHealed: number
  tripleKills: number
  trueDamageDealt: number
  trueDamageDealtToChampions: number
  trueDamageTaken: number
  turretKills: number
  unrealKills: number
  visionScore: number
  visionWardsBoughtInGame: number
  wardsKilled: number
  wardsPlaced: number
  win: boolean
}

// ==================== 队列相关（详细） ====================

/** 队列游戏类型配置 */
export interface GameTypeConfig {
  advancedLearningQuests: boolean
  allowTrades: boolean
  banMode: string
  banTimerDuration: number
  battleBoost: boolean
  crossTeamChampionPool: boolean
  deathMatch: boolean
  doNotRemove: boolean
  duplicatePick: boolean
  exclusivePick: boolean
  gameModeOverride: string | null
  id: number
  learningQuests: boolean
  mainPickTimerDuration: number
  maxAllowableBans: number
  name: string
  numPlayersPerTeamOverride: number | null
  onboardCoopBeginner: boolean
  pickMode: string
  postPickTimerDuration: number
  reroll: boolean
  teamChampionPool: boolean
}

/** 队列奖励配置 */
export interface QueueRewards {
  isChampionPointsEnabled: boolean
  isIpEnabled: boolean
  isXpEnabled: boolean
  partySizeIpRewards: unknown[]
}

/** 队列数据 — GET /lol-game-queues/v1/queues */
export interface GameQueue {
  allowablePremadeSizes: number[]
  areFreeChampionsAllowed: boolean
  assetMutator: string
  category: string
  championsRequiredToPlay: number
  description: string
  detailedDescription: string
  gameMode: string
  gameSelectCategory: string
  gameSelectModeGroup: string
  gameSelectPriority: number
  gameTypeConfig: GameTypeConfig
  hidePlayerPosition: boolean
  id: number
  isBotHonoringAllowed: boolean
  isCustom: boolean
  isEnabled: boolean
  isLimitedTimeQueue: boolean
  isRanked: boolean
  isSkillTreeQueue: boolean
  isTeamBuilderManaged: boolean
  isVisible: boolean
  lastToggledOffTime: number
  lastToggledOnTime: number
  mapId: number
  maxDivisionForPremadeSize2: string
  maxLobbySpectatorCount: number
  maxTierForPremadeSize2: string
  maximumParticipantListSize: number
  minLevel: number
  minimumParticipantListSize: number
  name: string
  numPlayersPerTeam: number
  numberOfTeamsInLobby: number
  queueAvailability: string
  queueRewards: QueueRewards
  removalFromGameAllowed: boolean
  removalFromGameDelayMinutes: number
  shortName: string
  showPositionSelector: boolean
  showQuickPlaySlotSelection: boolean
  spectatorEnabled: boolean
  type: string
}

// ==================== 游戏资源相关 ====================

/** 召唤师技能数据 — GET /lol-game-data/assets/v1/summoner-spells.json */
export interface SummonerSpellData {
  id: number
  name: string
  description: string
  summonerLevel: number
  cooldown: number
  gameModes: string[]
  iconPath: string
}

/** 英雄摘要数据 — GET /lol-game-data/assets/v1/champion-summary.json */
export interface ChampionSummaryData {
  id: number
  /** 英雄称号，如 "黑暗之女" */
  name: string
  /** 英文名，如 "Annie" */
  alias: string
  /** 英雄名字，如 "安妮" */
  description: string
  contentId: string
  roles: string[]
  squarePortraitPath: string
}

// ==================== WebSocket 事件相关 ====================

/** LCU WebSocket 事件消息 */
export interface LCUEventMessage {
  uri: string
  eventType: 'Create' | 'Update' | 'Delete'
  data: unknown
}

/** 常用 LCU 事件 URI */
export enum LcuEventUri {
  /** 游戏流程阶段 */
  GAMEFLOW_PHASE = '/lol-gameflow/v1/session',
  /** 英雄选择阶段 */
  CHAMP_SELECT = '/lol-champ-select/v1/session',
  /** 游戏流程阶段变化（仅 phase 字符串） */
  GAMEFLOW_PHASE_CHANGE = '/lol-gameflow/v1/gameflow-phase',
  /** 大厅/房间状态 */
  LOBBY = '/lol-lobby/v2/lobby',
}
