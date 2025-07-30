import React, { useState, useMemo } from "react";
import parkingsData from "../data/parkings.json";
import { Link } from "react-router-dom";

const districts = [
  "Районы",
  "Алмалы",
  "Алатау",
  "Ауэзов",
  "Бостандык",
  "Жетысу",
  "Медеу",
  "Наурызбай",
  "Турксиб"
];

const parkingTypes = [
  "Типы",
  "Автостоянки паркинги",
  "Перехватывающие парковки",
  "Охраняемые парковки",
  "Подземные парковки",
  "Закрытые парковки",
  "Бесплатные парковки",
  "Платные парковки",
  "Грузовые парковки",
  "круглосуточные парковки",
  "Многоуровневые парковки"
];

function Home() {
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("Районы");
  const [type, setType] = useState("Типы");
  const [visibleCount, setVisibleCount] = useState(10);

  // Фильтрация парковок
  const filteredParkings = useMemo(() => {
    return parkingsData.filter((p) => {
      const matchesDistrict =
        district === "Районы" || p.district === district;
      const matchesType =
        type === "Типы" || p.type === type;
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase());
      return matchesDistrict && matchesType && matchesSearch;
    });
  }, [search, district, type]);

  const visibleParkings = filteredParkings.slice(0, visibleCount);

  return (
    <div>
      {/* Хедер и баннер */}
      <div
        style={{
          marginLeft: "20%",
          width: "58vw",
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(180deg, #0f172a 50%, #112859ff 100%)"
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
            minHeight: "380px",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 24px",
            color: "#fff"
          }}
        >
          <h1
            style={{
              fontSize: "2.4rem",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "18px"
            }}
          >
            Тұрақ табу әлдеқайда<br />жеңіл болды
          </h1>
          <p
            style={{
              color: "#a3aed6",
              fontSize: "1.08rem",
              textAlign: "center",
              marginBottom: "32px",
              maxWidth: "500px"
            }}
          >
            Мобильді қосымша GPS-пен біріктіріліп, тұрақ орындарын жылдам әрі оңай табуға мүмкіндік береді және бәсекеге қабілетті бағаларды ұсынады.
          </p>
          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "8px",
              padding: "10px 36px",
              fontSize: "1.2rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(37,99,235,0.12)",
              transition: "background 0.2s"
            }}
          >
            Жүктеу
          </button>
        </div>
      </div>

      {/* Картинка */}
      <div style={{
        marginLeft: "10%"
      }}>
        <img
          src="/public/Screenshot 2025-07-24 123810.png"
          alt="Скриншот"
          style={{
            maxWidth: "100%",
            borderRadius: "12px",
            marginTop: "32px"
          }}
        />
      </div>

      {/* Поиск */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <input
          style={{
            color: "#222",
            backgroundColor: "#fff",
            width: "500px",
            height: "50px",
            borderRadius: "100px",
            fontSize: "22px",
            border: "1.5px solid #2563eb",
            padding: "0 32px"
          }}
          type="text"
          placeholder="Іздеу..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Категории (фильтр по типу) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "32px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px 24px",
            maxWidth: "900px",
            justifyContent: "center"
          }}
        >
          {parkingTypes.slice(1).map((cat, idx) => (
            <span
              key={cat}
              onClick={() => setType(cat)}
              style={{
                border: type === cat ? "2px solid #2563eb" : "1.5px solid #222",
                borderRadius: "24px",
                padding: "8px 22px",
                fontSize: "1rem",
                background: type === cat ? "#e8f0fe" : "#fff",
                color: type === cat ? "#2563eb" : "#222",
                fontWeight: 500,
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {cat}
            </span>
          ))}
          
          <span
            onClick={() => setType("Типы")}
            style={{
              border: type === "Типы" ? "2px solid #2563eb" : "1.5px solid #222",
              borderRadius: "24px",
              padding: "8px 22px",
              fontSize: "1rem",
              background: type === "Типы" ? "#e8f0fe" : "#fff",
              color: type === "Типы" ? "#2563eb" : "#222",
              fontWeight: 500,
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            Все типы
          </span>
        </div>
      </div>

      {/* Фильтр по району */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "24px",
          marginLeft: "60px"
        }}
      >
        <label
          style={{
            fontWeight: 500,
            marginRight: "12px",
            fontSize: "1rem",
            color: "#222"
          }}
        >
          Фильтр:
        </label>
        <select
          style={{
            border: "1.5px solid #2563eb",
            borderRadius: "6px",
            padding: "4px 18px 4px 8px",
            fontSize: "1rem",
            color: "#2563eb",
            background: "#fff",
            cursor: "pointer"
          }}
          value={district}
          onChange={e => setDistrict(e.target.value)}
        >
          {districts.map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Карточки парковок */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "32px",
          gap: "18px"
        }}
      >
        {visibleParkings.length === 0 && (
          <div style={{ color: "#2563eb", fontWeight: 600, fontSize: "1.2rem" }}>
            Парковкалар табылмады
          </div>
        )}
        {visibleParkings.map((p, idx) => (
  <Link
    to={`/parking/${p.id}`}
    key={p.id}
    style={{ textDecoration: "none", width: "90%", maxWidth: "700px" }}
  >
    <div
      style={{
        border: "1.5px solid #bdbdbd",
        borderRadius: "6px",
        padding: "18px 24px",
        background: "#fff",
        cursor: "pointer"
      }}
    >
      <div style={{
        color: "#2563eb",
        fontWeight: 600,
        fontSize: "1.2rem",
        marginBottom: "8px"
      }}>
        {p.name}
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "#f59e42",
        fontSize: "1.1rem"
      }}>
        <span>📍</span>
        <span style={{ color: "#222", fontSize: "1rem" }}>{p.address}</span>
      </div>
      <div style={{ marginTop: "6px", color: "#222" }}>
        <div>Телефон <span style={{ marginLeft: 8 }}>{p.phone}</span></div>
        <div>Часы работы <span style={{ marginLeft: 8 }}>{p.hours}</span></div>
        <div>Район <span style={{ marginLeft: 8 }}>{p.district}</span></div>
        <div>Тип <span style={{ marginLeft: 8 }}>{p.type}</span></div>
      </div>
    </div>
  </Link>
))}
        {filteredParkings.length > visibleCount && (
          <button
            style={{
              marginTop: "18px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "10px 32px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
            onClick={() => setVisibleCount(visibleCount + 10)}
          >
            Показать еще
          </button>
        )}
      </div>

      {/* Отзывы */}
      <div
        style={{
          width: "100%",
          background: "#fff",
          marginTop: "48px",
          padding: "32px 0 64px 0"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.6rem",
            fontWeight: 700,
            marginBottom: "40px",
            color: "#111"
          }}
        >
          What our users say<br />
          about us
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            flexWrap: "wrap"
          }}
        >
          {[1, 2, 3, 4].map((item, idx) => (
            <div
              key={idx}
              style={{
                width: "300px",
                minHeight: "180px",
                background: "#fff",
                borderRadius: "18px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                padding: "28px 24px 20px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    background: "#2563eb",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "2rem",
                    marginRight: "10px"
                  }}
                >
                  “
                </div>
                <span style={{ color: "#222", fontWeight: 500, fontSize: "1rem" }}>
                  Lorem ipsum dolor sit amet consectetur. Egestas tortor enim in semper praesent et dignissim. Dictum amet nibh.
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderTop: "1px solid #eee",
                  paddingTop: "12px",
                  marginTop: "12px"
                }}
              >
                <img
                  src={`https://randomuser.me/api/portraits/men/${idx + 10}.jpg`}
                  alt="user"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    marginRight: "10px"
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "1rem", color: "#222" }}>Michael Jackson</div>
                  <div style={{ color: "#fbbf24", fontSize: "1.1rem" }}>★★★★★</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Футер */}
      <footer
        style={{
          width: "100%",
          background: "#0f172a",
          color: "#fff",
          padding: "48px 0 0 0",
          marginTop: "64px"
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "32px",
            padding: "0 24px"
          }}
        >
          {/* Logo & Description */}
          <div style={{ minWidth: "220px", flex: 1 }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "#3b82f6", marginBottom: "12px" }}>
              Park<span style={{ color: "#fff" }}>In</span>
            </div>
            <div style={{ color: "#cbd5e1", fontSize: "1rem", marginBottom: "28px" }}>
              Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit asperna tur aut odit aut fugit, sed quia conse quuntur magni dolores eos qui rati.
            </div>
            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontWeight: 600, color: "#3b82f6", marginBottom: "6px" }}>| Working Days</div>
              <div style={{ color: "#cbd5e1" }}>
                Mon - Fri <span style={{ marginLeft: 18 }}>8:00AM - 11:00PM</span>
              </div>
              <div style={{ color: "#cbd5e1" }}>
                Sat - Sun <span style={{ marginLeft: 18 }}>8:00AM - 5:00PM</span>
              </div>
            </div>
          </div>
          {/* Services */}
          <div style={{ minWidth: "180px", flex: 1 }}>
            <div style={{ fontWeight: 600, color: "#3b82f6", marginBottom: "12px" }}>| Our Services</div>
            <div style={{ color: "#cbd5e1", marginBottom: "8px" }}>› Self Parking Lots</div>
            <div style={{ color: "#cbd5e1", marginBottom: "8px" }}>› Valet Parking</div>
            <div style={{ color: "#cbd5e1", marginBottom: "8px" }}>› Garage Parking</div>
            <div style={{ color: "#cbd5e1", marginBottom: "8px" }}>› Airport Parking</div>
            <div style={{ color: "#cbd5e1", marginBottom: "8px" }}>› Overnight Parking</div>
            <div style={{ color: "#cbd5e1", marginBottom: "8px" }}>› Event Parking</div>
            <div style={{ color: "#cbd5e1", marginBottom: "8px" }}>› Monthly Parking</div>
          </div>
          {/* Estimate */}
          <div style={{ minWidth: "220px", flex: 1 }}>
            <div style={{ fontWeight: 600, color: "#3b82f6", marginBottom: "12px" }}>| Get Free Estimate</div>
            <div style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginBottom: "6px" }}>+06-125-125-6633</div>
            <div style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginBottom: "18px" }}>+06-135-135-6644</div>
            <button
              style={{
                background: "transparent",
                border: "2px solid #3b82f6",
                color: "#fff",
                borderRadius: "6px",
                padding: "8px 28px",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
            >
              Get A Quotation
            </button>
          </div>
          {/* Contacts */}
          <div style={{ minWidth: "220px", flex: 1 }}>
            <div style={{ fontWeight: 600, color: "#3b82f6", marginBottom: "12px" }}>| Get In Touch</div>
            <div style={{ color: "#cbd5e1", marginBottom: "10px" }}>
              <span style={{ marginRight: 8 }}>📍</span>
              824 Bel Meadow Drive, California, USA
            </div>
            <div style={{ color: "#cbd5e1", marginBottom: "10px" }}>
              <span style={{ marginRight: 8 }}>✉️</span>
              Info@parkin.com<br />
              Support@parkin.com
            </div>
            <div style={{ fontWeight: 600, color: "#3b82f6", marginBottom: "8px", marginTop: "18px" }}>| Connect With Us</div>
            <div>
              <a href="#" style={{ color: "#fff", marginRight: "8px", fontSize: "1.2rem", textDecoration: "none", border: "1px solid #3b82f6", borderRadius: "4px", padding: "4px 8px" }}></a>
              <a href="#" style={{ color: "#fff", marginRight: "8px", fontSize: "1.2rem", textDecoration: "none", border: "1px solid #3b82f6", borderRadius: "4px", padding: "4px 8px" }}></a>
              <a href="#" style={{ color: "#fff", marginRight: "8px", fontSize: "1.2rem", textDecoration: "none", border: "1px solid #3b82f6", borderRadius: "4px", padding: "4px 8px" }}></a>
              <a href="#" style={{ color: "#fff", fontSize: "1.2rem", textDecoration: "none", border: "1px solid #3b82f6", borderRadius: "4px", padding: "4px 8px" }}></a>
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid #233056",
            marginTop: "40px",
            padding: "18px 0 8px 0",
            textAlign: "center",
            color: "#cbd5e1",
            fontSize: "0.98rem"
          }}
        >
          © 2020 All rights reserved.
          <span style={{ marginLeft: "24px", color: "#cbd5e1" }}>
            <a href="#" style={{ color: "#cbd5e1", marginRight: "18px", textDecoration: "underline" }}>
              Privacy Policy
            </a>
            <a href="#" style={{ color: "#cbd5e1", textDecoration: "underline" }}>
              Term and Condition
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Home;