import { useState } from 'react'

import SearchBar from '../components/SearchBar'
import SearchResult from '../components/SearchResult'

interface SearchProps {
  query: string
}

const mockResults = [
  {
    id: 1,
    fileName: 'invoice_august.pdf',
    category: 'Finance',
    fileType: 'PDF',
    path: 'Finance/invoice_august.pdf',
  },
  {
    id: 2,
    fileName: 'invoice_july.pdf',
    category: 'Finance',
    fileType: 'PDF',
    path: 'Finance/invoice_july.pdf',
  },
  {
    id: 3,
    fileName: 'ABC_invoice.pdf',
    category: 'Finance',
    fileType: 'PDF',
    path: 'Finance/ABC_invoice.pdf',
  },
]

function Search({ query }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState(query)

  const filteredResults =
    searchQuery.trim().length > 0
      ? mockResults.filter((file) =>
          file.fileName
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : []

  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <h1 className="text-2xl font-semibold text-fs-text-primary">
          Search
        </h1>

        <p className="mt-1 text-sm text-fs-text-secondary">
          Find files organized by FileSense.
        </p>
      </header>

      <SearchBar
        initialQuery={searchQuery}
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
                fileName={file.fileName}
                category={file.category}
                fileType={file.fileType}
                path={file.path}
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