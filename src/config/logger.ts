import { createLogger, transports, format } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`);

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [new transports.Console()],
});

export default logger;
