import 'dotenv/config';
import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import testRoutes from './routes';
import HttpException, { sanitize } from './shared/http-exception';
import locals from './shared/locals.json';
import { logger } from './shared/logger';

const createServer = (): express.Application => {
  const app: Application = express();
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/test', testRoutes);

  // eslint-disable-next-line no-unused-vars
  app.use('/', (_req: Request, res: Response) => {
    return res.json({ message: 'Health!' });
  });

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  app.use((_req: Request, _res: Response) => {
    throw new HttpException(404, locals.error_not_found);
  });

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  app.use((err: HttpException, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err);
    err = sanitize(err);
    return res.status(err.status).json({ err: err.message });
  });
  return app;
};

export default createServer;
