import type { HistoryRecord } from '../types/history'

import {
  getFileExtension,
  getFileName,
} from '../utils/fileUtils'

interface HistoryItemProps {
  record: HistoryRecord
  onUndo: (id: number) => void
  onOpenFolder?: (path: string) => void
}

function HistoryItem({
  record,
  onUndo,
  onOpenFolder,
}: HistoryItemProps) {
  const fileName = getFileName(record.new_path)
  const fileType = getFileExtension(record.new_path)

  const isUndone = record.undone === 1

  const formattedDate = new Date(
    record.timestamp.replace(' ', 'T'),
  ).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <div
      className={`border-b border-fs-border px-5 py-5 last:border-b-0 ${
        isUndone ? 'opacity-60' : ''
      }`}
    >
      {/* Summary row */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-2">
          <p
            className={`min-w-0 truncate text-sm font-medium ${
              isUndone
                ? 'text-fs-text-muted line-through'
                : 'text-fs-text-primary'
            }`}
          >
            {fileName}
          </p>

          {fileType && (
            <span className="shrink-0 rounded-md bg-fs-background px-2 py-1 text-xs text-fs-text-secondary">
              {fileType}
            </span>
          )}

          {record.category && (
            <span className="shrink-0 rounded-md bg-fs-accent/10 px-2 py-1 text-xs font-medium text-fs-accent">
              {record.category}
            </span>
          )}

          {isUndone && (
            <span className="shrink-0 rounded-md bg-fs-background px-2 py-1 text-xs text-fs-text-muted">
              ↩ Undone
            </span>
          )}
        </div>

        <span className="shrink-0 text-xs text-fs-text-muted">
          {formattedDate}
        </span>
      </div>

      {/* File movement + action */}
      <div className="mt-5 flex items-end justify-between gap-6">
        {/* Paths */}
        <div className="min-w-0 flex-1 space-y-3">
          {/* From */}
          <div className="flex min-w-0 items-start gap-3">
            <span className="w-8 shrink-0 pt-0.5 text-xs font-medium text-fs-text-muted">
              From
            </span>

            <span
              className="min-w-0 truncate text-xs leading-relaxed text-fs-text-secondary"
              title={record.original_path}
            >
              {record.original_path}
            </span>
          </div>

          {/* To */}
          <div className="flex min-w-0 items-start gap-3">
            <span className="w-8 shrink-0 pt-0.5 text-xs font-medium text-fs-text-muted">
              To
            </span>

            <button
              type="button"
              onClick={() => {
                const lastSeparator = Math.max(
                  record.new_path.lastIndexOf('/'),
                  record.new_path.lastIndexOf('\\'),
                )

                const destinationFolder =
                  lastSeparator >= 0
                    ? record.new_path.substring(0, lastSeparator)
                    : record.new_path

                onOpenFolder?.(destinationFolder)
              }}
              disabled={!onOpenFolder}
              title={record.new_path}
              className="min-w-0 truncate text-left text-xs leading-relaxed text-fs-text-secondary transition hover:text-fs-accent disabled:cursor-default disabled:hover:text-fs-text-secondary"
            >
              {record.new_path}
            </button>
          </div>
        </div>

        {/* Undo */}
        {!isUndone && (
          <button
            type="button"
            onClick={() => onUndo(record.id)}
            className="flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-fs-text-secondary transition hover:bg-fs-background hover:text-fs-text-primary"
          >
            <span>↩</span>
            <span>Undo</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default HistoryItem