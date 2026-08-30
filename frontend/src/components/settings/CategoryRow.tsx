interface CategoryRowProps {
  name: string
  value: string
  onChange: (value: string) => void
  onRemove: () => void
}

function CategoryRow({
  name,
  value,
  onChange,
  onRemove,
}: CategoryRowProps) {
  return (
    <div className="flex items-center gap-4 border-b border-fs-border px-5 py-4 last:border-b-0">
      <div className="w-40 shrink-0 text-sm text-fs-text-primary">
        {name}
      </div>

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 rounded-lg border border-fs-border bg-fs-background px-3 py-2 text-sm text-fs-text-primary outline-none focus:border-fs-accent"
      />

      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 rounded-md px-2 py-1 text-xs text-fs-text-muted transition hover:bg-fs-background hover:text-red-400"
        aria-label={`Remove ${name} category`}
      >
        Remove
      </button>
    </div>
  )
}

export default CategoryRow