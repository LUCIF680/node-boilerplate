import winston, { Logger } from 'winston';
import 'dotenv/config';
const { combine, timestamp, colorize, errors } = winston.format;

export const logger: Logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'prod') {
  logger.add(
    new winston.transports.Console({
      format: combine(
        errors({ stack: true }), // <-- use errors format
        colorize(),
        timestamp(),
      ),
    }),
  );
}
