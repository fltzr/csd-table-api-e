import { Router } from "express";
import { createBudgetItem, deleteBudgetItem, getBudgetItemById, getBudgetItems, updateBudgetItem } from "./controller";

export const coreBudgetItemsRoutes = Router();

coreBudgetItemsRoutes
  .get('/', getBudgetItems)
  .get('/:id', getBudgetItemById)
  .post('/', createBudgetItem)
  .put('/:id', updateBudgetItem)
  .delete('/:id', deleteBudgetItem);