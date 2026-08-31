import { useState } from 'react'

import Sidebar from '../components/Sidebar'
import Dashboard from '../pages/Dashboard'
import History from '../pages/History'
import Settings from '../pages/Settings'

function AppLayout() {
  const [activePage, setActivePage] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')

  const renderPage = () => {
    switch (activePage) {
      case 'history':
        return <History initialQuery={searchQuery}/>

      case 'settings':
        return <Settings />

      case 'dashboard':
      default:
        return (
          <Dashboard
            onViewAllSearch={(query) => {
              setSearchQuery(query)
              setActivePage('history')
            }}
            onViewAllHistory={() => {
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
        }}
      />

      <main className="ml-52 min-h-screen p-8">
        {renderPage()}
      </main>
    </div>
  )
}

export default AppLayout