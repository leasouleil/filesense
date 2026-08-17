import { useState } from 'react'

import Sidebar from '../components/Sidebar'

import Dashboard from '../pages/Dashboard'
import History from '../pages/History'
import Search from '../pages/Search'
import Settings from '../pages/Settings'

function AppLayout() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'history':
        return <History />

      case 'search':
        return <Search />

      case 'settings':
        return <Settings />

      case 'dashboard':
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-fs-background text-fs-text-primary">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="ml-52 min-h-screen p-8">
        {renderPage()}
      </main>
    </div>
  )
}

export default AppLayout