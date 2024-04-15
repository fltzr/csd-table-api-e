import { Router } from 'express';

import { authRoutes } from './auth/auth.routes';
import { budgetItemsFeatureRoutes } from './budget-items/routes';
import { exampleRoutes } from './test/routes';

export const router = Router();

router
  .use(exampleRoutes)
  .use('/auth', authRoutes)
  .use('/budget-items', budgetItemsFeatureRoutes);
