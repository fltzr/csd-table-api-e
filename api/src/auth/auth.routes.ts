import { Router } from 'express';

import {
  pageloadController,
  signinController,
  signupController,
  signoutController,
  userinfoController,
} from './auth.controller';
import { signinSchema, signupSchema } from './auth.zschema';
import { validateWithZod } from '../core/middleware/validation.middleware';

export const authRoutes: Router = Router();

authRoutes
  .post('/pageload', pageloadController)
  .post('/signin', validateWithZod(signinSchema), signinController)
  .post('/signup', validateWithZod(signupSchema), signupController)
  .post('/signout', signoutController)
  .get('/userinfo', userinfoController);
