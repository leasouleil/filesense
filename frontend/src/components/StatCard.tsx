interface StatCardProps {
  label: string
  value: string | number
  description?: string
}

function StatCard({
  label,
  value,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-fs-border bg-fs-surface p-5">
      <p className="text-sm text-fs-text-secondary">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-fs-text-primary">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs text-fs-text-muted">
          {description}
        </p>
      )}
    </div>
  )
}

export default StatCard