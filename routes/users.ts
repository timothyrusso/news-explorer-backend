import { Router } from 'express';
import { getCurrentUser } from '../controllers/users.js';

const router = Router();

router.get('/users/me', getCurrentUser);

export default router;
