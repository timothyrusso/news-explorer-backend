import { Router } from 'express';
import auth from '../middlewares/auth';
import usersRouter from './users';
import articlesRouter from './articles';
import NotFoundError from '../errors/not-found-err';
import { createUser, login } from '../controllers/users';
import {
  validateAuthentication,
  validateUserCreation,
} from '../middlewares/validations';

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
