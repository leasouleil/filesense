import type { SearchResult } from '../types/search'
import { mockResults } from '../data/mockSearch'

export async function searchFiles(
  query: string,
): Promise<SearchResult[]> {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return []
  }

  return mockResults.filter((file) => {
    return (
      file.original_path
        .toLowerCase()
        .includes(normalizedQuery) ||
      file.new_path
        .toLowerCase()
        .includes(normalizedQuery)
    )
  })
}