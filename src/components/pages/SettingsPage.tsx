import { useState, useEffect } from 'react'
import { SettingCard, SettingGroup } from '@/components/ui/SettingCard'
import { SonaSwitch } from '@/components/ui/SonaSwitch'
import { SonaSelect } from '@/components/ui/SonaSelect'
import { SonaButton } from '@/components/ui/SonaButton'
import { store } from '@/lib/store'
import { checkForUpdates, clearSkippedUpdateVersion } from '@/lib/update-checker'
import '@/styles/SettingsPage.css'

const hotkeyOptions = [
  { value: 'F1', label: 'F1' },
  { value: 'F2', label: 'F2' },
  { value: 'F3', label: 'F3' },
  { value: 'F4', label: 'F4' },
  { value: 'F5', label: 'F5' },
]

export function SettingsPage() {
  const [hotkey, setHotkey] = useState(store.get('hotkey'))
  const [hideSonaIcon, setHideSonaIcon] = useState(store.get('hideSonaIcon'))
  const [skippedUpdateVersion, setSkippedUpdateVersion] = useState(store.get('skippedUpdateVersion'))

  useEffect(() => {
    const unsubs = [
      store.onChange('hotkey', setHotkey),
      store.onChange('hideSonaIcon', setHideSonaIcon),
      store.onChange('skippedUpdateVersion', setSkippedUpdateVersion),
    ]
    return () => unsubs.forEach((fn) => fn())
  }, [])

  return (
    <div className="sona-settings">
      <h2 className="sona-settings-title">{'设置'}</h2>

      <SettingGroup title={'通用'}>
        <SettingCard
          title={'面板快捷键'}
          description={'随时按下快捷键打开/关闭 Sona 面板。'}
        >
          <SonaSelect
            options={hotkeyOptions}
            value={hotkey}
            onChange={(v) => { setHotkey(v); store.set('hotkey', v) }}
          />
        </SettingCard>
        <SettingCard
          title={'隐藏琴女 Icon'}
          description={`隐藏 Play 按钮旁的 Sona 入口图标；隐藏后仍可按 ${hotkey} 打开面板。`}
        >
          <SonaSwitch
            checked={hideSonaIcon}
            onChange={(v) => { setHideSonaIcon(v); store.set('hideSonaIcon', v) }}
          />
        </SettingCard>
        {skippedUpdateVersion && (
          <SettingCard
            title={`已跳过 v${skippedUpdateVersion} 版本更新`}
            description={'Sona 不会再提示这个版本；恢复提醒后会重新检查更新。'}
          >
            <SonaButton onClick={() => {
              clearSkippedUpdateVersion()
              void checkForUpdates()
            }}>
              {'恢复更新提醒'}
            </SonaButton>
          </SettingCard>
        )}
      </SettingGroup>


    </div>
  )
}
