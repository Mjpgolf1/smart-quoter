import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LocationSnap() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        // Mock reverse geocode (in reality, you'd use Google Maps API or similar)
        const mockAddress = `123 Wash St, Bluffton, SC 29910`;
        setLocation({ lat: latitude, lon: longitude, address: mockAddress });

        localStorage.setItem("detected_address", mockAddress);
        navigate("/smart-quoter");
      },
      () => {
        setError("Permission denied or error getting location.");
      }
    );
  };

  return (
    <div>
      <h2>📍 Location Snap</h2>
      <button onClick={handleGetLocation}>Detect My Location</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {location && (
        <div style={{ marginTop: 20 }}>
          <p><strong>Address:</strong> {location.address}</p>
          <p><strong>Latitude:</strong> {location.lat}</p>
          <p><strong>Longitude:</strong> {location.lon}</p>
        </div>
      )}
    </div>
  );
}

