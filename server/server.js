import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import artistRoutes from './routes/artist.js';
import songRoutes from './routes/song.js';
import refreshTokenRoute from './routes/refreshToken.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ALLOWED_ORIGINS } from './config.js';



const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser()); // Middleware to parse cookies

// Set allowed origins for CORS
const allowed_origins = ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(",") : [];

// CORS options
const corsOptions = {
    origin: allowed_origins, // Allow specified origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

// Use CORS middleware with the defined options
app.use(cors(corsOptions));

// Define routes
app.use('/auth', authRoutes);
app.use('/artist', artistRoutes);
app.use('/song', songRoutes);
app.use('/refresh_token', refreshTokenRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
