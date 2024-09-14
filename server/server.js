import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import artistRoutes from './routes/artist.js';
import songRoutes from './routes/song.js';
import refreshTokenRoute from './routes/refreshToken.js';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/artist', artistRoutes);
app.use('/song', songRoutes);
app.use('/api', refreshTokenRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
