import type { HistoryRecord } from '../types/history'
import { mockHistory } from '../data/mockHistory'

export async function getHistory(
  limit = 50,
): Promise<HistoryRecord[]> {
  return mockHistory.slice(0, limit)
}

export async function searchHistory(
  query: string,
): Promise<HistoryRecord[]> {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return []
  }

  return mockHistory.filter((record) => {
    return (
      record.original_path
        .toLowerCase()
        .includes(normalizedQuery) ||
      record.new_path
        .toLowerCase()
        .includes(normalizedQuery)
    )
  })
}

export async function getHistoryRecord(
  id: number,
): Promise<HistoryRecord | null> {
  return (
    mockHistory.find((record) => record.id === id) ?? null
  )
}

export async function undoHistory(
  id: number,
): Promise<boolean> {
  const record = mockHistory.find(
    (item) => item.id === id,
  )

  if (!record || record.undone === 1) {
    return false
  }

  record.undone = 1

  return true
}