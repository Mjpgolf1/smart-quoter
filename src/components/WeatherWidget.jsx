import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('Bluffton, SC');
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=3c9cf4f927694c72d2afdab101526152&q=${location}&days=5&aqi=no&alerts=yes`
      );
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      console.error('Failed to fetch weather:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onBlur={fetchWeather}
          placeholder="Enter location"
        />
        <button onClick={fetchWeather}>Refresh</button>
      </div>

      {loading ? (
        <p>Loading weather...</p>
      ) : weather ? (
        <div className="weather-details">
          <h3>{weather.location.name}, {weather.location.region}</h3>
          <p>{weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="Weather Icon" />
          <p>{weather.current.temp_f}°F</p>

          <h4>Forecast:</h4>
          <div className="forecast">
            {weather.forecast.forecastday.map(day => (
              <div key={day.date} className="forecast-day">
                <p>{day.date}</p>
                <img src={day.day.condition.icon} alt="icon" />
                <p>{day.day.avgtemp_f}°F</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Could not fetch weather.</p>
      )}
    </div>
  );
};

export default WeatherWidget;
