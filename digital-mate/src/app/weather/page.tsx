"use client";

import { useEffect, useState } from "react";

export default function WeatherPage() {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=en&appid=${apiKey}`;

        try {
          const res = await fetch(url);
          const data = await res.json();
          setWeather(data);
        } catch (err) {
          setError("Failed to fetch weather data.");
        }
      },
      () => setError("Unable to retrieve your location.")
    );
  }, []);

  return (
    <div className="py-4">
      <h2 className="mb-4 text-2xl font-semibold">Weather</h2>

      {error && <p className="text-red-600">{error}</p>}

      {weather ? (
        <div className="space-y-2">
          <p>
            <strong>{weather.name}</strong>
          </p>
          <div className="flex items-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
              className="w-10 h-10"
            />
            <p className="capitalize">{weather.weather[0].description}</p>
          </div>
          <p>🌡️ {Math.round(weather.main.temp)}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : !error ? (
        <p>Loading weather...</p>
      ) : null}
    </div>
  );
}
