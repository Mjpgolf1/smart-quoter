import React, { useState } from 'react';
import Papa from 'papaparse';

const Clients = () => {
  const [clients, setClients] = useState([]);

  const handleCSVExport = () => {
    const csv = Papa.unparse(clients);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'clients.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCSVImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setClients((prev) => [...prev, ...results.data]);
      },
    });
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Clients</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleCSVImport}
        style={{ marginBottom: '20px' }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Company</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, idx) => (
            <tr key={idx}>
              <td style={tdStyle}>{client.name}</td>
              <td style={tdStyle}>{client.email}</td>
              <td style={tdStyle}>{client.phone}</td>
              <td style={tdStyle}>{client.company}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleCSVExport}>Export Clients as CSV</button>
    </div>
  );
};

const thStyle = {
  borderBottom: '1px solid #ddd',
  textAlign: 'left',
  padding: '8px',
};

const tdStyle = {
  borderBottom: '1px solid #eee',
  padding: '8px',
};

export default Clients;

