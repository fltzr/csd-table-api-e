import compression from 'compression';
import connectPgSimple from 'connect-pg-simple';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, json, urlencoded } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';


import { router } from '../routes';
import { env } from '../core/config';
import { initializeDrizzleInstance, PostgresqlPool } from '../core/database/drizzle';
import { logger } from '../core/utils/winston-logger';

export const createApplicaton = async () => {
  const app = express();

  // Initialize Drizzle instance
  await initializeDrizzleInstance().catch((error) => {
    logger.error(`❌ Error while initializing Drizzle: ${error}`);
  });

  // Initialize Express middleware
  initializeMiddleware(app);

  // Initialize session store
  initializeSessionStore(app);

  // Initialize Express routes
  initializeRoutes(app);

  // Start notification cron
  // notificationCron.start();

  logger.info('✅ Application initialized.');
  return app;
};

const initializeMiddleware = (app: Application) => {
  logger.info(`! Debug: ${env.ORIGIN}`);

  app.use(morgan('dev'));
  app.use(cors({
    origin: env.ORIGIN,
    credentials: true,
  }));
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());
};

const initializeSessionStore = (app: Application) => {
  const pgSession = connectPgSimple(session);
  const pgSessionStore = new pgSession({
    pool: PostgresqlPool(),
    createTableIfMissing: true,
    schemaName: 'public',
    tableName: 'session',
    ttl: 60000,
    pruneSessionInterval: 30000,
    errorLog: logger.error.bind(logger),
  });

  app.use(
    session({
      secret: env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        sameSite: true,
        maxAge: 1000 * 60 * 30,
      },
      store: pgSessionStore,
    }),
  );
};

const initializeRoutes = (app: Application) => {
  logger.info('🚀 Initializing routes...');
  app.use('/api', router);
};
