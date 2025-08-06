import { Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";
import Profile from "./components/Profile";
import Home from "./components/Home";
import ParkingDetails from "./components/ParkingDetails";
import axios from "axios";
import Header from "./components/Header";

function App() {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(120deg, #e0e7ff 0%, #f9fafb 100%)",
      display: "flex",
      flexDirection: "column"
    }}>
      <Header /> 
      <main style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0",
      }}>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/parking/:id" element={<ParkingDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}


export default App;