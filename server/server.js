import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import artistRoutes from './routes/artist.js';
import songRoutes from './routes/song.js';
import refreshTokenRoute from './routes/refreshToken.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ALLOWED_ORIGINS } from './config.js';



dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowed_origins = ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(",") : []
console.log("AllowedOrigin", ALLOWED_ORIGINS, ALLOWED_ORIGINS)



const corsOptions = {
    origin: allowed_origins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
};

app.use(cors(corsOptions));

app.use('/auth', authRoutes);
app.use('/artist', artistRoutes);
app.use('/song', songRoutes);
app.use('/refresh_token', refreshTokenRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
