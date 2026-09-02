export interface HistoryRecord {
  id: number
  original_path: string
  new_path: string
  category: string | null
  confidence: number | null
  timestamp: string
  undone: number
}

export type HistoryFilter =
  | { type: 'all' }
  | { type: 'today' }
  | { type: 'week' }
  | { type: 'month' }
  | { type: 'category'; value: string }