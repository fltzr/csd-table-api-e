import { Router } from "express";

import { authRoutes } from "./auth/auth.routes";
import { budgetItemsFeatureRoutes } from "./budget-items/routes";
import { exampleRouter } from "./test/example";

export const router = Router();

router
  .use(exampleRouter)
  .use('/auth', authRoutes)
  .use('/budget-items', budgetItemsFeatureRoutes);
