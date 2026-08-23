import type { HistoryRecord } from '../types/history'

import {
  getFileExtension,
  getFileName,
  getDisplayPath,
} from '../utils/fileUtils'

interface HistoryItemProps {
  record: HistoryRecord
  onUndo: (id: number) => void
}

function HistoryItem({ record, onUndo }: HistoryItemProps) {
  const fileName = getFileName(record.new_path)
  const fileType = getFileExtension(record.new_path)

  const isUndone = record.undone === 1

  return (
    <div className="border-b border-fs-border px-5 py-4 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fs-background text-sm text-fs-text-secondary">
            📄
          </div>

          <div className="min-w-0">
            <p
              className={`truncate text-sm font-medium ${
                isUndone
                  ? 'text-fs-text-muted line-through'
                  : 'text-fs-text-primary'
              }`}
            >
              {fileName}
            </p>

            <p className="mt-1 truncate text-xs text-fs-text-secondary">
              {getDisplayPath(record.original_path)}
              {' → '}
              {getDisplayPath(record.new_path)}
            </p>

            <div className="mt-2 flex items-center gap-2">
              {record.category && (
                <span className="rounded-md bg-fs-background px-2 py-1 text-xs text-fs-text-secondary">
                  {record.category}
                </span>
              )}

              {fileType && (
                <span className="rounded-md bg-fs-background px-2 py-1 text-xs text-fs-text-secondary">
                  {fileType}
                </span>
              )}

              {isUndone && (
                <span className="rounded-md bg-fs-background px-2 py-1 text-xs text-fs-text-muted">
                  ↩ Undone
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className="text-xs text-fs-text-muted">
            {record.timestamp}
          </span>

          {!isUndone && (
            <button
              type="button"
              onClick={() => onUndo(record.id)}
              className="rounded-md px-3 py-1.5 text-xs text-fs-text-secondary hover:bg-fs-background hover:text-fs-text-primary"
            >
              Undo
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default HistoryItem