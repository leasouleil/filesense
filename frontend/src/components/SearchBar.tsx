import { useState } from 'react'

interface SearchResult {
  id: number
  fileName: string
  category: string
  type: string
}

const mockResults: SearchResult[] = [
  {
    id: 1,
    fileName: 'invoice_august.pdf',
    category: 'Finance',
    type: 'PDF',
  },
  {
    id: 2,
    fileName: 'invoice_july.pdf',
    category: 'Finance',
    type: 'PDF',
  },
  {
    id: 3,
    fileName: 'ABC_invoice.pdf',
    category: 'Finance',
    type: 'PDF',
  },
]

interface SearchBarProps {
  onViewAll: (query: string) => void
  initialQuery?: string
  showDropdown?: boolean
  onQueryChange?: (query: string) => void
}

function SearchBar({
  onViewAll,
  initialQuery = '',
  showDropdown = true,
  onQueryChange,
}: SearchBarProps) {

  const [query, setQuery] = useState(initialQuery)

  const filteredResults = mockResults.filter((file) =>
    file.fileName.toLowerCase().includes(query.toLowerCase())
  )

  const showResults =
  showDropdown && query.trim().length > 0

  return (
    <div className="relative mt-6">
      {/* Search input */}
      <div className="flex items-center rounded-xl border border-fs-border bg-fs-surface px-4 py-3">
        <span className="mr-3 text-fs-text-muted">
          🔍
        </span>

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
                onViewAll(query.trim())
                }
            }}
            placeholder="Search your files by name or path..."
            className="w-full bg-transparent text-sm text-fs-text-primary outline-none placeholder:text-fs-text-muted"
            />
      </div>

      {/* Results dropdown */}
      {showResults && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-xl border border-fs-border bg-fs-surface shadow-lg">
          {filteredResults.length > 0 ? (
            <>
              {filteredResults.map((file) => (
                <button
                  key={file.id}
                  className="w-full border-b border-fs-border px-4 py-3 text-left last:border-b-0 hover:bg-fs-background"
                >
                  <p className="text-sm font-medium text-fs-text-primary">
                    {file.fileName}
                  </p>

                  <p className="mt-1 text-xs text-fs-text-secondary">
                    {file.category} · {file.type}
                  </p>
                </button>
              ))}

              <button
                onClick={() => onViewAll(query.trim())}
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