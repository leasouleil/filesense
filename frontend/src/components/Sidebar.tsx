function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-800 bg-slate-900 p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-emerald-400">
          FileSense
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Smart file organization
        </p>
      </div>

      <nav className="space-y-2">
        <button className="w-full rounded-lg bg-emerald-500/10 px-4 py-3 text-left text-emerald-400">
          Dashboard
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800">
          History
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800">
          Search
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800">
          Settings
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar