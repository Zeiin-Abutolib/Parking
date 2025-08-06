import React, { useState } from "react";
import { useParams } from "react-router-dom";
import parkingsData from "../data/parkings.json";

function ParkingDetails() {
  const { id } = useParams();
  const parking = parkingsData.find((p) => p.id === parseInt(id));

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && date) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Пожалуйста, войдите в систему.");
          return;
        }

        const response = await fetch("http://localhost:3000/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, date, parking_id: parseInt(id) }),
        });

        if (response.ok) {
          setSuccess(true);
          setName("");
          setDate("");
          setError("");
        } else {
          const data = await response.json();
          setError(data.message || "Ошибка при бронировании");
        }
      } catch (err) {
        console.error("Ошибка:", err);
        setError("Ошибка при отправке запроса");
      }
    } else {
      setError("Заполните все поля");
    }
  };

  if (!parking) {
    return (
      <div
        style={{
          padding: "60px",
          textAlign: "center",
          fontSize: "1.6rem",
          color: "#ef4444",
        }}
      >
        ❌ Парковка не найдена
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        padding: "40px",
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        fontFamily: "'Poppins', sans-serif",
        color: "#1e293b",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          color: "#2563eb",
          marginBottom: "30px",
        }}
      >
        {parking.name}
      </h1>

      <ul
        style={{
          fontSize: "1.1rem",
          lineHeight: "1.8",
          color: "#374151",
          paddingLeft: 0,
          height: "100px",
        }}
      >
        <li>
          <strong>📍 Адрес:</strong> {parking.address}
        </li>
        <li>
          <strong>📞 Телефон:</strong> {parking.phone}
        </li>
        <li>
          <strong>🕐 Часы работы:</strong> {parking.hours}
        </li>
        <li>
          <strong>📌 Район:</strong> {parking.district}
        </li>
        <li>
          <strong>🚗 Тип:</strong> {parking.type}
        </li>
      </ul>

      <hr style={{ margin: "30px 0" }} />

      <h2
        style={{
          fontSize: "1.8rem",
          marginBottom: "20px",
          color: "#16a34a",
        }}
      >
        📝 Забронировать место
      </h2>

      {success && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#d1fae5",
            color: "#065f46",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          ✅ Бронирование успешно отправлено!
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {error}
          {error.includes("войдите") && (
            <button
              onClick={() => (window.location.href = "/login")}
              style={{ marginLeft: "10px", color: "#2563eb" }}
            >
              Войти
            </button>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "#fff",
            fontWeight: "600",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Забронировать
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
};

export default ParkingDetails;