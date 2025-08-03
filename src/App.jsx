import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AutoQuote from './pages/AutoQuote';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auto-quote" element={<AutoQuote />} />
      </Routes>
    </Router>
  );
};

export default App;
