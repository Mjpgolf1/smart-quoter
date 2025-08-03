import React, { useEffect, useState } from 'react';
import './weatherStyles.css';

const StyledWeatherWidget = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('Bluffton');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [inputCity, setInputCity] = useState('');

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async (location) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error('Invalid location or API key');
      const data = await response.json();

      const filteredData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);
      setWeatherData(filteredData);
      setCity(data.city.name);
      setError('');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (inputCity.trim()) {
      fetchWeather(inputCity.trim());
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        const filteredData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);
        setWeatherData(filteredData);
        setCity(data.city.name);
        setLoading(false);
      },
      () => fetchWeather(city)
    );
  }, []);

  return (
    <div className="weather-widget-glass">
      <div className="weather-header">
        <h2>{city}</h2>
        <div className="weather-search">
          <input
            type="text"
            placeholder="Enter city"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />
          <button onClick={handleSearch}>Go</button>
        </div>
      </div>
      {loading ? (
        <p className="weather-loading">Loading...</p>
      ) : error ? (
        <p className="weather-error">{error}</p>
      ) : (
        <div className="weather-forecast-container">
          {weatherData.map((day, idx) => (
            <div key={idx} className="weather-card">
              <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
              <img
                src={`/assets/weather/${day.weather[0].main.toLowerCase()}.png`}
                alt={day.weather[0].main}
                className="weather-icon"
              />
              <p>{Math.round(day.main.temp)}°C</p>
              <p>{day.weather[0].main}</p>
            </div>
          ))}
        </div>
      )}
      <div className="radar-link">
        <a href="https://www.windy.com/" target="_blank" rel="noreferrer">Live Radar</a>
      </div>
    </div>
  );
};

export default StyledWeatherWidget;
