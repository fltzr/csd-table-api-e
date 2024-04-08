import { Router } from "express";

import { authRoutes } from "./auth/auth.routes";
import { budgetItemsFeatureRoutes } from "./budget-items/routes";

export const router = Router();

router
  .use('/auth', authRoutes)
  .use('/budget-items', budgetItemsFeatureRoutes);
