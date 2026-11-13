import { logger } from '@/index'
import { injector } from '@/lib/InjectorManager'
import { store } from '@/lib/store'
import { openModal, onModalVisibilityChange } from '@/lib/modal'
import sonaIcon from '../../assets/Champie_Sona_profileicon.png'
import { getUpdateState, onUpdateStateChange } from '@/lib/update-checker'

// ==================== Sona 入口按钮 ====================

const BUTTON_ID = 'sona-entry-btn'
const BUTTON_HIDDEN_CLASS = 'sona-entry-btn--hidden'
let entryButtonVisibilityUnsubscribe: (() => void) | null = null

function applyEntryButtonVisibility(button: HTMLElement, hidden = store.get('hideSonaIcon')) {
  button.classList.toggle(BUTTON_HIDDEN_CLASS, hidden)
  button.setAttribute('aria-hidden', String(hidden))
}

function syncEntryButtonVisibility(hidden = store.get('hideSonaIcon')) {
  const button = document.getElementById(BUTTON_ID)
  if (button) applyEntryButtonVisibility(button, hidden)
}

/**
 * 创建 Sona 入口按钮 DOM 元素
 */
function createEntryButton(): HTMLElement {
  const btn = document.createElement('div')
  btn.id = BUTTON_ID
  btn.className = 'sona-entry-btn'
  applyEntryButtonVisibility(btn)

  btn.innerHTML = `
    <img class="sona-entry-icon" src="${sonaIcon}" alt="Sona" />
    <span class="sona-entry-update-badge" aria-hidden="true">!</span>
  `

  // 防止客户端底层的 mousedown/mouseup 事件穿透
  btn.addEventListener('mousedown', (e) => e.stopPropagation())
  btn.addEventListener('mouseup', (e) => e.stopPropagation())

  btn.addEventListener('click', (e) => {
    e.stopPropagation()
    openModal()
    logger.info('Modal opened')
  })

  // 模态窗口关闭时同步 active 状态
  onModalVisibilityChange((visible) => {
    btn.classList.toggle('sona-entry-btn--active', visible)
  })

  const syncUpdateBadge = () => {
    btn.classList.toggle('sona-entry-btn--has-update', getUpdateState().status === 'available')
  }
  syncUpdateBadge()
  onUpdateStateChange(syncUpdateBadge)

  return btn
}

/**
 * 注入任务：Sona 入口按钮
 * 在 Play 按钮左侧注入，支持自愈（被刷掉后自动补回）
 */
function tryInjectSonaButton(): boolean {
  const existingButton = document.getElementById(BUTTON_ID)
  if (existingButton?.isConnected) {
    applyEntryButtonVisibility(existingButton)
    return true
  }

  const playButtonContainer = document.querySelector('.play-button-container')
  if (!playButtonContainer?.parentElement) return false

  const parent = playButtonContainer.parentElement
  parent.insertBefore(createEntryButton(), playButtonContainer)

  logger.info('Entry button injected ✓ (beside play button)')
  return true
}


export function registerAllInjections() {
  injector.register(tryInjectSonaButton)
  if (!entryButtonVisibilityUnsubscribe) {
    entryButtonVisibilityUnsubscribe = store.onChange('hideSonaIcon', syncEntryButtonVisibility)
  }
  injector.start()
}

export function unregisterAllInjections() {
  entryButtonVisibilityUnsubscribe?.()
  entryButtonVisibilityUnsubscribe = null
  injector.unregister(tryInjectSonaButton)
}
