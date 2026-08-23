export function getFileName(path: string): string {
  return path.split(/[/\\]/).pop() ?? path
}

export function getFileExtension(path: string): string {
  const fileName = getFileName(path)
  const lastDot = fileName.lastIndexOf('.')

  if (lastDot === -1) {
    return ''
  }

  return fileName.slice(lastDot + 1).toUpperCase()
}

export function getDisplayPath(path: string): string {
  return path.replace(/\\/g, '/')
}