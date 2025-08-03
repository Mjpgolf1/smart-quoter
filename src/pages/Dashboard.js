import React from 'react';
import WeatherForecast from '../components/WeatherForecast';

const Dashboard = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: '#1e1e1e', color: '#fff' }}>
      <h1>Welcome to BSW Smart Admin Dashboard</h1>
      <p>Here's your operational snapshot for today.</p>

      <div style={{ marginTop: '40px' }}>
        <WeatherForecast />
      </div>

      {/* Additional sections will be added below in future steps */}
    </div>
  );
};

export default Dashboard;
