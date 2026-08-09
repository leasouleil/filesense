import Sidebar from '../components/Sidebar'

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        {/* Page content will go here */}
      </main>
    </div>
  )
}

export default AppLayout