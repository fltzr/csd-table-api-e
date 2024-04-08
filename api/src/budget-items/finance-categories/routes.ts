import { Router } from "express";
import { createFinanceCategory, deleteFinanceCategory, getFinanceCategoryById, getFinanceCategories, updateFinanceCategory } from "./controller";

export const financeCategoriesRoutes = Router();

financeCategoriesRoutes
  .get('/finance-categories/', getFinanceCategories)
  .get('/finance-categories/:id', getFinanceCategoryById)
  .post('/finance-categories/', createFinanceCategory)
  .put('/finance-categories/:id', updateFinanceCategory)
  .delete('/finance-categories/:id', deleteFinanceCategory);