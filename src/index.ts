import http from 'http';
import { Express } from 'express';
import Env from './shared/utils/env';
import app from './config/express';
import { AppEnv } from './shared/enums';

async function main(app: Express): Promise<void> {

  const server = http.createServer(app);

  const PORT = Env.get<number>('PORT') || 8080;
  const NODE_ENV = Env.get<string>('NODE_ENV');

  NODE_ENV !== AppEnv.STAGING &&
    server.on('listening', () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });

  server.listen(PORT);
}

main(app);
