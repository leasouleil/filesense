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
    <section className="mt-10">
      <div className="mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-fs-text-secondary">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-xs text-fs-text-muted">
            {description}
          </p>
        )}
      </div>

      <div>
        {children}
      </div>
    </section>
  )
}

export default SettingsSection