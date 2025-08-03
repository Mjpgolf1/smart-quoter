import React, { useRef, useEffect } from "react";

export default function PolygonCanvas({ onAreaChange }) {
  const canvasRef = useRef(null);

  // Mock detection polygon (static coords for demo)
  const mockPolygon = [
    { x: 80, y: 80 },
    { x: 300, y: 90 },
    { x: 290, y: 250 },
    { x: 100, y: 230 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background placeholder
    ctx.fillStyle = "#ddd";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw mock detected polygon
    ctx.beginPath();
    mockPolygon.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    ctx.fill();

    // Calculate mock area
    const area = calculateArea(mockPolygon);
    onAreaChange(area);
  }, []);

  const calculateArea = (pts) => {
    let area = 0;
    for (let i = 0; i < pts.length; i++) {
      const j = (i + 1) % pts.length;
      area += pts[i].x * pts[j].y - pts[j].x * pts[i].y;
    }
    return Math.abs(area / 2 / 10); // scale down to sqft-ish
  };

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={400}
      style={{ border: "1px solid black", background: "#eee" }}
    />
  );
}

