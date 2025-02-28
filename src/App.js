import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "2a2d3781d11f2f8ba38a2a3338227f1c";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Try again.");
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-box">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>Temperature: {Math.round(weather.main.temp)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;