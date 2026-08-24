import { useState } from 'react'

import SearchBar from '../components/SearchBar'
import SearchResult from '../components/SearchResult'
import type { SearchResult as SearchResultType } from '../types/search'

interface SearchProps {
  query: string
}

const mockResults: SearchResultType[] = [
  {
    id: 1,
    original_path: 'C:/Users/User/Downloads/invoice_august.pdf',
    new_path: 'C:/Users/User/FileSense/Finance/invoice_august.pdf',
    category: 'Finance',
    confidence: null,
    timestamp: '2026-08-23 01:20:00',
    undone: 0,
  },
  {
    id: 2,
    original_path: 'C:/Users/User/Downloads/invoice_july.pdf',
    new_path: 'C:/Users/User/FileSense/Finance/invoice_july.pdf',
    category: 'Finance',
    confidence: null,
    timestamp: '2026-08-22 15:40:00',
    undone: 0,
  },
  {
    id: 3,
    original_path: 'C:/Users/User/Downloads/ABC_invoice.pdf',
    new_path: 'C:/Users/User/FileSense/Finance/ABC_invoice.pdf',
    category: 'Finance',
    confidence: null,
    timestamp: '2026-08-21 10:15:00',
    undone: 0,
  },
]

function Search({ query }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState(query)

  const filteredResults =
  searchQuery.trim().length > 0
    ? mockResults.filter((file) => {
        const normalizedQuery = searchQuery.toLowerCase()

        return (
          file.original_path.toLowerCase().includes(normalizedQuery) ||
          file.new_path.toLowerCase().includes(normalizedQuery)
        )
      })
    : []

  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <h1 className="text-2xl font-semibold text-fs-text-primary">
          Search
        </h1>

        <p className="mt-1 text-sm text-fs-text-secondary">
          Search files organized by FileSense.
        </p>
      </header>

      <SearchBar
        initialQuery={searchQuery}
        showDropdown={false}
        onQueryChange={setSearchQuery}
        onViewAll={(newQuery) => {
          setSearchQuery(newQuery)
        }}
      />

      <div className="mt-8">
        {searchQuery.trim().length > 0 ? (
          <p className="text-sm text-fs-text-secondary">
            {filteredResults.length}{' '}
            {filteredResults.length === 1 ? 'result' : 'results'}
            {' '}for "{searchQuery}"
          </p>
        ) : (
          <p className="text-sm text-fs-text-secondary">
            Search for a file to see results.
          </p>
        )}

        <div className="mt-3 overflow-hidden rounded-xl border border-fs-border bg-fs-surface">
          {searchQuery.trim().length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-fs-text-secondary">
                Search for a file to see results.
              </p>
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((file) => (
              <SearchResult
                key={file.id}
                result={file}
              />
            ))
          ) : (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-fs-text-primary">
                No files found.
              </p>

              <p className="mt-1 text-xs text-fs-text-muted">
                Try searching for a different file name.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search