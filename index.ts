import { logger } from './shared/logger';
import createServer from './app';
import { getEnv } from './shared/utils';

const port: number = Number(getEnv('PORT'));

const app = createServer();

try {
  app.listen(port, (): void => {
    logger.info('Connected successfully on port', port);
  });
} catch (error) {
  logger.error(error);
}
