interface Activity {
  id: number
  fileName: string
  category: string
  action: string
  time: string
}

const activities: Activity[] = [
  {
    id: 1,
    fileName: 'invoice.pdf',
    category: 'Finance',
    action: 'Moved to Finance',
    time: 'Just now',
  },
  {
    id: 2,
    fileName: 'assignment.docx',
    category: 'School',
    action: 'Moved to School',
    time: '5 min ago',
  },
  {
    id: 3,
    fileName: 'setup.exe',
    category: 'Installer',
    action: 'Moved to Installer',
    time: '12 min ago',
  },
]

function RecentActivity() {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-fs-text-primary">
          Recent Activity
        </h2>

        <button className="text-sm text-fs-text-secondary hover:text-fs-text-primary">
          View all
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-fs-border bg-fs-surface">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between border-b border-fs-border px-5 py-4 last:border-b-0"
          >
            <div>
              <p className="text-sm font-medium text-fs-text-primary">
                {activity.fileName}
              </p>

              <p className="mt-1 text-xs text-fs-text-muted">
                {activity.action}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-xs text-fs-text-secondary">
                {activity.category}
              </span>

              <span className="text-xs text-fs-text-muted">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentActivity