import type { SearchResult } from '../types/search'
import { mockHistory } from '../data/mockHistory'

export async function searchFiles(
  query: string,
): Promise<SearchResult[]> {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return []
  }

  return mockHistory
    .filter((record) => {
      return (
        record.original_path
          .toLowerCase()
          .includes(normalizedQuery) ||
        record.new_path
          .toLowerCase()
          .includes(normalizedQuery)
      )
    })
    .map((record) => ({
      id: record.id,
      original_path: record.original_path,
      new_path: record.new_path,
      category: record.category,
      confidence: record.confidence,
      timestamp: record.timestamp,
      undone: record.undone,
    }))
}