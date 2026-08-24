interface StatCardProps {
  label: string
  value: number
  description: string
}

function StatCard({
  label,
  value,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-fs-border bg-fs-surface p-5 transition hover:border-fs-accent/30">
      <p className="text-sm font-medium text-fs-text-secondary">
        {label}
      </p>

      <p className="mt-3 text-3xl font-semibold tracking-tight text-fs-text-primary">
        {value.toLocaleString()}
      </p>

      <p className="mt-1 text-xs text-fs-text-muted">
        {description}
      </p>
    </div>
  )
}

export default StatCard