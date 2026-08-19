interface SidebarProps {
  activePage: string
  onNavigate: (page: string) => void
}

function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const navigation = [
    {
      name: 'Dashboard',
      id: 'dashboard',
    },
    {
      name: 'History',
      id: 'history',
    },
    {
      name: 'Search',
      id: 'search',
    },
    {
      name: 'Settings',
      id: 'settings',
    },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-52 border-r border-fs-border bg-fs-sidebar p-5">
      {/* Branding */}
      <div className="mb-10">
        <h1 className="text-lg font-semibold text-fs-text-primary">
          FileSense
        </h1>

        <p className="mt-1 text-xs text-fs-text-muted">
          Smart file organization
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {navigation.map((item) => {
          const isActive = activePage === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                isActive
                  ? 'bg-fs-surface text-fs-text-primary'
                  : 'text-fs-text-secondary hover:bg-fs-surface hover:text-fs-text-primary'
              }`}
            >
              {item.name}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar