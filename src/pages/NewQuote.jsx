import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewQuote = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [squareFootage, setSquareFootage] = useState('');
  const [services, setServices] = useState({
    pressureWashing: false,
    windowCleaning: false,
    roofCleaning: false
  });

  const handleServiceToggle = (service) => {
    setServices({ ...services, [service]: !services[service] });
  };

  const estimateTotals = () => {
    const sqft = parseFloat(squareFootage);
    if (isNaN(sqft)) return 0;
    let total = 0;
    if (services.pressureWashing) total += sqft * 0.15;
    if (services.windowCleaning) total += sqft * 0.10;
    if (services.roofCleaning) total += sqft * 0.20;
    return total.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Quote created for ${clientName} - $${estimateTotals()}`);
    navigate('/quotes');
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Create New Quote</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Client Name:<br />
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Property Address:<br />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Square Footage:<br />
            <input
              type="number"
              value={squareFootage}
              onChange={(e) => setSquareFootage(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={services.pressureWashing}
              onChange={() => handleServiceToggle('pressureWashing')}
            />
            Pressure Washing ($0.15/sqft)
          </label><br />
          <label>
            <input
              type="checkbox"
              checked={services.windowCleaning}
              onChange={() => handleServiceToggle('windowCleaning')}
            />
            Window Cleaning ($0.10/sqft)
          </label><br />
          <label>
            <input
              type="checkbox"
              checked={services.roofCleaning}
              onChange={() => handleServiceToggle('roofCleaning')}
            />
            Roof Cleaning ($0.20/sqft)
          </label>
        </div>
        <div style={{ marginTop: '20px' }}>
          <strong>Estimated Total: ${estimateTotals()}</strong>
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Save Quote</button>
      </form>
    </div>
  );
};

export default NewQuote;

