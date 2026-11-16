// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ItemSetWrapper, RunePage } from '@/lib/lcu'
import { recommendation } from '../build-recommendation/fixtures'

const state = vi.hoisted(() => ({
  listeners: new Map<string, Set<(event: { data: unknown; eventType: string }) => void>>(),
  config: {} as Record<string, unknown>,
  queue: { id: 420, gameMode: 'CLASSIC', mapId: 11, isRanked: true },
  getItemSets: vi.fn(), putItemSets: vi.fn(), load: vi.fn(), getTier: vi.fn(),
  getRunePages: vi.fn(), updateRunePage: vi.fn(), updateSpells: vi.fn(),
  getGameflow: vi.fn(),
}))

vi.mock('@/index', () => ({ logger: { info: vi.fn(), warn: vi.fn(), debug: vi.fn(), error: vi.fn() } }))
vi.mock('@/lib/InjectorManager', () => ({ injector: { register: vi.fn(), unregister: vi.fn() } }))
vi.mock('@/components/ui/Modal', () => ({ Modal: () => null }))
vi.mock('@/components/ui/OpggBuildRecommendationPanel', () => ({ OpggBuildRecommendationPanel: () => null }))
vi.mock('@/lib/store', () => ({ store: {
  get: (key: string) => state.config[key] ?? false,
  set: (key: string, value: unknown) => { state.config[key] = value },
} }))
vi.mock('@/lib/assets', () => ({
  getQueue: () => state.queue,
  getQueueName: () => '召唤师峡谷', getChampionById: () => null, getItemPrice: () => 3000,
}))
vi.mock('@/lib/opgg-api', () => ({ opggApi: { getChampionsTier: state.getTier } }))
vi.mock('@/lib/build-recommendation/data', () => ({ loadRecommendation: state.load }))
vi.mock('@/lib/lcu', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/lcu')>()
  actual.lcu.getRunePages = state.getRunePages
  actual.lcu.updateRunePage = state.updateRunePage
  return {
    LcuEventUri: { GAMEFLOW_PHASE_CHANGE: 'phase', CHAMP_SELECT: 'champ' },
    lcu: {
      observe: (uri: string, callback: (event: { data: unknown; eventType: string }) => void) => {
        const listeners = state.listeners.get(uri) ?? new Set()
        listeners.add(callback)
        state.listeners.set(uri, listeners)
        return () => listeners.delete(callback)
      },
      getGameflowPhase: async () => 'Lobby',
      getGameVersion: async () => '16.1',
      getSummonerInfo: async () => ({ summonerId: 1, accountId: 1, puuid: 'player' }),
      getGameflowSession: state.getGameflow,
      getItemSets: state.getItemSets, putItemSets: state.putItemSets,
      getRunePages: state.getRunePages, updateMySelection: state.updateSpells,
      applyRunePage: actual.lcu.applyRunePage.bind(actual.lcu),
    },
  }
})

function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((done) => { resolve = done })
  return { promise, resolve }
}

function select(queueId = 420, championId = 37, assignedPosition = 'utility') {
  return {
    queueId, localPlayerCellId: 0, actions: [], timer: { phase: 'BAN_PICK' },
    myTeam: [{ cellId: 0, championId, assignedPosition, spell1Id: 4, spell2Id: 7 }],
  }
}

function emit(uri: string, data: unknown) {
  state.listeners.get(uri)?.forEach((callback) => callback({ data, eventType: 'Update' }))
}

async function settle() {
  await vi.advanceTimersByTimeAsync(0)
}

let updateFeature: (enabled: boolean) => void
beforeEach(async () => {
  vi.useFakeTimers()
  vi.resetModules()
  vi.resetAllMocks()
  state.listeners.clear()
  state.queue = { id: 420, gameMode: 'CLASSIC', mapId: 11, isRanked: true }
  state.config = { smartItemSetBuild: true, opggBuildRecommendationTier: 'emerald_plus' }
  state.load.mockResolvedValue(recommendation())
  state.getItemSets.mockResolvedValue({ accountId: 1, itemSets: [], timestamp: 0 })
  state.getRunePages.mockResolvedValue([])
  state.getTier.mockResolvedValue({ data: [] })
  vi.stubGlobal('Toast', { success: vi.fn() })
  const feature = await import('@/lib/features/opgg-build-recommendation')
  updateFeature = feature.updateOpggBuildRecommendation
  updateFeature(true)
  await settle()
})
afterEach(() => {
  updateFeature(false)
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('配装会话失效', () => {
  it.each(['mode', 'phase', 'champion', 'setting', 'disabled'] as const)(
    '读装备集期间发生 %s 变化，不继续写回', async (change) => {
      const pending = deferred<ItemSetWrapper>()
      state.getItemSets.mockReturnValueOnce(pending.promise)
      emit('champ', select())
      await settle()
      expect(state.getItemSets).toHaveBeenCalledOnce()
      if (change === 'mode') {
        state.queue = { id: 450, gameMode: 'ARAM', mapId: 12, isRanked: false }
        emit('champ', select(450))
      } else if (change === 'phase') {
        emit('phase', 'Lobby')
      } else if (change === 'champion') {
        emit('champ', select(420, 68))
      } else if (change === 'setting') {
        state.config.smartItemSetBuild = false
        state.config.opggBuildRecommendation = true
        updateFeature(true)
      } else {
        state.config.smartItemSetBuild = false
        updateFeature(false)
      }
      await settle()
      state.putItemSets.mockClear()
      pending.resolve({ accountId: 1, itemSets: [], timestamp: 0 })
      await settle()
      expect(state.putItemSets).not.toHaveBeenCalled()
    },
  )

  it('退出后同英雄的新会话不会接收上一轮的装备写回', async () => {
    const old = deferred<ItemSetWrapper>()
    const current = deferred<ItemSetWrapper>()
    state.getItemSets.mockReturnValueOnce(old.promise).mockReturnValueOnce(current.promise)
    emit('champ', select())
    await settle()
    emit('phase', 'Lobby')
    emit('champ', select())
    await settle()
    old.resolve({ accountId: 1, itemSets: [], timestamp: 0 })
    await settle()
    expect(state.putItemSets).not.toHaveBeenCalled()
    emit('champ', select())
    await settle()
    expect(state.getItemSets).toHaveBeenCalledTimes(2)
    current.resolve({ accountId: 1, itemSets: [], timestamp: 0 })
    await settle()
    expect(state.putItemSets).toHaveBeenCalledOnce()
  })

  it.each(['mode', 'setting', 'disabled'] as const)('读符文页期间发生 %s 变化，不应用旧峡谷符文', async (change) => {
    state.config.smartItemSetBuild = false
    state.config.smartBuildRecommendation = true
    state.config.smartSummonerSpells = {}
    state.config.smartRunePages = { '37:ranked': {
      primaryStyleId: 8000, subStyleId: 8100, selectedPerkIds: [1, 2, 3, 4, 5, 6],
    } }
    const pending = deferred<RunePage[]>()
    state.getRunePages.mockReturnValue(pending.promise)
    emit('champ', select())
    await vi.advanceTimersByTimeAsync(500)
    expect(state.getRunePages).toHaveBeenCalledOnce()
    if (change === 'mode') {
      state.queue = { id: 450, gameMode: 'ARAM', mapId: 12, isRanked: false }
      emit('champ', select(450))
    } else if (change === 'setting') {
      state.config.smartBuildRecommendation = false
      state.config.opggBuildRecommendation = true
      updateFeature(true)
    } else {
      state.config.smartBuildRecommendation = false
      updateFeature(false)
    }
    await settle()
    pending.resolve([{ id: 1, name: 'Other - Sona', current: true } as RunePage])
    await settle()
    expect(state.updateRunePage).not.toHaveBeenCalled()
  })

  it('当前峡谷会话仍能同步装备集', async () => {
    emit('champ', select())
    await settle()
    expect(state.putItemSets).toHaveBeenCalledOnce()
  })
})

describe('推荐按需加载', () => {
  it('游戏中配装会话读取期间关闭功能，不重新打开弹窗或加载推荐', async () => {
    state.config.opggBuildRecommendation = true
    const pending = deferred<unknown>()
    state.getGameflow.mockReturnValue(pending.promise)
    const { showOpggBuildRecommendationModal } = await import('@/lib/features/opgg-build-recommendation')
    const opening = showOpggBuildRecommendationModal()
    state.config.opggBuildRecommendation = false
    updateFeature(false)
    pending.resolve({
      gameData: { queue: state.queue, playerChampionSelections: [{ puuid: 'player', championId: 37 }],
        teamOne: [{ puuid: 'player', selectedPosition: 'utility' }], teamTwo: [] },
      map: { id: 11, gameMode: 'CLASSIC' },
    })
    await opening
    expect(state.load).not.toHaveBeenCalled()
    expect(document.body.childElementCount).toBe(0)
  })

  it('只开启智能符文时，仍恢复配置但不请求推荐或常见分路', async () => {
    state.config = {
      smartBuildRecommendation: true, opggBuildRecommendationTier: 'emerald_plus', smartRunePages: {},
      smartSummonerSpells: { '37:ranked': { spell1Id: 4, spell2Id: 14 } },
    }
    emit('champ', select(420, 37, ''))
    await vi.advanceTimersByTimeAsync(500)
    expect(state.load).not.toHaveBeenCalled()
    expect(state.getTier).not.toHaveBeenCalled()
    expect(state.updateSpells).toHaveBeenCalledWith({ spell1Id: 4, spell2Id: 14 }, expect.anything())
  })

  it('非峡谷会话不请求外部推荐', async () => {
    state.queue = { id: 450, gameMode: 'ARAM', mapId: 12, isRanked: false }
    emit('champ', select(450))
    await settle()
    expect(state.load).not.toHaveBeenCalled()
    expect(state.getTier).not.toHaveBeenCalled()
  })
})
