import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";
import Profile from "./components/Profile";
import Home from "./components/Home";
import ParkingDetails from "./components/parkingDetails";

import axios from "axios";

const NewPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) formData.append('image', image);

        try {
            const token = localStorage.getItem('token');

            await axios.post('http://localhost:3000/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Пост сәтті жарияланды!');
            setTitle('');
            setContent('');
            setImage(null);
            setPreview(null);
        } catch (e) {
            alert('Қате! Пост жіберілмеді.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                background: "#fff",
                borderRadius: "16px",
                boxShadow: "0 4px 16px rgba(31,41,55,0.10)",
                padding: "32px 28px",
                maxWidth: "480px",
                margin: "0 auto"
            }}
        >
            <h2 style={{
                textAlign: "center",
                color: "#f59e42",
                fontWeight: 700,
                fontSize: "1.5rem",
                marginBottom: "10px"
            }}>Жаңа пост</h2>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Пост тақырыбы"
                required
                style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #c7d2fe",
                    fontSize: "16px",
                    background: "#f3f4f6"
                }}
            />
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Мазмұн..."
                rows={4}
                style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #c7d2fe",
                    fontSize: "16px",
                    background: "#f3f4f6",
                    resize: "vertical"
                }}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                    border: "none",
                    background: "none"
                }}
            />
            {preview && (
                <img src={preview} alt="preview" style={{
                    maxWidth: "100%",
                    borderRadius: "8px",
                    marginBottom: "8px"
                }} />
            )}
            <button
                type="submit"
                style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    background: "linear-gradient(90deg, #f59e42 0%, #fbbf24 100%)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(251,191,36,0.12)",
                    transition: "background 0.2s"
                }}
            >
                Жариялау
            </button>
        </form>
    );
};

function App() {
    return (
        <div style={{
            minHeight: "100vh",
            width: "100vw",
            background: "linear-gradient(120deg, #e0e7ff 0%, #f9fafb 100%)",
            display: "flex",
            flexDirection: "column"
        }}>
            <Router>
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
                        zIndex: 10
                    }}
                >
                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "50%",
                            background: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            color: "#fff",
                            fontSize: "1.3rem"
                        }}>
                            B
                        </div>
                        <span style={{
                            fontWeight: 900,
                            fontSize: "1.3rem",
                            letterSpacing: "1px",
                            color: "black",
                        }}>
                            OSTURAQ
                        </span>
                    </div>


                    <nav style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "32px",
                        fontSize: "1.08rem"
                    }}>
                        <Link to="/" style={{ fontWeight: 700, color: "#111", textDecoration: "none" }}>Басты бет</Link>
                        <Link to="/about" style={{ color: "#222", textDecoration: "none" }}>About</Link>
                        <Link to="/parking" style={{ color: "#222", textDecoration: "none" }}>Parking</Link>
                        <Link to="/prices" style={{ color: "#222", textDecoration: "none" }}>Prices</Link>
                        <Link to="/careers" style={{ color: "#222", textDecoration: "none" }}>Careers</Link>
                        <Link to="/contact" style={{ color: "#222", textDecoration: "none" }}>Contact Us</Link>
                    </nav>

                    {/* Buttons */}
                    <div style={{ display: "flex", gap: "14px" }}>
                        <Link to="/register"
                            style={{
                                background: "#2563eb",
                                color: "#fff",
                                fontWeight: 600,
                                borderRadius: "8px",
                                padding: "8px 22px",
                                fontSize: "1rem",
                                textDecoration: "none",
                                transition: "background 0.2s"
                            }}>
                            Тіркелу
                        </Link>
                        <Link to="/login"
                            style={{
                                background: "#2563eb",
                                color: "#fff",
                                fontWeight: 600,
                                borderRadius: "8px",
                                padding: "8px 22px",
                                fontSize: "1rem",
                                textDecoration: "none",
                                transition: "background 0.2s"
                            }}>
                            Кіру
                        </Link>
                    </div>
                </header>
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
                            <Route path="/newpost" element={<NewPostForm />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </div>
                </main>

            </Router>
        </div>
    );
}

export default App;