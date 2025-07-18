'use client'

export default function DashboardPage() {
  return (
    <div className="py-4 space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Pogoda */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-sm font-medium text-gray-600">Weather</h3>
          <p className="text-xl font-bold">🌤️ 22°C in Stockholm</p>
        </div>

        {/* Zadania */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-sm font-medium text-gray-600">Tasks</h3>
          <p className="text-xl font-bold">3 remaining</p>
        </div>

        {/* Przypomnienia */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-sm font-medium text-gray-600">Reminders</h3>
          <p className="text-xl font-bold">1 upcoming</p>
        </div>
      </div>
    </div>
  )
}
