'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type WeatherData = {
  name: string
  temp: number
  icon: string
}

export default function DashboardPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        )
        const data = await res.json()

        setWeather({
          name: data.name,
          temp: Math.round(data.main.temp),
          icon: data.weather[0].icon,
        })
      } catch (err) {
        console.error('Weather fetch error:', err)
      }
    })
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

        {/* Tasks */}
        <Link href="/tasks" className="md:col-span-7">
          <div className="bg-white shadow rounded p-4 hover:bg-gray-100 cursor-pointer transition min-h-[200px]">
            <h3 className="font-semibold mb-2">Tasks</h3>
          </div>
        </Link>

        {/* Weather */}
        <Link href="/weather" className="md:col-span-5">
          <div className="bg-white shadow rounded p-4 hover:bg-gray-100 cursor-pointer transition min-h-[200px]">
            <h3 className="font-semibold mb-2">Weather</h3>
            {weather ? (
              <div className="flex items-center gap-3">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt="icon"
                  className="w-10 h-10"
                />
                <div>
                  <p className="text-lg font-bold">{weather.temp}°C</p>
                  <p className="text-sm text-gray-600">{weather.name}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400">Loading weather...</p>
            )}
          </div>
        </Link>

        {/* Journal */}
        <Link href="/journal" className="md:col-span-5">
          <div className="bg-white shadow rounded p-4 hover:bg-gray-100 cursor-pointer transition min-h-[200px]">
            <h3 className="font-semibold mb-2">Journal</h3>
          </div>
        </Link>

        {/* Blog 1 */}
        <Link href="/blog" className="md:col-span-2">
          <div className="bg-white shadow rounded p-4 hover:bg-gray-100 cursor-pointer transition min-h-[200px]">
            <h3 className="font-semibold mb-2">Blog</h3>
          </div>
        </Link>

        {/* Blog 2 */}
        <Link href="/blog" className="md:col-span-5">
          <div className="bg-white shadow rounded p-4 hover:bg-gray-100 cursor-pointer transition min-h-[200px]">
            <h3 className="font-semibold mb-2">Blog</h3>
          </div>
        </Link>

        {/* Logs */}
        <Link href="/logs" className="md:col-span-4">
          <div className="bg-white shadow rounded p-4 hover:bg-gray-100 cursor-pointer transition min-h-[200px]">
            <h3 className="font-semibold mb-2">Notes / Logs</h3>
          </div>
        </Link>

        {/* AI Assistant */}
        <Link href="/ai" className="md:col-span-8">
          <div className="bg-white shadow rounded p-4 hover:bg-gray-100 cursor-pointer transition min-h-[200px]">
            <h3 className="font-semibold mb-2">AI Assistant</h3>
          </div>
        </Link>
      </div>
    </div>
  )
}
