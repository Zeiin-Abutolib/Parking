import express from 'express';
import { upload } from '../middleware/upload.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import db from '../db.js';

const router = express.Router();

router.post('/posts', authMiddleware, upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title) return res.status(400).json({ message: 'Title required' });

    db.query(
        'INSERT INTO posts (title, content, image) VALUES ($1, $2, $3)',
        [title, content, image],
        (err) => {
            if (err) return res.status(500).json({ error: 'DB error' });
            res.status(201).json({ message: 'Post created' });
        }
    );
}); 

export default router;