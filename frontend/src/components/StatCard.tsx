interface StatCardProps {
  label: string
  value: number
  description: string
  onClick?: () => void
}

function StatCard({
  label,
  value,
  description,
  onClick,
}: StatCardProps) {
  const content = (
    <>
      <p className="text-sm text-fs-text-secondary">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-fs-text-primary">
        {value}
      </p>

      <p className="mt-1 text-xs text-fs-text-muted">
        {description}
      </p>
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full rounded-xl border border-fs-border bg-fs-surface p-5 text-left transition hover:border-fs-accent/40 hover:bg-fs-background/40 focus:outline-none focus:ring-2 focus:ring-fs-accent/30"
      >
        {content}
      </button>
    )
  }

  return (
    <div className="rounded-xl border border-fs-border bg-fs-surface p-5">
      {content}
    </div>
  )
}

export default StatCard