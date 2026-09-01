import {
  getFileTypeIconAsUrl,
  initializeFileTypeIcons,
} from '@fluentui/react-file-type-icons'

initializeFileTypeIcons()

interface FileTypeIconProps {
  extension: string
}

function FileTypeIcon({ extension }: FileTypeIconProps) {
  const iconUrl = getFileTypeIconAsUrl({
    extension: extension.replace('.', ''),
    size: 32,
  })

  return (
    <img
      src={iconUrl}
      alt=""
      className="h-8 w-8 shrink-0"
    />
  )
}

export default FileTypeIcon