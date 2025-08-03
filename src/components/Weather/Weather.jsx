import React, { useEffect, useState } from 'react';
import './weatherStyles.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('Bluffton,US'); // Default location

  const apiKey = '3c9cf4f927694c72d2afdab101526152';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`
        );
        const data = await response.json();
        if (data.cod !== 200) throw new Error(data.message);
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${apiKey}`
        );
        const data = await response.json();
        if (data.cod !== '200') throw new Error(data.message);
        const dailyData = data.list.filter((_, index) => index % 8 === 0).slice(0, 5);
        setForecastData(dailyData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
    fetchForecast();
  }, [location]);

  return (
    <div className="weather-widget">
      <div className="weather-bg" />
      <div className="weather-content">
        <h2>Local Weather</h2>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location (e.g., Bluffton,US)"
        />
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <div className="weather-now">
            <h3>{weatherData.name}</h3>
            <p>{weatherData.weather[0].description}</p>
            <h1>{Math.round(weatherData.main.temp)}°F</h1>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind: {Math.round(weatherData.wind.speed)} mph</p>
          </div>
        )}
        <div className="forecast">
          {forecastData.map((item) => (
            <div key={item.dt} className="forecast-day">
              <p>{new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: 'short' })}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />
              <p>{Math.round(item.main.temp)}°F</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
