import { resolve } from 'path';
import { cwd } from 'process';

import { config } from 'dotenv';
import { cleanEnv, bool, port, str, url } from 'envalid';

config({ path: resolve(cwd(), '.env.local') });

export const env = cleanEnv(process.env, {
  // General configuration
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  PORT: port({ devDefault: 5174 }),
  SESSION_SECRET: str(),
  LOG_FORMAT: str({ choices: ['combined', 'dev', 'simple'] }),
  LOG_DIR: str({ devDefault: '../../../logs' }),
  ORIGIN: url(),
  CREDENTIALS: bool({ default: true }),

  // PostgreSQL configuration
  POSTGRESQL_DATABASE_URL: url(),
});
