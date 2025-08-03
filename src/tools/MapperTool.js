import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PolygonCanvas from "../components/PolygonCanvas";

export default function MapperTool() {
  const [area, setArea] = useState(0);
  const navigate = useNavigate();

  const handleAreaSubmit = () => {
    localStorage.setItem("mapped_area", area.toFixed(2));
    navigate("/smart-quoter");
  };

  return (
    <div>
      <h2>Driveway / Roof Mapper</h2>
      <p>AI-generated detection preview (mocked).</p>
      <PolygonCanvas onAreaChange={setArea} />
      <div style={{ marginTop: 20 }}>
        <p>Estimated Area: {area.toFixed(2)} sqft</p>
        <button onClick={handleAreaSubmit}>Send to Quote</button>
      </div>
    </div>
  );
}

