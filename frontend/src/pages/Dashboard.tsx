import StatCard from '../components/StatCard'
import RecentActivity from '../components/RecentActivity'
import SearchBar from '../components/SearchBar'

import { useEffect, useState } from 'react'
import type { HistoryFilter, HistoryRecord } from '../types/history'

import { getHistory } from '../services/historyService'
import { searchFiles } from '../services/searchService'
import NeedsReviewPanel from '../components/NeedsReviewPanel'


interface DashboardProps {
  onViewAllSearch: (query: string) => void
  onViewAllHistory: (filter?: HistoryFilter) => void
  onOpenReview: () => void
}

function Dashboard({ 
  onViewAllSearch, 
  onViewAllHistory,
  onOpenReview,
}: DashboardProps) {

  const [records, setRecords] = useState<HistoryRecord[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<HistoryRecord[]>([])
  const [showReviewPanel, setShowReviewPanel] = useState(false)

  useEffect(() => {
    const loadDashboardData = async () => {
      const history = await getHistory()

      setRecords(history)
    }

    loadDashboardData()
  }, [])

  const today = new Date().toISOString().slice(0, 10)

  const organizedToday = records.filter(
    (record) =>
      record.undone === 0 &&
      record.timestamp.startsWith(today),
  ).length

  useEffect(() => {
  const runSearch = async () => {
    const normalizedQuery = searchQuery.trim()

    if (!normalizedQuery) {
      setSearchResults([])
      return
    }

    const results = await searchFiles(normalizedQuery)
    setSearchResults(results.slice(0, 5))
  }

  runSearch()
}, [searchQuery])


  return (
    <div className="mx-auto max-w-6xl pb-10">
      {/* Page Header */}
      <header className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-fs-text-primary">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-fs-text-secondary">
            FileSense is actively organizing your files.
          </p>
        </div>
      </header>

      <SearchBar
        onViewAll={onViewAllSearch}
        onQueryChange={setSearchQuery}
        results={searchResults}
      />

      {/* Statistics */}
      <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
      <StatCard
        label="Organized Today"
        value={organizedToday}
        description="Files organized today"
        onClick={() => onViewAllHistory({type: 'today'})}
      />

      <StatCard
        label="Categories"
        value={Object.keys({
          Finance: 'Finance',
          School: 'School',
          Programming: 'Programming',
          Personal: 'Personal',
          Forms: 'Forms',
          Installer: 'Installer',
        }).length}
        description="Organization folders"
      />

      <StatCard
        label="Needs Review"
        value={3}
        description="Files requiring attention"
        onClick={onOpenReview}
      />
    </section>

      {/* Recent Activity */}
      <div className="mt-10">
      <RecentActivity
        records={records}
        onViewAll={() => onViewAllHistory()}
      />
        </div>

      <NeedsReviewPanel
        open={showReviewPanel}
        onClose={() => setShowReviewPanel(false)}
      />
    </div>
  )
}

export default Dashboard