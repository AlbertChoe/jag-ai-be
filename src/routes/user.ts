import { Router } from 'express';
import { getProfile, updateProfile } from '../controller/userController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { updateUserSchema } from '../schema/userSchema';

const router = Router();

router.get('/me', authMiddleware, getProfile);
router.put('/update-profile', authMiddleware, validate(updateUserSchema), updateProfile);

export default router;
