import { relations } from 'drizzle-orm';
import { pgTable, serial, uuid, integer, numeric, text, date } from 'drizzle-orm/pg-core';

import { userTable } from './user';

export const financeCategoryTable = pgTable('finance_category', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').notNull().defaultRandom().unique(),
  name: text('name').notNull().unique(),
});

export const userDefinedLabelTable = pgTable('user_defined_label', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').notNull().defaultRandom().unique(),
  name: text('name').notNull().unique(),
  color: text('color').notNull(),
});

export const budgetItemTable = pgTable('budget_item', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').notNull().defaultRandom().unique(),
  name: text('name').notNull().unique(),
  amount: numeric('amount').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id),
  financeCategoryId: integer('finance_category_id').references(() => financeCategoryTable.id),
  userDefinedLabelId: integer('user_defined_label_id').references(() => userDefinedLabelTable.id),
  createdAt: date('created_at').notNull().defaultNow(),
  updatedAt: date('updated_at').notNull().defaultNow(),
});

export const financeCategoryRelations = relations(financeCategoryTable, ({ many }) => ({
  budgetItems: many(budgetItemTable),
}));

export const userDefinedLabelRelations = relations(userDefinedLabelTable, ({ many }) => ({
  budgetItems: many(budgetItemTable),
}));

export const budgetItemRelations = relations(budgetItemTable, ({ one }) => ({
  user: one(userTable, {
    fields: [budgetItemTable.userId],
    references: [userTable.id],
  }),
  financeCategory: one(financeCategoryTable, {
    fields: [budgetItemTable.financeCategoryId],
    references: [financeCategoryTable.id],
  }),
  userDefinedLabel: one(userDefinedLabelTable, {
    fields: [budgetItemTable.userDefinedLabelId],
    references: [userDefinedLabelTable.id],
  }),
}));

export type InsertFinanceCategory = typeof financeCategoryTable.$inferInsert;
export type SelectFinanceCategory = typeof financeCategoryTable.$inferSelect;

export type InsertUserDefinedLabel = typeof userDefinedLabelTable.$inferInsert;
export type SelectUserDefinedLabel = typeof userDefinedLabelTable.$inferSelect;

export type InsertBudgetItem = typeof budgetItemTable.$inferInsert;
export type SelectBudgetItem = typeof budgetItemTable.$inferSelect;
