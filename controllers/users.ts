import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import User from '../models/user';
import UnauthorizedError from '../errors/unauthorized-err';
import ConflictError from '../errors/conflict-err';
import BadRequestError from '../errors/bad-request-err';
import NotFoundError from '../errors/not-found-err';
import { 
  REQUEST_SUCCEDED, RESOURCE_CREATED, JWT_DEVELOPMENT 
} from '../utils/constants';
import { UserPayload, ValidationError } from './types';

const { NODE_ENV, JWT_SECRET } = process.env;

// GET users/me
export const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => new NotFoundError('No user found with that id'))
    .then((user) => {
      res.status(REQUEST_SUCCEDED).send({ data: user });
    })
    .catch(next);
};

// POST /signup
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(
          'The user with the provided email already exist',
        );
      } else {
        return bcrypt.hash(password, 10); // hashing the password
      }
    })
    .then((hash) => User.create({
      email,
      password: hash, // adding the hash to the database
      name,
    }))
    .then((user) => res.status(RESOURCE_CREATED).send({ data: user }))
    .catch((err: ValidationError) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(', ')}`,
          ),
        );
      } else {
        next(err);
      }
    });
};

// POST /signin
export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_DEVELOPMENT,
        { expiresIn: '7d' },
      );
      res.send({ data: user.toJSON(), token }); // Send back to the frontend the user obj
    })
    .catch(() => {
      next(new UnauthorizedError('Incorrect email or password'));
    });
};
