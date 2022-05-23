const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const NotFoundError = require('../errors/not-found-err');
const { createUser, login } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/', usersRouter);
router.use('/', articlesRouter);

router.use((req, res, next) => {
  next(new NotFoundError('No page found for the specified route'));
});

module.exports = router;
