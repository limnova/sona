// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ChampSelectSession, GameflowSession, Lobby } from '@/types/lcu'
import type { SgpMatchHistoryLol } from '@/types/sgp'

const state = vi.hoisted(() => ({
  listeners: new Map<string, Set<(event: { data: unknown; eventType: string }) => void>>(),
  config: {} as Record<string, unknown>,
  queue: { id: 420, gameMode: 'CLASSIC', mapId: 11 },
  session: {} as GameflowSession,
  lobby: {} as Lobby,
  champSelect: {} as ChampSelectSession,
  render: vi.fn(), unmount: vi.fn(),
  getHistory: vi.fn(), getGameflow: vi.fn(), getTier: vi.fn(),
  register: vi.fn(), unregister: vi.fn(),
}))

vi.mock('@/index', () => ({ logger: { info: vi.fn(), warn: vi.fn(), debug: vi.fn(), error: vi.fn() } }))
vi.mock('react-dom/client', () => ({ createRoot: () => ({ render: state.render, unmount: state.unmount }) }))
vi.mock('@/components/ui/MatchHistoryModal', () => ({ MatchHistoryModal: () => null }))
vi.mock('@/components/ui/GameAnalysisModal', () => ({ GameAnalysisModal: () => null }))
vi.mock('@/components/ui/ChampSelectIconEffect', () => ({ ChampSelectIconEffect: () => null, getTierConfig: vi.fn() }))
vi.mock('@/lib/features/opgg-build-recommendation', () => ({ updateOpggBuildRecommendation: vi.fn() }))
vi.mock('@/lib/assets', () => ({ getQueue: () => state.queue }))
vi.mock('@/lib/store', () => ({ store: {
  get: (key: string) => state.config[key] ?? false,
  onChange: () => () => {},
} }))
vi.mock('@/lib/InjectorManager', () => ({ injector: { register: state.register, unregister: state.unregister } }))
vi.mock('@/lib/opgg-api', () => ({ opggApi: { getChampionsTier: state.getTier } }))
vi.mock('@/lib/lcu', () => ({
  LcuEventUri: { GAMEFLOW_PHASE_CHANGE: 'phase', CHAMP_SELECT: 'champ', LOBBY: 'lobby' },
  queueIdToTag: (id: number) => id > 0 ? `q_${id}` : '',
  lcu: {
    observe: (uri: string, callback: (event: { data: unknown; eventType: string }) => void) => {
      const callbacks = state.listeners.get(uri) ?? new Set()
      callbacks.add(callback)
      state.listeners.set(uri, callbacks)
      return () => callbacks.delete(callback)
    },
    getGameflowSession: state.getGameflow,
    getGameflowPhase: async () => 'ChampSelect',
    getChampSelectSession: async () => state.champSelect,
    getLobby: async () => state.lobby,
    getSgpMatchHistory: state.getHistory,
  },
}))

function selectMode(gameMode: string, mapId: number) {
  state.queue = { id: 420, gameMode, mapId }
  state.session = { gameData: { gameId: 1, queue: state.queue }, map: { id: mapId, gameMode } } as GameflowSession
  state.lobby = {
    gameConfig: { queueId: 420, gameMode, mapId },
    members: [{ puuid: 'player', summonerId: 1, summonerName: 'Player' }],
  } as Lobby
}

function emit(uri: string, data: unknown) {
  state.listeners.get(uri)?.forEach((callback) => callback({ data, eventType: 'Update' }))
}

async function settle() {
  await new Promise((resolve) => setTimeout(resolve, 0))
}

beforeEach(() => {
  vi.resetModules()
  vi.resetAllMocks()
  state.listeners.clear()
  state.config = { champSelectAssist: true, champSelectAssistFetchCount: 20, opggBuildRecommendationTier: 'emerald_plus' }
  document.body.innerHTML = ''
  selectMode('CLASSIC', 11)
  state.champSelect = { queueId: 420, myTeam: [{
    puuid: 'player', obfuscatedPuuid: '', summonerId: 1, gameName: 'Player', tagLine: 'CN', cellId: 0,
  }] } as ChampSelectSession
  state.getGameflow.mockImplementation(async () => state.session)
  state.getHistory.mockResolvedValue({ games: [] })
  state.getTier.mockResolvedValue({ data: [] })
  state.register.mockImplementation((task: () => boolean) => task())
})

describe('非峡谷功能入口', () => {
  it('所有功能关闭时，启动不预取英雄 T 级或战绩', async () => {
    state.config = {}
    const { initFeatures } = await import('@/lib/features')
    initFeatures()
    await settle()
    expect(state.getTier).not.toHaveBeenCalled()
    expect(state.getHistory).not.toHaveBeenCalled()
  })
  it.each([['KIWI', 12], ['ARAM', 12], ['CHERRY', 30], ['URF', 11], ['NEXUSBLITZ', 21], ['CLASSIC', 10]] as const)(
    '%s 不启动房间战绩、选人战绩、T 级加载或游戏分析', async (gameMode, mapId) => {
      selectMode(gameMode, mapId)
      const { updateLobbyMemberMatchHistory } = await import('@/lib/features/lobby-member-match-history')
      const { updateChampSelectTierBadge } = await import('@/lib/features/champselect-tier-badge')
      const { updateGameAnalysisPopup } = await import('@/lib/features/game-analysis-popup')
      const { initFeatures } = await import('@/lib/features')
      updateLobbyMemberMatchHistory(true)
      updateChampSelectTierBadge(true)
      updateGameAnalysisPopup(true)
      await settle()
      expect(state.getTier).not.toHaveBeenCalled()
      emit('phase', 'InProgress')
      await settle()
      expect(state.render).not.toHaveBeenCalled()
      expect(document.querySelector('[data-sona-game-analysis]')).toBeNull()
      updateGameAnalysisPopup(false)
      updateChampSelectTierBadge(false)
      updateLobbyMemberMatchHistory(false)

      initFeatures()
      await settle()
      expect(state.getHistory).not.toHaveBeenCalled()
      expect(state.getTier).not.toHaveBeenCalled()
    },
  )

  it('峡谷仍启动队友战绩、T 级请求和游戏分析', async () => {
    state.config.champSelectTierBadge = true
    const { initFeatures } = await import('@/lib/features')
    const { updateGameAnalysisPopup } = await import('@/lib/features/game-analysis-popup')
    initFeatures()
    await settle()
    expect(state.getHistory).toHaveBeenCalledExactlyOnceWith('player', { startIndex: 0, count: 20, tag: 'q_420' })
    expect(state.getTier).toHaveBeenCalledExactlyOnceWith({ tier: 'emerald_plus' })
    updateGameAnalysisPopup(true)
    emit('phase', 'InProgress')
    await settle()
    expect(state.render).toHaveBeenCalledOnce()
    updateGameAnalysisPopup(false)
  })

  it('无法获取游戏流程时不兜底打开分析弹窗', async () => {
    state.getGameflow.mockRejectedValue(new Error('offline'))
    const { updateGameAnalysisPopup } = await import('@/lib/features/game-analysis-popup')
    updateGameAnalysisPopup(true)
    emit('phase', 'InProgress')
    await settle()
    expect(state.render).not.toHaveBeenCalled()
    expect(state.register).not.toHaveBeenCalled()
    updateGameAnalysisPopup(false)
  })

  it('选人阶段切换到其他队列时清理既有 T 级角标，不能复用峡谷缓存', async () => {
    state.getTier.mockResolvedValue({ data: [{ id: 37, positions: [], average_stats: { tier: 2, win_rate: 0.5 } }] })
    document.body.innerHTML = '<div class="champion-grid-champion-thumbnail" data-champion-id="37"></div>'
    const { updateChampSelectTierBadge } = await import('@/lib/features/champselect-tier-badge')
    updateChampSelectTierBadge(true)
    await settle()
    expect(document.querySelector('[data-sona-champ-tier-badge]')).not.toBeNull()
    selectMode('KIWI', 12)
    state.queue.id = 2400
    state.champSelect = { ...state.champSelect, queueId: 2400 }
    emit('champ', state.champSelect)
    await settle()
    expect(document.querySelector('[data-sona-champ-tier-badge]')).toBeNull()
    expect(state.getTier).toHaveBeenCalledOnce()
    updateChampSelectTierBadge(false)
  })

  it('从峡谷切换到其他玩法时移除房间增强，晚到的战绩不能重新注入', async () => {
    let resolve!: (value: SgpMatchHistoryLol) => void
    state.getHistory.mockReturnValue(new Promise<SgpMatchHistoryLol>((yes) => { resolve = yes }))
    document.body.innerHTML = '<lol-regalia-parties-v2-element puuid="player"><div class="player-identity-container"></div></lol-regalia-parties-v2-element>'
    const { updateLobbyMemberMatchHistory } = await import('@/lib/features/lobby-member-match-history')
    updateLobbyMemberMatchHistory(true)
    await settle()
    expect(document.querySelector('[data-sona-lobby-history]')).not.toBeNull()
    selectMode('KIWI', 12)
    emit('lobby', state.lobby)
    await settle()
    expect(document.querySelector('[data-sona-lobby-history]')).toBeNull()
    resolve({ games: [] })
    await settle()
    expect(document.querySelector('[data-sona-lobby-history]')).toBeNull()
    expect(state.getHistory).toHaveBeenCalledOnce()
    updateLobbyMemberMatchHistory(false)
  })
})
