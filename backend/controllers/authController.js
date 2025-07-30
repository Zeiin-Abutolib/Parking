const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../config/env');

exports.register = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2)',
            [username, hashed]
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }

};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        next(error);
    }
}