import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { env } from '../config';

import { budgetItemTable, financeCategoryTable, userDefinedLabelTable } from './schema/budget-item';
import { userTable } from './schema/user';

let pool: Pool;
let db: NodePgDatabase<{
  users: typeof userTable;
  budgetItems: typeof budgetItemTable;
  financeCategories: typeof financeCategoryTable;
  userDefinedLabels: typeof userDefinedLabelTable;
}>;

export const initializeDrizzleInstance = async () => {
  if (!db) {
    pool = new Pool({
      connectionString: env.POSTGRESQL_DATABASE_URL,
    });

    db = drizzle(pool, {
      schema: {
        users: userTable,
        budgetItems: budgetItemTable,
        financeCategories: financeCategoryTable,
        userDefinedLabels: userDefinedLabelTable,
      },
      logger: true,
    });
  }

  return db;
};

export const PostgresqlPool = () => {
  if (!pool) {
    throw new Error('PostgreSQL pool not initialized. Call initializeDrizzleInstance() first.');
  }

  return pool;
};

export const DrizzleInstance = () => {
  if (!db) {
    throw new Error('Drizzle ORM instance not initialized. Call initializeDrizzleInstance() first.');
  }

  return db;
};

export const closeDrizzleInstance = async () => {
  if (pool) {
    await pool.end();
  }
};
