interface SearchResultProps {
  fileName: string
  category: string
  fileType: string
  path: string
}

function SearchResult({
  fileName,
  category,
  fileType,
  path,
}: SearchResultProps) {
  return (
    <button className="w-full border-b border-fs-border px-5 py-4 text-left last:border-b-0 hover:bg-fs-background">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-fs-text-primary">
            {fileName}
          </p>

          <p className="mt-1 truncate text-xs text-fs-text-secondary">
            {path}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="rounded-md bg-fs-background px-2 py-1 text-xs text-fs-text-secondary">
            {fileType}
          </span>

          <span className="text-xs text-fs-text-secondary">
            {category}
          </span>
        </div>
      </div>
    </button>
  )
}

export default SearchResult