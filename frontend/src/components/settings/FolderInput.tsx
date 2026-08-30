interface FolderInputProps {
  label: string
  description?: string
  value: string
  onChange: (value: string) => void
  onBrowse?: () => void
}

function FolderInput({
  label,
  description,
  value,
  onChange,
  onBrowse,
}: FolderInputProps) {
  return (
    <div className="border-b border-fs-border p-5 last:border-b-0">
      <label className="text-sm font-medium text-fs-text-primary">
        {label}
      </label>

      {description && (
        <p className="mt-1 text-xs text-fs-text-muted">
          {description}
        </p>
      )}

      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-fs-border bg-fs-background px-3 py-2 text-sm text-fs-text-primary outline-none focus:border-fs-accent"
        />

        <button
          type="button"
          onClick={onBrowse}
          className="rounded-lg border border-fs-border px-4 py-2 text-sm text-fs-text-secondary transition hover:bg-fs-background hover:text-fs-text-primary"
        >
          Browse
        </button>
      </div>
    </div>
  )
}

export default FolderInput
