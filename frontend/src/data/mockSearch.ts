import type { SearchResult } from '../types/search'

export const mockResults: SearchResult[] = [
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