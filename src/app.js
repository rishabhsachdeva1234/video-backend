import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { routes } from './routes/index.routes.js';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use('/api', routes);

export { app };
