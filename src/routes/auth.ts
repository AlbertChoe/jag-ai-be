import { Router } from 'express';

import { login, register } from '../controller/authController';
import { validate } from '../middleware/validate';
import { loginSchema, registerSchema } from '../schema/authSchemas';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
