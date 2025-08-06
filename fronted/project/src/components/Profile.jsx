import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    console.log("Токен:", token); // Для отладки

    if (!token) {
      setError("Пожалуйста, войдите в систему.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
      setError("");
    } catch (err) {
      console.error("Ошибка при загрузке данных:", err);
      setError(
        err.response?.status === 401
          ? "Сессия истекла. Войдите заново."
          : `Ошибка: ${err.response?.data?.message || "Не удалось загрузить данные"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Мои бронирования</h1>
      
      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <div style={{ color: "red", margin: "10px 0" }}>
          {error}
          {error.includes("войдите") && (
            <button
              onClick={() => (window.location.href = "/login")}
              style={{ marginLeft: "10px" }}
            >
              Войти
            </button>
          )}
        </div>
      ) : bookings.length === 0 ? (
        <p>Нет активных бронирований</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {bookings.map((booking) => (
            <li
              key={booking.id}
              style={{
                padding: "10px",
                margin: "5px 0",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              <strong>{booking.name}</strong> -{" "}
              {new Date(booking.date).toLocaleString()} <br />
              Парковка: #{booking.parking_id || "Не указана"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Profile;