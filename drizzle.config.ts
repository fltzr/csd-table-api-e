import { defineConfig } from 'drizzle-kit';

import { env } from './api/src/core/config';

export default defineConfig({
  schema: '/api/src/core/database/schema/*',
  out: 'drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.POSTGRESQL_DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
