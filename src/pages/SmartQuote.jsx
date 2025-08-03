import React from 'react';
import { useNavigate } from 'react-router-dom';

const SmartQuote = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    // For now, just alert. Later we can launch the quoting wizard.
    alert("Smart quote session started!");
  };

  return (
    <div style={{ padding: '40px', background: '#121212', color: '#fff', minHeight: '100vh' }}>
      <h1>Smart Quoting Tool</h1>
      <p>Use this interface to start an automated quote for a customer using AI + property data.</p>
      
      <div style={{ marginTop: '40px' }}>
        <button
          onClick={handleStart}
          style={{
            background: '#00c3ff',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            fontSize: '18px',
            color: '#000',
            cursor: 'pointer'
          }}
        >
          Start New Smart Quote
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            color: '#ccc',
            border: '1px solid #444',
            padding: '10px 20px',
            borderRadius: '6px',
            marginTop: '20px',
            cursor: 'pointer'
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SmartQuote;
