import { useEffect, useRef, useState } from 'react'

import Sidebar from '../components/Sidebar'
import UnsavedChangesModal from '../components/UnsavedChangesModal'

import Dashboard from '../pages/Dashboard'
import History from '../pages/History'
import Settings, {
  type SettingsHandle,
} from '../pages/Settings'

import type { HistoryFilter } from '../types/history'

import { defaultSettings } from '../config/defaultSettings'
import { getSettings } from '../services/settingsService'
import type { SettingsForm } from '../types/settings'

function AppLayout() {
  const [activePage, setActivePage] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [historyFilter, setHistoryFilter] = useState<
    HistoryFilter | undefined
  >()

  const [settings, setSettings] = useState<SettingsForm>(defaultSettings)
  const [isSettingsLoading, setIsSettingsLoading] = useState(true)
  const [settingsLoadError, setSettingsLoadError] = useState('')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [pendingPage, setPendingPage] = useState<string | null>(null)
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false)
  const [previewTheme, setPreviewTheme] = useState<SettingsForm['theme']>(
  defaultSettings.theme
  )

  useEffect(() => {
  const loadSettings = async () => {
    try {
      setSettingsLoadError('')

      const loadedSettings = await getSettings()

      setSettings(loadedSettings)
      setPreviewTheme(loadedSettings.theme)
    } catch (error) {
      console.error('Failed to load settings:', error)
      setSettingsLoadError('Could not load FileSense settings.')
    } finally {
      setIsSettingsLoading(false)
    }
  }

  loadSettings()
}, [])
  

  useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const applyTheme = () => {
    const isDark =
      previewTheme === 'dark' ||
      (previewTheme === 'system' && mediaQuery.matches)

    document.documentElement.classList.toggle('dark', isDark)
  }

  applyTheme()

  mediaQuery.addEventListener('change', applyTheme)

  return () => {
    mediaQuery.removeEventListener('change', applyTheme)
  }
}, [previewTheme])

  const navigateTo = (page: string) => {
    setSearchQuery('')
    setActivePage(page)
    setHistoryFilter(undefined)
  }

  const handleNavigate = (page: string) => {
    // Already on this page — do nothing
    if (page === activePage) {
      return
    }

    // Leaving Settings with unsaved changes
    if (activePage === 'settings' && hasUnsavedChanges) {
      setPendingPage(page)
      setShowUnsavedWarning(true)
      return
    }

    navigateTo(page)
  }

  const handleCancelNavigation = () => {
  settingsRef.current?.discardChanges()
  setShowUnsavedWarning(false)
  setPendingPage(null)
  }

  const handleApplyChanges = async () => {
  const success = await settingsRef.current?.saveChanges()

  if (!success) {
    return
  }

  setHasUnsavedChanges(false)
  setShowUnsavedWarning(false)

  if (pendingPage) {
    navigateTo(pendingPage)
  }

  setPendingPage(null)
}

  const settingsRef = useRef<SettingsHandle>(null)

  const renderPage = () => {
    switch (activePage) {
      case 'history':
        return (
          <History
            initialQuery={searchQuery}
            initialFilter={historyFilter}
            categories={Object.keys(settings.categories)}
          />
        )

      case 'settings':
        if (isSettingsLoading) {
          return (
            <div className="mx-auto max-w-4xl pb-10">
              <p className="text-sm text-fs-text-secondary">
                Loading settings...
              </p>
            </div>
          )
        }

        if (settingsLoadError) {
          return (
            <div className="mx-auto max-w-4xl pb-10">
              <p className="text-sm text-red-400">
                {settingsLoadError}
              </p>
            </div>
          )
        }

        return (
          <Settings
            ref={settingsRef}
            settings={settings}
            onSettingsChange={setSettings}
            onUnsavedChanges={setHasUnsavedChanges}
            onThemePreview={setPreviewTheme}
          />
        )

      case 'dashboard':
      default:
        return (
          <Dashboard
            onViewAllSearch={(query) => {
              setSearchQuery(query)
              setHistoryFilter(undefined)
              setActivePage('history')
            }}
            onViewAllHistory={(filter) => {
              setSearchQuery('')
              setHistoryFilter(filter)
              setActivePage('history')
            }}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-fs-background text-fs-text-primary">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      <main className="ml-52 min-h-screen p-8">
        {renderPage()}
      </main>

      <UnsavedChangesModal
        open={showUnsavedWarning}
        onCancel={handleCancelNavigation}
        onApply={handleApplyChanges}
      />
    </div>
  )
}

export default AppLayout