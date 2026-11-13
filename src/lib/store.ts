/**
 * Sona 插件配置管理
 *
 * 基于 Pengu Loader 的 DataStore API 实现持久化存储。
 * 所有配置项集中管理，带类型安全和默认值。
 *
 * 使用方式：
 * ```ts
 * import { store } from '@/lib/store'
 *
 * // 读取
 * const value = store.get('champSelectAssist')
 *
 * // 写入（自动持久化）
 * store.set('champSelectAssist', true)
 *
 * // 监听变化
 * store.onChange('champSelectAssist', (value) => { ... })
 * ```
 */

// ==================== 配置项定义 ====================

/** 所有配置项及其类型 */
export interface SonaConfig {
  sidebarCollapsed: boolean
  hotkey: string
  hideSonaIcon: boolean
  skippedUpdateVersion: string | null
  champSelectAssist: boolean
  champSelectTierBadge: boolean
  opggBuildRecommendation: boolean
  /** 沿用历史 key：保存与恢复符文及召唤师技能。 */
  smartBuildRecommendation: boolean
  smartItemSetBuild: boolean
  smartRunePages: Record<string, {
    primaryStyleId: number
    subStyleId: number
    selectedPerkIds: number[]
    updatedAt: number
  }>
  smartSummonerSpells: Record<string, {
    spell1Id: number
    spell2Id: number
    updatedAt: number
  }>
  opggBuildRecommendationTier: string
  /** 在选人头像旁展示队内评级，仅本地显示。 */
  analyzeTeamPower: boolean
  analyzeTeamPowerFetchCount: number
  champSelectAssistFetchCount: number
  gameAnalysisFetchCount: number
  lobbyEnhancement: boolean
  lobbyEnhancementFetchCount: number
  gameAnalysisPopup: boolean
}

/** 配置项默认值 */
const DEFAULT_CONFIG: SonaConfig = {
  sidebarCollapsed: false,
  hotkey: 'F1',
  hideSonaIcon: false,
  skippedUpdateVersion: null,
  champSelectAssist: false,
  champSelectTierBadge: false,
  opggBuildRecommendation: false,
  smartBuildRecommendation: false,
  smartItemSetBuild: false,
  smartRunePages: {},
  smartSummonerSpells: {},
  opggBuildRecommendationTier: 'emerald_plus',
  analyzeTeamPower: false,
  analyzeTeamPowerFetchCount: 50,
  champSelectAssistFetchCount: 50,
  gameAnalysisFetchCount: 50,
  lobbyEnhancement: true,
  lobbyEnhancementFetchCount: 50,
  gameAnalysisPopup: false,
}

// ==================== Store 实现 ====================

/** DataStore 键前缀，避免与其他插件冲突 */
const KEY_PREFIX = 'sona:'

type ConfigKey = keyof SonaConfig
type ChangeListener<K extends ConfigKey = ConfigKey> = (value: SonaConfig[K], key: K) => void

class SonaStore {
  private listeners = new Map<ConfigKey, Set<ChangeListener>>()
  private cache: SonaConfig

  constructor() {
    // 启动时把所有配置加载到内存缓存中
    const loaded = { ...DEFAULT_CONFIG }
    for (const key of Object.keys(DEFAULT_CONFIG) as ConfigKey[]) {
      (loaded as Record<string, unknown>)[key] = this.readFromDisk(key)
    }
    this.cache = loaded
  }

  /**
   * 获取配置值
   */
  get<K extends ConfigKey>(key: K): SonaConfig[K] {
    return this.cache[key]
  }

  /**
   * 设置配置值（自动持久化 + 触发监听）
   */
  set<K extends ConfigKey>(key: K, value: SonaConfig[K]) {
    const old = this.cache[key]
    if (old === value) return

    this.cache[key] = value
    DataStore.set(`${KEY_PREFIX}${key}`, value)

    // 触发变化监听
    const keyListeners = this.listeners.get(key)
    if (keyListeners) {
      keyListeners.forEach((fn) => {
        try {
          (fn as ChangeListener<K>)(value, key)
        } catch {
          // ignore listener errors
        }
      })
    }
  }

  /**
   * 切换布尔值配置
   */
  toggle<K extends ConfigKey>(key: K): SonaConfig[K] {
    const current = this.get(key)
    if (typeof current !== 'boolean') return current
    const next = !current as SonaConfig[K]
    this.set(key, next)
    return next
  }

  /**
   * 监听配置变化
   * @returns 取消监听的函数
   */
  onChange<K extends ConfigKey>(key: K, fn: ChangeListener<K>): () => void {
    let keyListeners = this.listeners.get(key)
    if (!keyListeners) {
      keyListeners = new Set()
      this.listeners.set(key, keyListeners)
    }
    keyListeners.add(fn as ChangeListener)

    return () => {
      keyListeners!.delete(fn as ChangeListener)
    }
  }

  /**
   * 重置所有配置为默认值
   */
  resetAll() {
    for (const key of Object.keys(DEFAULT_CONFIG) as ConfigKey[]) {
      this.set(key, DEFAULT_CONFIG[key])
    }
  }

  /**
   * 重置单个配置为默认值
   */
  reset<K extends ConfigKey>(key: K) {
    this.set(key, DEFAULT_CONFIG[key])
  }

  /**
   * 获取所有配置的快照
   */
  getAll(): SonaConfig {
    const result = { ...DEFAULT_CONFIG }
    for (const key of Object.keys(DEFAULT_CONFIG) as ConfigKey[]) {
      result[key] = this.get(key) as never
    }
    return result
  }

  // ---- 内部方法 ----

  private readFromDisk<K extends ConfigKey>(key: K): SonaConfig[K] {
    const stored = DataStore.get<SonaConfig[K]>(`${KEY_PREFIX}${key}`)
    return stored !== undefined ? stored : DEFAULT_CONFIG[key]
  }
}

// ==================== 单例导出 ====================

/** Sona 配置管理器单例 */
export const store = new SonaStore()
