interface SettingsSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <section className="mt-8">
      <div className="mb-3">
        <h2 className="text-sm font-semibold text-fs-text-primary">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-xs text-fs-text-muted">
            {description}
          </p>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-fs-border bg-fs-surface">
        {children}
      </div>
    </section>
  )
}

export default SettingsSection