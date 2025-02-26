import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Johannesburg&appid=2a2d3781d11f2f8ba38a2a3338227f1c&units=metric`
      )
      .then((response) => setWeather(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      {weather ? (
        <div>
          <p>City: {weather.name}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
