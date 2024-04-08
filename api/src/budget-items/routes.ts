import { Router } from "express";
import { budgetItemsSummaryRoutes } from "./summary/routes";
import { coreBudgetItemsRoutes } from "./core-budget-item/routes";
import { financeCategoriesRoutes } from "./finance-categories/routes";
import { userDefinedLabelsRoutes } from "./user-defined-labels/routes";

export const budgetItemsFeatureRoutes = Router();

budgetItemsFeatureRoutes
.use(budgetItemsSummaryRoutes)
.use(financeCategoriesRoutes)
.use(userDefinedLabelsRoutes)
.use(coreBudgetItemsRoutes)