import { useState } from 'react'

import Sidebar from '../components/Sidebar'
import Dashboard from '../pages/Dashboard'
import History from '../pages/History'
import Settings from '../pages/Settings'
import type { HistoryFilter } from '../types/history'

const initialCategories: Record<string, string> = {
  Finance: 'Finance',
  School: 'School',
  Programming: 'Programming',
  Personal: 'Personal',
  Forms: 'Forms',
  Installer: 'Installer',
}

function AppLayout() {
  const [activePage, setActivePage] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter | undefined>()
  const [categories, setCategories] = useState(initialCategories)

  const renderPage = () => {
    switch (activePage) {
      case 'history':
        return (
          <History
            initialQuery={searchQuery}
            initialFilter={historyFilter}
            categories={Object.keys(categories)}
          />
        )

      case 'settings':
        return (
          <Settings
            categories={categories}
            onCategoriesChange={setCategories}
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
        onNavigate={(page) =>{
          setSearchQuery('')
          setActivePage(page)
          setHistoryFilter(undefined)
        }}
      />

      <main className="ml-52 min-h-screen p-8">
        {renderPage()}
      </main>
    </div>
  )
}

export default AppLayout