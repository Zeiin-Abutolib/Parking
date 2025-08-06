import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
        }

        login();
        alert("Login successful!");
        navigate("/profile");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      // Обработка ошибок, включая неверные логин/пароль
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{
      display: "flex",
      flexDirection: "column",
      gap: "22px",
      alignItems: "center"
    }}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "90%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #c7d2fe",
          fontSize: "17px",
          background: "#f3f4f6",
          outline: "none",
          color: "black",
          transition: "border 0.2s"
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "90%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #c7d2fe",
          fontSize: "17px",
          background: "#f3f4f6",
          outline: "none",
          color: "black",
          transition: "border 0.2s"
        }}
      />
      <button
        type="submit"
        style={{
          width: "90%",
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "18px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(99,102,241,0.12)",
          transition: "background 0.2s"
        }}
      >
        Login
      </button>
    </form>
  );
}

export default Login;