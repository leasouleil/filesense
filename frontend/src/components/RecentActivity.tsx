import type { HistoryRecord } from '../types/history'
import { getFileName, getFileExtension } from '../utils/fileUtils'

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
      {/* Section header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold text-fs-text-primary">
            Recent Activity
          </h2>

          <p className="mt-1 text-xs text-fs-text-muted">
            Your latest organized files.
          </p>
        </div>

        {records.length > 0 && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-sm font-medium text-fs-text-secondary transition hover:text-fs-accent"
          >
            View all →
          </button>
        )}
      </div>

      {/* Activity records */}
      <div className="mt-5 overflow-hidden rounded-xl border border-fs-border bg-fs-surface divide-y divide-fs-border">
        {recentRecords.length > 0 ? (
          recentRecords.map((record) => {
            const fileName = getFileName(record.new_path)
            const fileType = getFileExtension(record.new_path)

            return (
              <div
                key={record.id}
                className="flex items-center justify-between gap-6 px-6 py-4 transition hover:bg-fs-background/50"
              >
                {/* File information */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-fs-background text-sm">
                    📄
                  </div>

                  <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2">
                      <p className="truncate text-sm font-medium text-fs-text-primary">
                        {fileName}
                      </p>

                      {fileType && (
                        <span className="shrink-0 rounded-md bg-fs-background px-2 py-0.5 text-[10px] text-fs-text-muted">
                          {fileType}
                        </span>
                      )}
                    </div>

                    <p className="mt-1 truncate text-xs text-fs-text-secondary">
                      {record.category ?? 'Uncategorized'}
                    </p>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="shrink-0 text-right text-xs text-fs-text-muted">
                  {record.undone === 1 ? (
                    <span>Undone</span>
                  ) : (
                    <span>{record.timestamp}</span>
                  )}
                </div>
              </div>
            )
          })
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