import React from "react";
import { useParams } from "react-router-dom";
import parkingsData from "../data/parkings.json";

function ParkingDetails() {
  const { id } = useParams();
  const parking = parkingsData.find((p) => p.id === parseInt(id));

  if (!parking) {
    return (
      <div style={{ padding: "60px", fontSize: "1.6rem", textAlign: "center", color: "#ef4444" }}>
        ❌ Парковка не найдена
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "800px",
      margin: "60px auto",
      padding: "40px",
      borderRadius: "12px",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#1e293b"
    }}>
      <h1 style={{
        fontSize: "2rem",
        color: "#2563eb",
        fontWeight: "700",
        marginBottom: "24px",
        borderBottom: "2px solid #e5e7eb",
        paddingBottom: "12px"
      }}>
        {parking.name}
      </h1>

      <div style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
        <p><strong>📍 Адрес:</strong> {parking.address}</p>
        <p><strong>📞 Телефон:</strong> {parking.phone}</p>
        <p><strong>🕐 Часы работы:</strong> {parking.hours}</p>
        <p><strong>📌 Район:</strong> {parking.district}</p>
        <p><strong>🚗 Тип:</strong> {parking.type}</p>
      </div>

      <button
        style={{
          marginTop: "36px",
          padding: "14px 32px",
          backgroundColor: "#2563eb",
          color: "#ffffff",
          fontSize: "1.1rem",
          fontWeight: 600,
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background 0.2s ease"
        }}
        onClick={() => alert("✅ Бронь успешно оформлена!")}
        onMouseOver={(e) => e.currentTarget.style.background = "#1e40af"}
        onMouseOut={(e) => e.currentTarget.style.background = "#2563eb"}
      >
        Забронировать место
      </button>
    </div>
  );
}

export default ParkingDetails;
