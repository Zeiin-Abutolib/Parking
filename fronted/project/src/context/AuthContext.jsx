import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Проверяем токен при загрузке
    const token = localStorage.getItem("token");
    return !!token; // Устанавливаем true, если токен есть
  });

  useEffect(() => {
    // Обновляем состояние при изменении токена (опционально)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = () => {
    setIsAuthenticated(true); // Можно добавить сохранение токена
    // Пример: localStorage.setItem("token", "your_token_here");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Удаляем токен при выходе
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);