import type { SearchResult as SearchResultType } from '../types/search'
import {
  getFileExtension,
  getFileName,
  getDisplayPath,
} from '../utils/fileUtils'

interface SearchResultProps {
  result: SearchResultType
}

function SearchResult({ result }: SearchResultProps) {
  const fileName = getFileName(result.new_path)
  const fileType = getFileExtension(result.new_path)

  return (
    <button
      type="button"
      className="w-full border-b border-fs-border px-5 py-4 text-left last:border-b-0 hover:bg-fs-background"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fs-background text-sm text-fs-text-secondary">
            📄
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-fs-text-primary">
              {fileName}
            </p>

            <p className="mt-1 truncate text-xs text-fs-text-secondary">
              {getDisplayPath(result.new_path)}
            </p>

            {result.original_path !== result.new_path && (
              <p className="mt-1 truncate text-xs text-fs-text-muted">
                Originally: {getDisplayPath(result.original_path)}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {fileType && (
            <span className="rounded-md bg-fs-background px-2 py-1 text-xs text-fs-text-secondary">
              {fileType}
            </span>
          )}

          {result.category && (
            <span className="rounded-md bg-fs-background px-2 py-1 text-xs text-fs-text-secondary">
              {result.category}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

export default SearchResult