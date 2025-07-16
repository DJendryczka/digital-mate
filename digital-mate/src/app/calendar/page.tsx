'use client'

import dynamic from 'next/dynamic'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'

// ⏩ dociągamy tylko w przeglądarce
const Scheduler = dynamic(
  () => import('@aldabil/react-scheduler').then(mod => mod.Scheduler),
  { ssr: false, loading: () => <p>Loading scheduler…</p> }
)

export default function CalendarPage() {
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <section className="py-4">
        <h2 className="mb-4 text-2xl font-semibold">Scheduler</h2>

        <Scheduler
          view="week"
          events={[
            {
              event_id: 1,
              title: 'Demo task',
              start: new Date(),
              end:   new Date(Date.now() + 60 * 60 * 1000),
            },
          ]}
        />
      </section>
    </ThemeProvider>
  )
}
