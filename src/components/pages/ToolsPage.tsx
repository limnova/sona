import { useState, useEffect } from 'react'
import { SettingCard, SettingGroup } from '@/components/ui/SettingCard'
import { SonaButton } from '@/components/ui/SonaButton'
import { SonaInput } from '@/components/ui/SonaInput'
import { SonaSwitch } from '@/components/ui/SonaSwitch'
import { SonaSelect } from '@/components/ui/SonaSelect'
import { MatchHistoryModal } from '@/components/ui/MatchHistoryModal'
import { lcu } from '@/lib/lcu'
import { store } from '@/lib/store'
import '@/styles/SettingsPage.css'

export function ToolsPage() {
  const [champSelectAssist, setChampSelectAssist] = useState(store.get('champSelectAssist'))
  const [champSelectTierBadge, setChampSelectTierBadge] = useState(store.get('champSelectTierBadge'))
  const [opggBuildRecommendation, setOpggBuildRecommendation] = useState(store.get('opggBuildRecommendation'))
  const [smartBuildRecommendation, setSmartBuildRecommendation] = useState(store.get('smartBuildRecommendation'))
  const [smartItemSetBuild, setSmartItemSetBuild] = useState(store.get('smartItemSetBuild'))
  const [balanceBuffTooltip, setBalanceBuffTooltip] = useState(store.get('balanceBuffTooltip'))
  const [gameAnalysisPopup, setGameAnalysisPopup] = useState(store.get('gameAnalysisPopup'))
  const [analyzeTeamPower, setAnalyzeTeamPower] = useState(store.get('analyzeTeamPower'))
  const [analyzeTeamPowerFetchCount, setAnalyzeTeamPowerFetchCount] = useState(store.get('analyzeTeamPowerFetchCount'))
  const [champSelectAssistFetchCount, setChampSelectAssistFetchCount] = useState(store.get('champSelectAssistFetchCount'))
  const [gameAnalysisFetchCount, setGameAnalysisFetchCount] = useState(store.get('gameAnalysisFetchCount'))
  const [lobbyEnhancement, setLobbyEnhancement] = useState(store.get('lobbyEnhancement'))
  const [lobbyEnhancementFetchCount, setLobbyEnhancementFetchCount] = useState(store.get('lobbyEnhancementFetchCount'))
  const [searchRiotId, setSearchRiotId] = useState('')
  const [searchError, setSearchError] = useState('')
  const [matchModalOpen, setMatchModalOpen] = useState(false)
  const [matchModalPuuid, setMatchModalPuuid] = useState('')
  const [matchModalName, setMatchModalName] = useState('')
  const recentOptions = [
    { value: '20', label: '近20局' },
    { value: '50', label: '近50局' },
    { value: '100', label: '近100局' },
  ]

  useEffect(() => {
    const unsubs = [
      store.onChange('champSelectAssist', setChampSelectAssist),
      store.onChange('champSelectTierBadge', setChampSelectTierBadge),
      store.onChange('opggBuildRecommendation', setOpggBuildRecommendation),
      store.onChange('smartBuildRecommendation', setSmartBuildRecommendation),
      store.onChange('smartItemSetBuild', setSmartItemSetBuild),
      store.onChange('balanceBuffTooltip', setBalanceBuffTooltip),
      store.onChange('gameAnalysisPopup', setGameAnalysisPopup),
      store.onChange('analyzeTeamPower', setAnalyzeTeamPower),
      store.onChange('analyzeTeamPowerFetchCount', setAnalyzeTeamPowerFetchCount),
      store.onChange('champSelectAssistFetchCount', setChampSelectAssistFetchCount),
      store.onChange('gameAnalysisFetchCount', setGameAnalysisFetchCount),
      store.onChange('lobbyEnhancement', setLobbyEnhancement),
      store.onChange('lobbyEnhancementFetchCount', setLobbyEnhancementFetchCount),
    ]
    return () => unsubs.forEach((fn) => fn())
  }, [])

  const handleSearchMatch = async () => {
    const parts = searchRiotId.trim().split('#')
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      setSearchError('格式错误，请输入: 名字#Tag')
      return
    }
    setSearchError('')
    try {
      const puuid = await lcu.resolveSummonerPuuidByRiotId(parts[0], parts[1])
      if (!puuid) {
        setSearchError('未找到该召唤师')
        return
      }
      setMatchModalPuuid(puuid)
      setMatchModalName(`${parts[0]}#${parts[1]}`)
      setMatchModalOpen(true)
    } catch {
      setSearchError('查询失败，请检查名字和Tag是否正确')
    }
  }

  return (
    <div className="sona-settings">
      <h2 className="sona-settings-title">{'排位分析'}</h2>

      <SettingGroup title={'战绩查询'}>
        <p className="sona-subtitle" style={{ marginBottom: 10 }}>{'输入召唤师名#Tag 查询国服玩家的近期战绩，支持国服大区互通查询。'}</p>
        <div className="sona-match-search-actions" style={{ alignItems: 'flex-end', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <SonaInput
              value={searchRiotId}
              onChange={(v) => { setSearchRiotId(v); setSearchError('') }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearchMatch() }}
              placeholder={'名字#Tag (例:丨一疾风剑豪一丨#77772)'}
            />
          </div>
          <SonaButton variant="primary" onClick={handleSearchMatch}>
            {'查询战绩'}
          </SonaButton>
        </div>
        {searchError && <p className="sona-subtitle" style={{ color: '#e74c3c', marginTop: 6 }}>{searchError}</p>}
      </SettingGroup>

      <MatchHistoryModal
        open={matchModalOpen}
        onClose={() => setMatchModalOpen(false)}
        puuid={matchModalPuuid}
        playerName={matchModalName}
      />

      <SettingGroup title={'对局相关'}>
        <SettingCard
          title={'英雄选择阶段增强'}
          description={'英雄选择时显示粒子特效和队友近期胜率/KDA；点击队友头像可查询近期战绩。'}
        >
          <SonaSelect
            value={String(champSelectAssistFetchCount)}
            onChange={(v) => { setChampSelectAssistFetchCount(Number(v)); store.set('champSelectAssistFetchCount', Number(v)) }}
            options={recentOptions}
          />
          <SonaSwitch
            checked={champSelectAssist}
            onChange={(v) => { setChampSelectAssist(v); store.set('champSelectAssist', v) }}
          />
        </SettingCard>
        <SettingCard
          title={'牛马检测器'}
          description={'在队友头像旁显示千里马、上等马、下等马等队内评级与综合评分，仅自己可见。'}
        >
          <SonaSelect
            value={String(analyzeTeamPowerFetchCount)}
            onChange={(v) => { setAnalyzeTeamPowerFetchCount(Number(v)); store.set('analyzeTeamPowerFetchCount', Number(v)) }}
            options={recentOptions}
          />
          <SonaSwitch
            checked={analyzeTeamPower}
            onChange={(v) => { setAnalyzeTeamPower(v); store.set('analyzeTeamPower', v) }}
          />
        </SettingCard>
        <SettingCard
          title={'英雄 T 级角标'}
          description={'英雄选择时在英雄列表、备选席和左侧队友头像上显示 T 级角标。'}
        >
          <SonaSwitch
            checked={champSelectTierBadge}
            onChange={(v) => { setChampSelectTierBadge(v); store.set('champSelectTierBadge', v) }}
          />
        </SettingCard>
        <SettingCard
          title={'配装推荐面板'}
          description={'锁定英雄后，点击皮肤选择下方的按钮以打开当前英雄的 OP.GG 配装、符文和海克斯推荐。'}
        >
          <SonaSwitch
            checked={opggBuildRecommendation}
            onChange={(v) => { setOpggBuildRecommendation(v); store.set('opggBuildRecommendation', v) }}
          />
        </SettingCard>
        <SettingCard
          title={'自动配置符文 & 召唤师技能'}
          description={'按"英雄 + 模式"保存并恢复符文与召唤师技能；首次使用会在进入游戏前记录最终配置。'}
        >
          <SonaSwitch
            checked={smartBuildRecommendation}
            onChange={(v) => { setSmartBuildRecommendation(v); store.set('smartBuildRecommendation', v) }}
          />
        </SettingCard>
        <SettingCard
          title={'自动配装'}
          description={'锁定英雄后按模式和分路自动写入 OP.GG 推荐装备集。（暂不推荐使用，可能导致配装错乱）'}
        >
          <SonaSwitch
            checked={smartItemSetBuild}
            onChange={(v) => { setSmartItemSetBuild(v); store.set('smartItemSetBuild', v) }}
          />
        </SettingCard>
        <SettingCard
          title={'平衡性调整buff提示'}
          description={'游玩特定模式（大乱斗、无限火力）时，鼠标悬停在英雄头像上，显示对应的平衡性数值调整。'}
        >
          <SonaSwitch
            checked={balanceBuffTooltip}
            onChange={(v) => { setBalanceBuffTooltip(v); store.set('balanceBuffTooltip', v) }}
          />
        </SettingCard>
        <SettingCard
          title={'全局战力分析弹窗'}
          description={'进入游戏后，自动弹窗展示双方队伍战力分析，包括胜率、KDA、段位、开黑分组。(注，不是直接在游戏内展示，需要切回客户端查看)'}
        >
          <SonaSelect
            value={String(gameAnalysisFetchCount)}
            onChange={(v) => { setGameAnalysisFetchCount(Number(v)); store.set('gameAnalysisFetchCount', Number(v)) }}
            options={recentOptions}
          />
          <SonaSwitch
            checked={gameAnalysisPopup}
            onChange={(v) => { setGameAnalysisPopup(v); store.set('gameAnalysisPopup', v) }}
          />
        </SettingCard>
        <SettingCard
          title={'组队界面增强'}
          description={'开启后，组队界面点击头像即可查看召唤师战绩，且旗帜上方显示近期表现。'}
        >
          <SonaSelect
            value={String(lobbyEnhancementFetchCount)}
            onChange={(v) => { setLobbyEnhancementFetchCount(Number(v)); store.set('lobbyEnhancementFetchCount', Number(v)) }}
            options={recentOptions}
          />
          <SonaSwitch
            checked={lobbyEnhancement}
            onChange={(v) => { setLobbyEnhancement(v); store.set('lobbyEnhancement', v) }}
          />
        </SettingCard>
      </SettingGroup>
    </div>
  )
}
