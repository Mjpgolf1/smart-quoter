import React, { useEffect, useState } from 'react';

const WeatherForecast = () => {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const apiKey = 'AIzaSyCQL-KL7s3T8DpmcJFKRKX9i-fzVu0ZOHs'; // Your weather API key
  const city = 'Bluffton';

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === '200') {
          setForecast(data);
        } else {
          setError('Could not fetch weather data.');
        }
      })
      .catch((err) => setError('API Error: ' + err.message));
  }, []);

  const renderForecast = () => {
    if (!forecast) return null;
    const today = forecast.list.filter((item) =>
      item.dt_txt.includes('12:00:00')
    );
    return today.slice(0, 5).map((day, idx) => (
      <div key={idx} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
        <h4>{new Date(day.dt_txt).toLocaleDateString()}</h4>
        <p>{day.weather[0].main} - {day.weather[0].description}</p>
        <p>Temp: {day.main.temp}°F</p>
        <p>Humidity: {day.main.humidity}%</p>
        <p>Wind: {day.wind.speed} mph</p>
      </div>
    ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>5-Day Weather Forecast</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '10px' }}>
        {renderForecast()}
      </div>
    </div>
  );
};

export default WeatherForecast;
