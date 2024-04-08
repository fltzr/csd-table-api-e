import { Router } from 'express';

import {
  pageloadController,
  signinController,
  signupController,
  signoutController,
  userinfoController,
} from './auth.controller';
import { signinSchema, signupSchema } from './auth.zschema';
import { validate } from '../core/middleware/validation.middleware';

export const authRoutes: Router = Router();

authRoutes
  .post('/pageload', pageloadController)
  .post('/signin', validate(signinSchema), signinController)
  .post('/signup', validate(signupSchema), signupController)
  .post('/signout', signoutController)
  .get('/userinfo', userinfoController);
