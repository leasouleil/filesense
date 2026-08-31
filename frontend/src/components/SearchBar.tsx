import { useState } from 'react'
import type { HistoryRecord } from '../types/history'

import {
  getFileName,
  getFileExtension,
} from '../utils/fileUtils'

import {
  Search,
} from 'lucide-react'

import FileTypeIcon from './FileTypeIcon'

interface SearchBarProps {
  onViewAll?: (query: string) => void
  initialQuery?: string
  showDropdown?: boolean
  onQueryChange?: (query: string) => void
  results?: HistoryRecord[]
}

function SearchBar({
  onViewAll,
  initialQuery = '',
  showDropdown = true,
  onQueryChange,
  results = [],
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)

  const showResults =
    showDropdown && query.trim().length > 0

  return (
    <div className="relative mt-6">
      {/* Search input */}
      <div className="flex items-center rounded-xl border border-fs-border bg-fs-surface px-4 py-3">
        <Search
          size={18}
          className="mr-3 shrink-0 text-fs-text-muted"
        />

        <input
          type="text"
          value={query}
          onChange={(event) => {
            const value = event.target.value

            setQuery(value)
            onQueryChange?.(value)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && query.trim()) {
              onViewAll?.(query.trim())
            }
          }}
          placeholder="Search your files by name or path..."
          className="w-full bg-transparent text-sm text-fs-text-primary outline-none placeholder:text-fs-text-muted"
        />
      </div>

      {/* Results dropdown */}
      {showResults && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-xl border border-fs-border bg-fs-surface shadow-lg">
          {results.length > 0 ? (
            <>
              {results.map((file) => {
                const fileName = getFileName(file.new_path)
                const fileType = getFileExtension(file.new_path)

                return (
                  <button
                    key={file.id}
                    type="button"
                    className="w-full border-b border-fs-border px-4 py-3 text-left last:border-b-0 hover:bg-fs-background"
                  >
                    <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-fs-background text-fs-text-secondary">
                      <FileTypeIcon extension={fileType} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-fs-text-primary">
                        {fileName}
                      </p>

                      <p className="mt-1 text-xs text-fs-text-secondary">
                        {file.category ?? 'Uncategorized'}
                        {fileType && ` · ${fileType}`}
                      </p>
                    </div>
                  </div>

                    <p className="mt-1 text-xs text-fs-text-secondary">
                      {file.category ?? 'Uncategorized'}
                      {fileType && ` · ${fileType}`}
                    </p>

                    <p className="mt-1 truncate text-xs text-fs-text-muted">
                      {file.new_path}
                    </p>
                  </button>
                )
              })}

              <button
                type="button"
                onClick={() => onViewAll?.(query.trim())}
                className="w-full px-4 py-3 text-center text-sm text-fs-text-secondary hover:bg-fs-background hover:text-fs-text-primary"
              >
                View all results →
              </button>
            </>
          ) : (
            <div className="px-4 py-5 text-center text-sm text-fs-text-secondary">
              No files found.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar