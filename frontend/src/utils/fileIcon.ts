import {
  FileText,
  FileSpreadsheet,
  FileCode,
  FileImage,
  FileArchive,
  File,
} from 'lucide-react'

export function getFileIcon(extension: string) {
  switch (extension.toLowerCase()) {
    case 'pdf':
      return FileText

    case 'doc':
    case 'docx':
      return FileText

    case 'xls':
    case 'xlsx':
    case 'csv':
      return FileSpreadsheet

    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
    case 'py':
    case 'html':
    case 'css':
      return FileCode

    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'webp':
      return FileImage

    case 'zip':
    case 'rar':
    case '7z':
      return FileArchive

    default:
      return File
  }
}