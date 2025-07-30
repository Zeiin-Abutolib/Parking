const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const rateLimit = require('express-rate-limit');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }catch (error) {
        res.sendStatus(403).json({ message: 'Invalid token' });
    }
};



const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
};

const Limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many requests, please try again later.',
    statusCode: 429,
});


module.exports = {
    authMiddleware,
    errorHandler,
    Limiter
};