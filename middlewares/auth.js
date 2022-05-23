const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const ForbiddenError = require('../errors/forbidden-err');

// Middleware that check on every request if the user have the authorization
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new ForbiddenError('Authorization Required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'casual-secret-key');
  } catch (err) {
    return next(new ForbiddenError('Authorization Required'));
  }

  req.user = payload; // assigning the payload to the request object

  return next(); // sending the request to the next middleware
};
