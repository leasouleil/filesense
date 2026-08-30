import {
  LayoutDashboard,
  History as HistoryIcon,
  Settings,
} from 'lucide-react'

interface SidebarProps {
  activePage: string
  onNavigate: (page: string) => void
}

interface NavItem {
  label: string
  page: string
  icon: React.ElementType
}

const mainNavigation: NavItem[] = [
  {
    label: 'Dashboard',
    page: 'dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'History',
    page: 'history',
    icon: HistoryIcon,
  },
]

const secondaryNavigation: NavItem[] = [
  {
    label: 'Settings',
    page: 'settings',
    icon: Settings,
  },
]

function Sidebar({
  activePage,
  onNavigate,
}: SidebarProps) {
  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon
    const isActive = activePage === item.page

    return (
      <button
        key={item.page}
        type="button"
        onClick={() => onNavigate(item.page)}
        className={`relative flex w-full items-center gap-3 overflow-hidden rounded-lg px-4 py-3.5 text-left text-sm transition-all duration-200 ${
          isActive
            ? 'bg-fs-accent/10 text-fs-accent'
            : 'text-fs-text-secondary hover:bg-fs-background hover:text-fs-text-primary'
        }`}
      >
        {/* Animated active indicator */}
        {isActive && (
          <span className="absolute left-0 top-0 h-full w-0.5 origin-top bg-fs-accent animate-[activeBorder_0.4s_ease-out]" />
        )}

        <Icon
          size={17}
          strokeWidth={1.8}
          className="relative z-10 shrink-0"
        />

        <span
          className={`relative z-10 ${
            isActive
              ? 'animate-[navTextGlow_0.35s_ease-out]'
              : ''
          }`}
        >
          {item.label}
        </span>
      </button>
    )
  }

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-52 flex-col border-r border-fs-border bg-fs-surface p-5">

      {/* Brand */}
      <div className="mb-10">
        <h1 className="text-xl font-bold text-fs-accent">
          FileSense
        </h1>

        <p className="mt-1 text-xs text-fs-text-secondary">
          Smart file organization
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-3">
        {mainNavigation.map(renderNavItem)}
      </nav>

      {/* Divider */}
      <div className="my-7 border-t border-fs-border" />

      {/* Secondary Navigation */}
      <nav className="space-y-3">
        {secondaryNavigation.map(renderNavItem)}
      </nav>

      {/* Author Credit */}
      <div className="mt-auto pt-6">
        <p className="text-[11px] text-fs-text-muted">
          Made by <span className="font-medium text-fs-text-secondary">leasouleil</span>
        </p>

        <p className="mt-1 text-[10px] text-fs-text-muted">
          FileSense © 2026
        </p>
      </div>

    </aside>
  )
}

export default Sidebar