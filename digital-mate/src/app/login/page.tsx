'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (!error) setSent(true)
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      {sent ? (
        <p className="text-green-600">Check your email for the login link!</p>
      ) : (
        <>
          <input
            type="email"
            className="w-full mb-4 border px-3 py-2 rounded"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Send Magic Link
          </button>
        </>
      )}
    </div>
  )
}
