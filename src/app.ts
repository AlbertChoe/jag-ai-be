import express from 'express';
import { json, urlencoded } from 'body-parser';
import expressWinston from 'express-winston';
import logger from './config/logger';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import healthRouter from './routes/health';
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(
  cors({
    origin: ['http://localhost:3000/', 'https://jag-ai-fe.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  }),
);

// routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/health', healthRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// error handling
app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  }),
);
app.use(errorHandler);

export default app;
