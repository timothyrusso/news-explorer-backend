import { Router } from 'express';
import { getCurrentUser } from '../controllers/users';

const router = Router();

router.get('/users/me', getCurrentUser);

export default router;
