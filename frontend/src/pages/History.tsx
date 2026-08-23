import { useState } from 'react'

import HistoryItem from '../components/HistoryItem'
import type { HistoryRecord } from '../types/history'
import { mockHistory } from '../data/mockHistory'


function History() {
  const [history, setHistory] =
    useState<HistoryRecord[]>(mockHistory)

  const handleUndo = (id: number) => {
    setHistory((currentHistory) =>
      currentHistory.map((record) =>
        record.id === id
          ? { ...record, undone: 1 }
          : record,
      ),
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
        {history.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-fs-border bg-fs-surface">
            {history.map((record) => (
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