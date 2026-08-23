import type { HistoryRecord } from '../types/history'
import { getFileName } from '../utils/fileUtils'

interface RecentActivityProps {
  records: HistoryRecord[]
  onViewAll: () => void
}

function RecentActivity({
  records,
  onViewAll,
}: RecentActivityProps) {
  const recentRecords = records.slice(0, 5)

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-fs-text-primary">
          Recent Activity
        </h2>

        {records.length > 0 && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs text-fs-text-secondary hover:text-fs-text-primary"
          >
            View all
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-fs-border bg-fs-surface divide-y divide-fs-border">
        {recentRecords.length > 0 ? (
          recentRecords.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between gap-6 px-6 py-5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-fs-background text-sm">
                  📄
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-fs-text-primary">
                    {getFileName(record.new_path)}
                  </p>

                  <p className="mt-1 truncate text-xs text-fs-text-secondary">
                    {record.category ?? 'Uncategorized'}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-xs text-fs-text-muted">
                {record.undone === 1 ? 'Undone' : record.timestamp}
              </div>
            </div>
          ))
        ) : (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-fs-text-secondary">
              No recent activity.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default RecentActivity