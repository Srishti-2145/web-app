import React, { useState } from "react";
import "./App.css"; // Move your CSS styles here

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "6ef61d301ec04a888bab99e99709485a"; // Replace with your OpenWeatherMap API key

  const getWeather = () => {
    if (city.trim() === "") {
      setError("Please enter a city name!");
      setWeather(null);
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          setError("City not found!");
          setWeather(null);
        } else {
          setError("");
          setWeather({
            name: `${data.name}, ${data.sys.country}`,
            temp: `${data.main.temp}°C`,
            desc: data.weather[0].description,
            humidity: `${data.main.humidity}%`,
            wind: `${data.wind.speed} m/s`,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          });
        }
      })
      .catch(() => {
        setError("Error fetching data!");
        setWeather(null);
      });
  };

  return (
    <div className="container">
      <h2>Weather Report</h2>
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={getWeather}>
          <i className="fas fa-search"></i>
        </button>
      </div>

      {error && <p id="errorMessage">{error}</p>}

      {weather && (
        <div id="weatherCard">
          <h3>{weather.name}</h3>
          <img src={weather.icon} alt="Weather Icon" />
          <p>Temperature: {weather.temp}</p>
          <p>Weather: {weather.desc}</p>
          <p>Humidity: {weather.humidity}</p>
          <p>Wind Speed: {weather.wind}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
