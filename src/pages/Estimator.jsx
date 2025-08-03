import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Estimator = () => {
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState(0);
  const [rate, setRate] = useState(100);
  const [total, setTotal] = useState(null);
  const [savedQuotes, setSavedQuotes] = useState([]);

  const calculate = async () => {
    const quoteTotal = hours * rate;
    setTotal(quoteTotal);

    await addDoc(collection(db, 'quotes'), {
      description,
      hours,
      rate,
      total: quoteTotal,
      created: new Date(),
    });

    fetchQuotes();
  };

  const fetchQuotes = async () => {
    const snapshot = await getDocs(collection(db, 'quotes'));
    const quotesData = snapshot.docs.map(doc => doc.data());
    setSavedQuotes(quotesData);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h2>Smart Quoter</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>Description:<br />
          <textarea
            rows="3"
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ width: '300px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Estimated Hours: &nbsp;
          <input
            type="number"
            value={hours}
            onChange={e => setHours(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Hourly Rate: &nbsp;
          <input
            type="number"
            value={rate}
            onChange={e => setRate(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <button onClick={calculate}>Calculate & Save</button>

      {total !== null && (
        <div style={{ marginTop: '20px' }}>
          <h3>Quote Total: ${total.toFixed(2)}</h3>
        </div>
      )}

      <hr style={{ margin: '30px 0' }} />
      <h3>Saved Quotes</h3>
      <ul>
        {savedQuotes.map((q, index) => (
          <li key={index}>
            {q.description} — ${q.total.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Estimator;

