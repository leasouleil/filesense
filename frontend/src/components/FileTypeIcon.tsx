import {
  FileText,
  FileSpreadsheet,
  File,
} from 'lucide-react'

interface FileTypeIconProps {
  extension: string
}

function FileTypeIcon({ extension }: FileTypeIconProps) {
  const normalizedExtension = extension.toLowerCase()

  if (normalizedExtension === 'pdf') {
    return <FileText size={20} />
  }

  if (
    normalizedExtension === 'xlsx' ||
    normalizedExtension === 'xls' ||
    normalizedExtension === 'csv'
  ) {
    return <FileSpreadsheet size={20} />
  }

  if (
    normalizedExtension === 'docx' ||
    normalizedExtension === 'doc' ||
    normalizedExtension === 'txt'
  ) {
    return <FileText size={20} />
  }

  return <File size={20} />
}

export default FileTypeIcon