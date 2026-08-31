import StatCard from '../components/StatCard'
import RecentActivity from '../components/RecentActivity'
import SearchBar from '../components/SearchBar'

import { useEffect, useState } from 'react'
import type { HistoryRecord } from '../types/history'

import { getHistory } from '../services/historyService'
import { searchFiles } from '../services/searchService'



interface DashboardProps {
  onViewAllSearch: (query: string) => void
  onViewAllHistory: () => void
}

function Dashboard({ 
  onViewAllSearch, 
  onViewAllHistory
}: DashboardProps) {

  const [records, setRecords] = useState<HistoryRecord[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<HistoryRecord[]>([])

  useEffect(() => {
    const loadDashboardData = async () => {
      const history = await getHistory()

      setRecords(history)
    }

    loadDashboardData()
  }, [])

    const totalOrganized = records.filter(
    (record) => record.undone === 0,
  ).length

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

        {/* Monitoring Status */}
        <div className="rounded-lg border border-fs-border bg-fs-surface px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <p className="text-xs font-medium text-fs-text-secondary">
              Monitoring Downloads
            </p>
          </div>
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
          label="Total Organized"
          value={totalOrganized}
          description="Files organized"
        />

        <StatCard
          label="Organized Today"
          value={organizedToday}
          description="Files organized today"
        />

        <StatCard
          label="Needs Review"
          value={0}
          description="Files waiting for review"
        />
      </section>

      {/* Recent Activity */}
      <div className="mt-10">
      <RecentActivity
        records={records}
        onViewAll={onViewAllHistory}
      />
        </div>
    </div>
  )
}

export default Dashboard