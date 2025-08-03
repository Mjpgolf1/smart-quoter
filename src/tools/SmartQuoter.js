import React, { useEffect, useState } from "react";

export default function SmartQuoter() {
  const [squareFootage, setSquareFootage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("mapped_area");
    if (stored) {
      setSquareFootage(stored);
      localStorage.removeItem("mapped_area");
    }
  }, []);

  return (
    <div>
      <h2>Smart Quoter</h2>
      <label>Square Footage:</label>
      <input
        type="number"
        value={squareFootage}
        onChange={(e) => setSquareFootage(e.target.value)}
        style={{ width: 200 }}
      />
    </div>
  );
}

