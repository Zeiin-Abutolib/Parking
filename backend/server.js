const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { PORT } = require('./config/env');
const { authMiddleware, errorHandler, Limiter } = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api', Limiter);
app.use(authRoutes);

app.use('/api/secure', authMiddleware, (req, res) => {
    res.json({ message: 'This is a secure route', user: req.user });
});
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
