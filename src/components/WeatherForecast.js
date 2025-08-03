import React, { useEffect, useState } from 'react';
import './WeatherForecast.css';

const API_KEY = '3c9cf4f927694c72d2afdab101526152';

const WeatherForecast = () => {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = 32.237;
        const lon = -80.8606;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
        );
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        setForecast(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!forecast) return <div>Loading forecast...</div>;

  const today = forecast.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);

  return (
    <div className="weather-widget">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {today.map((item, index) => (
          <div key={index} className="forecast-card">
            <div>{new Date(item.dt_txt).toLocaleDateString()}</div>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
            />
            <div>{item.main.temp.toFixed(0)}°F</div>
            <div>{item.weather[0].main}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
