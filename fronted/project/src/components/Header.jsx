import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <header
      style={{
        width: "94%",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(31,41,55,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        height: "70px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            color: "#fff",
            fontSize: "1.3rem",
          }}
        >
          B
        </div>
        <span
          style={{
            fontWeight: 900,
            fontSize: "1.3rem",
            letterSpacing: "1px",
            color: "black",
          }}
        >
          OSTURAQ
        </span>
      </div>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
          fontSize: "1.08rem",
        }}
      >
        <Link to="/" style={{ fontWeight: 700, color: "#111", textDecoration: "none" }}>Басты бет</Link>
        <Link to="/about" style={{ color: "#222", textDecoration: "none" }}>About</Link>
        <Link to="/parking" style={{ color: "#222", textDecoration: "none" }}>Parking</Link>
        <Link to="/prices" style={{ color: "#222", textDecoration: "none" }}>Prices</Link>
        <Link to="/careers" style={{ color: "#222", textDecoration: "none" }}>Careers</Link>
        <Link to="/contact" style={{ color: "#222", textDecoration: "none" }}>Contact Us</Link>
      </nav>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "14px" }}>
        {location.pathname !== "/profile" && !isAuthenticated && (
          <>
            <Link
              to="/register"
              style={{
                background: "#2563eb",
                color: "#fff",
                fontWeight: 600,
                borderRadius: "8px",
                padding: "8px 22px",
                fontSize: "1rem",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              Тіркелу
            </Link>
            <Link
              to="/login"
              style={{
                background: "#2563eb",
                color: "#fff",
                fontWeight: 600,
                borderRadius: "8px",
                padding: "8px 22px",
                fontSize: "1rem",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              Кіру
            </Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link
              to="/profile"
              style={{
                background: "#2563eb",
                color: "#fff",
                fontWeight: 600,
                borderRadius: "8px",
                padding: "8px 22px",
                fontSize: "1rem",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              Профиль
            </Link>
            <button
              onClick={logout}
              style={{
                background: "#ef4444",
                color: "#fff",
                fontWeight: 600,
                borderRadius: "8px",
                padding: "8px 22px",
                fontSize: "1rem",
                border: "none",
                textDecoration: "none",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              Шығу
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;