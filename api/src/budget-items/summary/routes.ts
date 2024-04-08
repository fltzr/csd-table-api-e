import { Router } from "express";
import { getBudgetItemsSummary, getBudgetItemsSummaryById } from "./controller";

export const budgetItemsSummaryRoutes = Router();

budgetItemsSummaryRoutes
  .get('/summary', getBudgetItemsSummary)
  .get('/summary/:id', getBudgetItemsSummaryById);