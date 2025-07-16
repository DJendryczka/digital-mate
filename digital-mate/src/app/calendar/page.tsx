'use client'

import { Scheduler } from '@aldabil/react-scheduler'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'

export default function CalendarPage() {
  const theme = createTheme()   // domyślny motyw MUI

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <section className="py-4">
        <h2 className="mb-4 text-2xl font-semibold">Scheduler</h2>

        <Scheduler
          view="week"            // startowy widok: day | week | month
          events={[
            {
              event_id: 1,
              title: 'Demo task',
              start: new Date(),
              end:   new Date(new Date().getTime() + 60 * 60 * 1000), // +1 h
            },
          ]}
        />
      </section>
    </ThemeProvider>
  )
}
