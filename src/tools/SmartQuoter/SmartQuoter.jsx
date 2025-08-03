import React, { useState } from 'react';

const SmartQuoter = () => {
  const [address, setAddress] = useState('');
  const [squareFootage, setSquareFootage] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetSquareFootage = async () => {
    setLoading(true);
    try {
      // Placeholder for AI-enhanced area detection logic
      // Future: integrate satellite AI or ATTOM API
      const mockSqFt = 2850;
      setSquareFootage(mockSqFt);
    } catch (err) {
      alert('Error fetching square footage');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuote = () => {
    if (!squareFootage) return alert('Please get square footage first');
    const rate = 0.15; // dollars per sq ft (adjustable later)
    const calcQuote = (squareFootage * rate).toFixed(2);
    setQuote(`$${calcQuote}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Smart Quoter</h2>
      <input
        type="text"
        placeholder="Enter property address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br /><br />
      <button onClick={handleGetSquareFootage} disabled={loading}>
        {loading ? 'Detecting...' : 'Get Square Footage'}
      </button>
      {squareFootage && <p>Detected Sq Ft: {squareFootage}</p>}
      <button onClick={handleGenerateQuote} disabled={!squareFootage}>
        Generate Quote
      </button>
      {quote && <h3>Estimated Quote: {quote}</h3>}
    </div>
  );
};

export default SmartQuoter;
