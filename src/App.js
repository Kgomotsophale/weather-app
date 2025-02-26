import React, { useState } from "react";
import axios from "axios";

const API_KEY = "2a2d3781d11f2f8ba38a2a3338227f1c";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={styles.input}
      />
      <button onClick={fetchWeather} style={styles.button}>
        Get Weather
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {weather && (
        <div style={styles.weatherContainer}>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>{weather.weather[0].description}</p>
          <h3>{Math.round(weather.main.temp)}°C</h3>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { textAlign: "center", padding: "20px", fontFamily: "Arial" },
  input: { padding: "10px", fontSize: "16px", marginRight: "10px" },
  button: { padding: "10px 20px", fontSize: "16px", cursor: "pointer" },
  error: { color: "red", marginTop: "10px" },
  weatherContainer: {
    marginTop: "20px",
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
  },
};

export default App;
