import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import SmartQuoter from "./tools/SmartQuoter";
import MapperTool from "./tools/MapperTool";

const App = () => {
  return (
    <div style={{ fontFamily: "Arial", maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>BSW Smart Tools Dashboard</h1>

      <div style={{ marginBottom: 20 }}>
        <Link to="/quoter" style={{ marginRight: 10 }}>
          <button>Smart Quoter</button>
        </Link>
        <Link to="/mapper">
          <button>Driveway / Roof Mapper</button>
        </Link>
      </div>

      <Routes>
        <Route path="/quoter" element={<SmartQuoter />} />
        <Route path="/mapper" element={<MapperTool />} />
        <Route path="*" element={<p>Select a tool above to get started.</p>} />
      </Routes>
    </div>
  );
};

export default App;
