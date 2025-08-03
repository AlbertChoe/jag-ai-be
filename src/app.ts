import express, { Application, Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import healthRouter from './routes/health';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: false }));

// Health check route
app.use('/health', healthRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

export default app;
