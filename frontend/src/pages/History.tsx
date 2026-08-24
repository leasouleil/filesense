import { useEffect, useState } from 'react'

import HistoryItem from '../components/HistoryItem'
import type { HistoryRecord } from '../types/history'
import {
  getHistory,
  undoHistory,
} from '../services/historyService'

function History() {
  const [records, setRecords] = useState<HistoryRecord[]>([])
  const [loading, setLoading] = useState(true)

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

      <div className="mt-8">
        {records.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-fs-border bg-fs-surface">
            {records.map((record) => (
              <HistoryItem
                key={record.id}
                record={record}
                onUndo={handleUndo}
              />
            ))}
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