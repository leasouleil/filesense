import type { HistoryRecord } from '../types/history'

export const mockHistory: HistoryRecord[] = [
  {
    id: 1,
    original_path:
      'C:/Users/User/Downloads/invoice_august.pdf',
    new_path:
      'C:/Users/User/FileSense/Finance/invoice_august.pdf',
    category: 'Finance',
    confidence: null,
    timestamp: '2026-08-23 09:42:00',
    undone: 0,
  },
  {
    id: 2,
    original_path:
      'C:/Users/User/Downloads/programming_assignment.docx',
    new_path:
      'C:/Users/User/FileSense/School/programming_assignment.docx',
    category: 'School',
    confidence: null,
    timestamp: '2026-08-23 08:15:00',
    undone: 0,
  },
  {
    id: 3,
    original_path:
      'C:/Users/User/Downloads/setup.exe',
    new_path:
      'C:/Users/User/FileSense/Installer/setup.exe',
    category: 'Installer',
    confidence: null,
    timestamp: '2026-08-22 18:30:00',
    undone: 0,
  },
  {
    id: 4,
    original_path:
      'C:/Users/User/Downloads/project_notes.pdf',
    new_path:
      'C:/Users/User/FileSense/Programming/project_notes.pdf',
    category: 'Programming',
    confidence: null,
    timestamp: '2026-08-22 14:20:00',
    undone: 1,
  },
  {
    id: 5,
    original_path:
      'C:/Users/User/Downloads/personal_document.docx',
    new_path:
      'C:/Users/User/FileSense/Personal/personal_document.docx',
    category: 'Personal',
    confidence: null,
    timestamp: '2026-08-21 11:05:00',
    undone: 0,
  },
]