import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "2a2d3781d11f2f8ba38a2a3338227f1c";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      alert("City not found. Please try again.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) fetchWeather(city);
  };

  return (
    <div className="weather-container">
      <h1>SheCodes</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter a city.."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>
            {new Date().toLocaleString()}, {weather.weather[0].description}
          </p>
          <p>
            Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} km/h
          </p>
          <h1>{Math.round(weather.main.temp)}°C</h1>
        </div>
      )}
    </div>
  );
};

export default App;
