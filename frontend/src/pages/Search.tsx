import { useEffect, useState } from 'react'

import SearchBar from '../components/SearchBar'
import SearchResult from '../components/SearchResult'
import type { SearchResult as SearchResultType } from '../types/search'
import { searchFiles } from '../services/searchService'

interface SearchProps {
  query: string
}

function Search({ query }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<SearchResultType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  useEffect(() => {
    const runSearch = async () => {
      const normalizedQuery = searchQuery.trim()

      if (!normalizedQuery) {
        setResults([])
        return
      }

      setLoading(true)

      const searchResults = await searchFiles(normalizedQuery)

      setResults(searchResults)
      setLoading(false)
    }

    runSearch()
  }, [searchQuery])

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
        showDropdown={false}
        onQueryChange={(newQuery) =>{
          setSearchQuery(newQuery)
        }}
        onViewAll={(newQuery) => {
          setSearchQuery(newQuery)
        }}
      />

      <div className="mt-8">
        {searchQuery.trim().length > 0 ? (
          <p className="text-sm text-fs-text-secondary">
            {loading
              ? 'Searching...'
              : `${results.length} ${
                  results.length === 1 ? 'result' : 'results'
                } for "${searchQuery}"`}
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
          ) : loading ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-fs-text-secondary">
                Searching...
              </p>
            </div>
          ) : results.length > 0 ? (
            results.map((file) => (
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