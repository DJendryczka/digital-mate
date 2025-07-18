'use client'

import { useEffect, useState } from 'react'

export default function WeatherPage() {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  const [localWeather, setLocalWeather] = useState<any>(null)
  const [customWeather, setCustomWeather] = useState<any>(null)
  const [cityInput, setCityInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const fetchByCoords = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${apiKey}`
      )
      const data = await res.json()
      setLocalWeather(data)
    } catch {
      setError('Could not fetch weather for your location.')
    }
  }

  const fetchByCity = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${apiKey}`
      )
      const data = await res.json()
      if (data.cod !== 200) {
        setError(data.message)
        setCustomWeather(null)
      } else {
        setCustomWeather(data)
        setError(null)
      }
    } catch {
      setError('Could not fetch city weather.')
      setCustomWeather(null)
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      () => setError('Location access denied.')
    )
  }, [])

  return (
    <div className="py-4 space-y-6">
      <h2 className="text-2xl font-semibold">Weather</h2>

      {/* Input + Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (cityInput.trim()) fetchByCity(cityInput.trim())
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Search city..."
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {/* Obie kolumny */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Lokalna pogoda */}
        {localWeather && (
          <div className="p-4 rounded border shadow">
            <h3 className="text-lg font-medium mb-2">📍 Your Location: {localWeather.name}</h3>
            <WeatherCard data={localWeather} />
          </div>
        )}

        {/* Pogoda z wyszukiwania */}
        {customWeather && (
          <div className="p-4 rounded border shadow">
            <h3 className="text-lg font-medium mb-2">🏙️ {customWeather.name}</h3>
            <WeatherCard data={customWeather} />
          </div>
        )}
      </div>
    </div>
  )
}

// Mały komponent do wyświetlania pogody
function WeatherCard({ data }: { data: any }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="Icon"
          className="w-10 h-10"
        />
        <p className="capitalize">{data.weather[0].description}</p>
      </div>
      <p>🌡️ {Math.round(data.main.temp)}°C</p>
      <p>💧 Humidity: {data.main.humidity}%</p>
      <p>🌬️ Wind: {data.wind.speed} m/s</p>
    </div>
  )
}
