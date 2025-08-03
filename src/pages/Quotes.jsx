import React, { useState } from 'react';
const mockClients = [
  { name: 'Jane Smith', address: '123 Main St', squareFeet: 2400 },
  { name: 'Bob Jones', address: '789 Pine Ave', squareFeet: 3200 },
];

const services = [
  { name: 'Pressure Washing', ratePerSqFt: 0.10 },
  { name: 'Window Cleaning', ratePerSqFt: 0.05 },
  { name: 'Roof Cleaning', ratePerSqFt: 0.12 },
];

const Quotes = () => {
  const [clientList, setClientList] = useState(mockClients);
  const [selectedClient, setSelectedClient] = useState('');
  const [newClient, setNewClient] = useState({ name: '', address: '', squareFeet: '' });
  const [isAddingNewClient, setIsAddingNewClient] = useState(false);
  const [totals, setTotals] = useState({});
  const [showBreakdown, setShowBreakdown] = useState(false);

  const handleAddClient = () => {
    if (newClient.name && newClient.address && newClient.squareFeet) {
      const updatedList = [...clientList, newClient];
      setClientList(updatedList);
      setSelectedClient(newClient.name);
      setNewClient({ name: '', address: '', squareFeet: '' });
      setIsAddingNewClient(false);
    }
  };

  const handleGenerateQuote = () => {
    const client = clientList.find(c => c.name === selectedClient);
    if (!client) return;

    const breakdown = {};
    let grandTotal = 0;

    services.forEach(service => {
      const total = client.squareFeet * service.ratePerSqFt;
      breakdown[service.name] = total;
      grandTotal += total;
    });

    breakdown.total = grandTotal;
    setTotals(breakdown);
    setShowBreakdown(true);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Create New Quote</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>Select Existing Client:</label>
        <select
          value={selectedClient}
          onChange={e => {
            setSelectedClient(e.target.value);
            setIsAddingNewClient(false);
          }}
        >
          <option value="">-- Select --</option>
          {clientList.map((c, i) => (
            <option key={i} value={c.name}>{c.name}</option>
          ))}
        </select>
        <button onClick={() => setIsAddingNewClient(true)} style={{ marginLeft: '10px' }}>
          + Add New
        </button>
      </div>

      {isAddingNewClient && (
        <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h4>New Client Details</h4>
          <input
            placeholder="Name"
            value={newClient.name}
            onChange={e => setNewClient({ ...newClient, name: e.target.value })}
            style={{ display: 'block', marginBottom: '8px' }}
          />
          <input
            placeholder="Address"
            value={newClient.address}
            onChange={e => setNewClient({ ...newClient, address: e.target.value })}
            style={{ display: 'block', marginBottom: '8px' }}
          />
          <input
            placeholder="Square Feet"
            type="number"
            value={newClient.squareFeet}
            onChange={e => setNewClient({ ...newClient, squareFeet: parseFloat(e.target.value) })}
            style={{ display: 'block', marginBottom: '8px' }}
          />
          <button onClick={handleAddClient}>Save Client</button>
        </div>
      )}

      <button onClick={handleGenerateQuote} disabled={!selectedClient}>
        Generate Quote
      </button>

      {showBreakdown && (
        <div style={{ marginTop: '30px' }}>
          <h3>Quote Breakdown</h3>
          <ul>
            {services.map(service => (
              <li key={service.name}>
                {service.name}: ${totals[service.name]?.toFixed(2)}
              </li>
            ))}
          </ul>
          <h4>Total: ${totals.total?.toFixed(2)}</h4>
        </div>
      )}
    </div>
  );
};

export default Quotes;

