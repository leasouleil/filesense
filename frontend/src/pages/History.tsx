import { useEffect, useMemo, useState } from 'react'

import HistoryItem from '../components/HistoryItem'
import SearchBar from '../components/SearchBar'

import type { HistoryRecord } from '../types/history'

import {
  getHistory,
  undoHistory,
} from '../services/historyService'

interface HistoryProps{
  initialQuery?: string
}

function History({initialQuery=''}: HistoryProps) {
  const [records, setRecords] = useState<HistoryRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  useEffect(() => {
    const loadHistory = async () => {
      const history = await getHistory()
      setRecords(history)
      setLoading(false)
    }

    loadHistory()
  }, [])

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

    if (!query) {
      return records
    }

    return records.filter((record) => {
      return (
        record.original_path.toLowerCase().includes(query) ||
        record.new_path.toLowerCase().includes(query) ||
        record.category?.toLowerCase().includes(query) ||
        record.new_path
          .split(/[\\/]/)
          .pop()
          ?.toLowerCase()
          .includes(query)
      )
    })
  }, [records, searchQuery])

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

      {/* Results */}
      <div className="mt-8">
        {filteredRecords.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-fs-border bg-fs-surface">
            {filteredRecords.map((record) => (
              <HistoryItem
                key={record.id}
                record={record}
                onUndo={handleUndo}
              />
            ))}
          </div>
        ) : searchQuery.trim() ? (
          <div className="rounded-xl border border-fs-border bg-fs-surface px-5 py-12 text-center">
            <p className="text-sm text-fs-text-primary">
              No matching history found.
            </p>

            <p className="mt-1 text-xs text-fs-text-muted">
              Try searching by file name, path, or category.
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