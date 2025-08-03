import React, { useState, useRef, useEffect } from "react";

const MapperTool = () => {
  const [points, setPoints] = useState([]);
  const canvasRef = useRef(null);

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPoints((prev) => [...prev, { x, y }]);
  };

  const handleClear = () => setPoints([]);

  const calculateArea = () => {
    if (points.length < 3) return 0;
    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      area += points[i].x * points[j].y - points[j].x * points[i].y;
    }
    return Math.abs(area / 2).toFixed(2);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines and points
    if (points.length) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach((p, i) => {
        if (i !== 0) ctx.lineTo(p.x, p.y);
      });
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.closePath();
      ctx.stroke();

      // Draw points
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      });
    }
  }, [points]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Driveway & Roof Mapper</h2>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        width={600}
        height={400}
        style={{ border: "2px solid black", cursor: "crosshair" }}
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={handleClear}>Clear</button>
        {points.length >= 3 && (
          <div style={{ marginTop: 8 }}>
            Estimated Area: <strong>{calculateArea()}</strong> px²
          </div>
        )}
      </div>
    </div>
  );
};

export default MapperTool;
