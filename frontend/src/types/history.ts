export interface HistoryRecord {
  id: number
  original_path: string
  new_path: string
  category: string | null
  confidence: number | null
  timestamp: string
  undone: number
}