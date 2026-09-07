import type { SearchResult } from '../types/search'
import { apiRequest } from './api'

export async function searchFiles(
  query: string,
): Promise<SearchResult[]> {
  const normalizedQuery = query.trim()

  if (!normalizedQuery) {
    return []
  }

  return apiRequest<SearchResult[]>(
    `/api/history/search?query=${encodeURIComponent(normalizedQuery)}`,
  )
}