import { Router } from 'express';
import auth from '../middlewares/auth.js';
import usersRouter from './users.js';
import articlesRouter from './articles.js';
import NotFoundError from '../errors/not-found-err.js';
import { createUser, login } from '../controllers/users.js';
import {
  validateAuthentication,
  validateUserCreation,
} from '../middlewares/validations.js';

const router = Router();

router.post('/signup', validateUserCreation, createUser);
router.post('/signin', validateAuthentication, login);

router.use(auth);
router.use('/', usersRouter);
router.use('/', articlesRouter);

router.use((req, res, next) => {
  next(new NotFoundError('No page found for the specified route'));
});

export default router;
