'use client'

import { useState } from 'react'

export default function TasksPage() {
  const [tasks, setTasks] = useState<string[]>([])
  const [text, setText] = useState('')

  function addTask(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    setTasks([...tasks, text.trim()])
    setText('')
  }

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">Your tasks</h2>

      <form onSubmit={addTask} className="mb-6 flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="New task..."
          className="flex-1 rounded border p-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map((t, i) => (
          <li
            key={i}
            className="rounded border p-2 shadow-sm"
          >
            {t}
          </li>
        ))}
      </ul>
    </section>
  )
}
