'use client'

import { useState } from 'react'
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotMonth
} from '@daypilot/daypilot-lite-react'

export default function CalendarPage() {
  const [view, setView] = useState<'Day' | 'Week' | 'Month'>('Week')

  const events = [
    {
      id: 1,
      text: 'Demo task',
      start: DayPilot.Date.today().addHours(9),
      end: DayPilot.Date.today().addHours(10),
    },
  ]

  return (
    <div className="py-4">
      <h2 className="mb-4 text-2xl font-semibold">Scheduler</h2>

      {/* przełącznik */}
      <div className="mb-4 inline-flex rounded border">
        {(['Day', 'Week', 'Month'] as const).map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 text-sm ${
              view === v ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* widok: Day/Week → Calendar */}
      {view !== 'Month' && (
        <DayPilotCalendar
          viewType={view}
          startDate={DayPilot.Date.today()}
          events={events}
        />
      )}

      {/* widok: Month → osobny komponent */}
      {view === 'Month' && (
        <DayPilotMonth
          startDate={DayPilot.Date.today()}
          events={events}
        />
      )}
    </div>
  )
}
