import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ForbiddenError from '../errors/forbidden-err.js';
import { JWT_DEVELOPMENT } from '../utils/constants.js';
import { UserPayload } from '../controllers/types.js';

interface RequestWithUser extends Request {
  user: UserPayload;
}

// Middleware that check on every request if the user have the authorization
  export default (req: RequestWithUser, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new ForbiddenError('Authorization Required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : JWT_DEVELOPMENT);
  } catch (err) {
    return next(new ForbiddenError('Authorization Required'));
  }

  req.user = payload as UserPayload; // assigning the payload to the request object

  return next(); // sending the request to the next middleware
};
