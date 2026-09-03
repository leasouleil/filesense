import { useEffect, useMemo, useState } from 'react'

import HistoryItem from '../components/HistoryItem'
import HistoryFilters from '../components/HistoryFilters'
import SearchBar from '../components/SearchBar'

import type { HistoryFilter, HistoryRecord } from '../types/history'

import {
  getHistory,
  undoHistory,
} from '../services/historyService'

interface HistoryProps{
  initialQuery?: string
  initialFilter?: HistoryFilter
  categories: string[]
}

function getDateKey(timestamp: string) {
  return timestamp.split(' ')[0]
}

function formatHistoryDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`)
  const today = new Date()

  const todayString = getTodayKey()

  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const yesterdayString = [
  yesterday.getFullYear(),
  String(yesterday.getMonth() + 1).padStart(2, '0'),
  String(yesterday.getDate()).padStart(2, '0'),
].join('-')

  if (dateString === todayString) {
    return 'Today'
  }

  if (dateString === yesterdayString) {
    return 'Yesterday'
  }

  return date.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function getTodayKey() {
  const today = new Date()

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')
}

function isWithinPastDays(timestamp: string, days: number) {
  const recordDate = new Date(timestamp.replace(' ', 'T'))
  const now = new Date()

  const difference = now.getTime() - recordDate.getTime()
  const millisecondsPerDay = 1000 * 60 * 60 * 24

  return difference >= 0 && difference <= days * millisecondsPerDay
}

function History({initialQuery='', initialFilter, categories,}: HistoryProps) {
  const [records, setRecords] = useState<HistoryRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  const [activeFilter, setActiveFilter] = useState<HistoryFilter>(
    initialFilter ?? { type: 'all' },
  )

  useEffect(() => {
    const loadHistory = async () => {
      const history = await getHistory()
      setRecords(history)
      setLoading(false)
    }

    loadHistory()
  }, [])

  useEffect(() => {
  setActiveFilter(initialFilter ?? { type: 'all' })
}, [initialFilter])

  const handleUndo = async (id: number) => {
    const success = await undoHistory(id)

    if (!success) {
      return
    }

    setRecords((current) =>
      current.map((record) =>
        record.id === id
          ? { ...record, undone: 1 }
          : record,
      ),
    )
  }

  const filteredRecords = useMemo(() => {
  const query = searchQuery.trim().toLowerCase()
  const today = getTodayKey()

  return records.filter((record) => {
    const recordDate = getDateKey(record.timestamp)

    const matchesFilter = (() => {
      switch (activeFilter.type) {
        case 'all':
          return true

        case 'today':
          return recordDate === today

        case 'week':
          return isWithinPastDays(record.timestamp, 7)

        case 'month':
          return isWithinPastDays(record.timestamp, 30)

        case 'category':
          return (
            record.category?.toLowerCase() ===
            activeFilter.value.toLowerCase()
          )

        default:
          return true
      }
    })()

    const matchesSearch =
      !query ||
      record.original_path.toLowerCase().includes(query) ||
      record.new_path.toLowerCase().includes(query) ||
      record.category?.toLowerCase().includes(query) ||
      record.new_path
        .split(/[\\/]/)
        .pop()
        ?.toLowerCase()
        .includes(query)

    return matchesFilter && matchesSearch
  })
}, [records, searchQuery, activeFilter])

  const groupedRecords = useMemo(() => {
  return filteredRecords.reduce(
    (groups, record) => {
      const date = getDateKey(record.timestamp)

      if (!groups[date]) {
        groups[date] = []
      }

      groups[date].push(record)

      return groups
    },
    {} as Record<string, HistoryRecord[]>,
  )
}, [filteredRecords])

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl">
        <header>
          <h1 className="text-2xl font-semibold text-fs-text-primary">
            History
          </h1>

          <p className="mt-1 text-sm text-fs-text-secondary">
            View files organized by FileSense.
          </p>
        </header>

        <div className="mt-8 rounded-xl border border-fs-border bg-fs-surface px-5 py-12 text-center">
          <p className="text-sm text-fs-text-secondary">
            Loading history...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <h1 className="text-2xl font-semibold text-fs-text-primary">
          History
        </h1>

        <p className="mt-1 text-sm text-fs-text-secondary">
          View files organized by FileSense.
        </p>
      </header>

      {/* Search */}
      <SearchBar
        initialQuery={initialQuery}
        showDropdown={false}
        onQueryChange={setSearchQuery}
      />

      <HistoryFilters
        activeFilter={activeFilter}
        categories={categories}
        onFilterChange={setActiveFilter}
      />

      {/* Results */}
      <div className="mt-8">
        {filteredRecords.length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedRecords).map(
              ([date, dateRecords]) => (
                <section key={date}>
                  {/* Date heading */}
                  <div className="mb-3">
                    <h2 className="text-sm font-semibold text-fs-text-primary">
                      {formatHistoryDate(date)}
                    </h2>

                    <p className="mt-1 text-xs text-fs-text-muted">
                      {dateRecords.length}{' '}
                      {dateRecords.length === 1
                        ? 'file'
                        : 'files'}
                    </p>
                  </div>

                  {/* Records for this date */}
                  <div className="overflow-hidden rounded-xl border border-fs-border bg-fs-surface">
                    {dateRecords.map((record) => (
                      <HistoryItem
                        key={record.id}
                        record={record}
                        onUndo={handleUndo}
                      />
                    ))}
                  </div>
                </section>
              ),
            )}
          </div>
        ) : searchQuery.trim() ? (
          <div className="rounded-xl border border-fs-border bg-fs-surface px-5 py-12 text-center">
            <p className="text-sm text-fs-text-primary">
              No matching history found.
            </p>

            <p className="mt-1 text-xs text-fs-text-muted">
              Try adjusting your search or filter.
            </p>
          </div>
        ) : activeFilter.type !== 'all' ? (
          <div className="rounded-xl border border-fs-border bg-fs-surface px-5 py-12 text-center">
            <p className="text-sm text-fs-text-primary">
              No files match this filter.
            </p>

            <p className="mt-1 text-xs text-fs-text-muted">
              Try selecting a different filter.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-fs-border bg-fs-surface px-5 py-12 text-center">
            <p className="text-sm text-fs-text-primary">
              No history yet.
            </p>

            <p className="mt-1 text-xs text-fs-text-muted">
              Files organized by FileSense will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default History