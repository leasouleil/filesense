import StatCard from '../components/StatCard'
import RecentActivity from '../components/RecentActivity'
import SearchBar from '../components/SearchBar'
import { mockHistory } from '../data/mockHistory'

interface DashboardProps {
  onViewAllSearch: (query: string) => void
  onViewAllHistory: () => void
}

function Dashboard({ 
  onViewAllSearch, 
  onViewAllHistory
}: DashboardProps) {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Page Header */}
      <header>
        <h1 className="text-2xl font-semibold text-fs-text-primary">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-fs-text-secondary">
          Overview of your file organization.
        </p>
      </header>

      <SearchBar
        onViewAll={onViewAllSearch}
      />

      {/* Statistics */}
      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          label="Total Organized"
          value={1284}
          description="Files organized"
        />

        <StatCard
          label="Organized Today"
          value={18}
          description="Files organized today"
        />

        <StatCard
          label="Needs Review"
          value={3}
          description="Files waiting for review"
        />
      </section>

      {/* Recent Activity */}
      <div className="mt-8">
       <RecentActivity
          records={mockHistory}
          onViewAll={onViewAllHistory}
        />
        </div>
    </div>
  )
}

export default Dashboard