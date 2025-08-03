import React from 'react';
import { useNavigate } from 'react-router-dom';
import Weather from './Weather';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAutoQuoteClick = () => {
    navigate('/auto-quote');
  };

  return (
    <div
      style={{
        padding: '30px',
        backgroundColor: '#0f0f0f',
        minHeight: '100vh',
        color: '#fff'
      }}
    >
      <h1>Welcome to SmartQuoter CRM</h1>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <Weather />
      </div>

      <div style={{ marginTop: '40px' }}>
        <button
          onClick={handleAutoQuoteClick}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: '0.3s'
          }}
        >
          Launch Auto Quote Tool
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
