import React, { useEffect, useState } from 'react';
import './Weather.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('Bluffton, SC');

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=3c9cf4f927694c72d2afdab101526152&q=${location}&days=5&aqi=no&alerts=yes`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Weather fetch failed:', error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleRefresh = () => fetchWeather();

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <input
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location"
        />
        <button onClick={handleRefresh}>Refresh</button>
      </div>

      {weather ? (
        <>
          <div className="weather-main">
            <h2>{weather.location.name}</h2>
            <img src={weather.current.condition.icon} alt="icon" />
            <p>{weather.current.temp_f}°F</p>
            <p>{weather.current.condition.text}</p>
          </div>

          <div className="forecast">
            {weather.forecast.forecastday.map((day) => (
              <div key={day.date} className="forecast-day">
                <p>{day.date}</p>
                <img src={day.day.condition.icon} alt="icon" />
                <p>{day.day.avgtemp_f}°F</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default Weather;

