import { relations } from 'drizzle-orm';
import { date, index, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { budgetItemTable } from './budget-item';

// Define custom types
export const genderEnum = pgEnum('gender', ['male', 'female', 'other', 'prefer_not_to_say']);

// Define User table
export const userTable = pgTable(
  'user',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    username: text('username').unique().notNull(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    birthDate: date('birth_date', { mode: 'string' }).notNull(),
    gender: genderEnum('gender').default('prefer_not_to_say'),
    zipCode: text('zip_code').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    username_idx: index('username_idx').on(table.username),
  }),
);

export const userRelations = relations(userTable, ({ many }) => ({
  budgetItems: many(budgetItemTable),
}));

// Infer types from schema
export const SelectUser = userTable.$inferSelect;
export const InsertUser = userTable.$inferInsert;
