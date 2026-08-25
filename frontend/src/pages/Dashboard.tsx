import StatCard from '../components/StatCard'
import RecentActivity from '../components/RecentActivity'
import SearchBar from '../components/SearchBar'
import { useEffect, useState } from 'react'

import type { HistoryRecord } from '../types/history'
import { getHistory } from '../services/historyService'



interface DashboardProps {
  onViewAllSearch: (query: string) => void
  onViewAllHistory: () => void
}

function Dashboard({ 
  onViewAllSearch, 
  onViewAllHistory
}: DashboardProps) {

  const [records, setRecords] = useState<HistoryRecord[]>([])

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


  return (
    <div className="mx-auto max-w-6xl pb-10">
      {/* Page Header */}
      <header>
        <h1 className="text-2xl font-semibold text-fs-text-primary">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-fs-text-secondary">
          Filesense is actively organizing your files.
        </p>
      </header>
        <div className="mt-6 flex items-center justify-between rounded-xl border border-fs-border bg-fs-surface px-5 py-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />

          <p className="text-sm font-medium text-fs-text-primary">
            Monitoring Downloads
          </p>
        </div>

        <p className="mt-1 text-xs text-fs-text-secondary">
          FileSense is watching your Downloads folder for new files.
        </p>
      </div>

      <span className="text-xs font-medium text-emerald-400">
        Active
      </span>
    </div>

      <SearchBar
        onViewAll={onViewAllSearch}
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