interface SearchProps {
  query: string
}

function Search({ query }: SearchProps) {
  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <h1 className="text-2xl font-semibold text-fs-text-primary">
          Search
        </h1>

        <p className="mt-1 text-sm text-fs-text-secondary">
          Search results for "{query}"
        </p>
      </header>

      <div className="mt-8 rounded-xl border border-fs-border bg-fs-surface p-5">
        <p className="text-sm text-fs-text-secondary">
          Search results will appear here.
        </p>
      </div>
    </div>
  )
}

export default Search