import type { HistoryRecord } from '../types/history'
import { apiRequest } from './api'

export async function getHistory(
  limit = 50,
): Promise<HistoryRecord[]> {
  return apiRequest<HistoryRecord[]>(
    `/api/history?limit=${limit}`,
  )
}

export async function searchHistory(
  query: string,
): Promise<HistoryRecord[]> {
  const normalizedQuery = query.trim()

  if (!normalizedQuery) {
    return []
  }

  return apiRequest<HistoryRecord[]>(
    `/api/history/search?query=${encodeURIComponent(normalizedQuery)}`,
  )
}

export async function getHistoryRecord(
  id: number,
): Promise<HistoryRecord | null> {
  try {
    return await apiRequest<HistoryRecord>(
      `/api/history/${id}`,
    )
  } catch {
    return null
  }
}

export async function undoHistory(
  id: number,
): Promise<boolean> {
  try {
    await apiRequest(
      `/api/history/${id}/undo`,
      {
        method: 'POST',
      },
    )

    return true
  } catch {
    return false
  }
}