interface SidebarProps {
  activePage: string
  onNavigate: (page: string) => void
}

function Sidebar({
  activePage,
  onNavigate,
}: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-52 border-r border-fs-border bg-fs-surface p-5">
      {/* Brand */}
      <div className="mb-10">
        <h1 className="text-xl font-bold text-fs-accent">
          FileSense
        </h1>

        <p className="mt-1 text-xs text-fs-text-secondary">
          Smart file organization
        </p>
      </div>

      {/* Main navigation */}
      <nav className="space-y-2">
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className={`w-full rounded-lg px-4 py-3 text-left text-sm transition ${
            activePage === 'dashboard'
              ? 'bg-fs-accent/10 text-fs-accent'
              : 'text-fs-text-secondary hover:bg-fs-background hover:text-fs-text-primary'
          }`}
        >
          Dashboard
        </button>

        <button
          type="button"
          onClick={() => onNavigate('history')}
          className={`w-full rounded-lg px-4 py-3 text-left text-sm transition ${
            activePage === 'history'
              ? 'bg-fs-accent/10 text-fs-accent'
              : 'text-fs-text-secondary hover:bg-fs-background hover:text-fs-text-primary'
          }`}
        >
          History
        </button>
      </nav>

      {/* Secondary navigation */}
      <div className="my-6 border-t border-fs-border" />

      <nav>
        <button
          type="button"
          onClick={() => onNavigate('settings')}
          className={`w-full rounded-lg px-4 py-3 text-left text-sm transition ${
            activePage === 'settings'
              ? 'bg-fs-accent/10 text-fs-accent'
              : 'text-fs-text-secondary hover:bg-fs-background hover:text-fs-text-primary'
          }`}
        >
          Settings
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar