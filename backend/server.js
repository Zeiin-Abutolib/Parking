const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('./config/db');
const { authMiddleware } = require('./middleware/auth');
require('dotenv').config();

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Подключение к PostgreSQL
pool.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к PostgreSQL:', err.stack);
  } else {
    console.log('Подключено к PostgreSQL');
  }
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Регистрация
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashed]);
    res.status(201).json({ message: 'Регистрация успешна' });
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Вход
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: 'Неверный логин' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Неверный пароль' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error('Ошибка логина:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Создание брони
app.post('/bookings', authMiddleware, async (req, res) => {
  const { name, date, parking_id } = req.body;

  if (!name || !date) {
    return res.status(400).json({ message: 'Имя и дата обязательны' });
  }

  try {
    await pool.query(
      'INSERT INTO bookings (name, date, parking_id) VALUES ($1, $2, $3)',
      [name, date, parking_id || null]
    );
    res.status(201).json({ message: 'Бронь сохранена' });
  } catch (err) {
    console.error('Ошибка бронирования:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получение всех броней
app.get('/bookings', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, date, parking_id FROM bookings ORDER BY date DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка получения броней:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});