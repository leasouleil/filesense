interface SettingsRowProps {
  label: string
  description?: string
  children: React.ReactNode
}

function SettingsRow({
  label,
  description,
  children,
}: SettingsRowProps) {
  return (
    <div className="flex items-center justify-between gap-8 border-b border-fs-border px-5 py-4 last:border-b-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-fs-text-primary">
          {label}
        </p>

        {description && (
          <p className="mt-1 text-xs text-fs-text-muted">
            {description}
          </p>
        )}
      </div>

      <div className="shrink-0">
        {children}
      </div>
    </div>
  )
}

export default SettingsRow