import { Request, Response, NextFunction } from 'express';

export default (err: { statusCode?: number; message: string }, req: Request, res: Response, next: NextFunction): void => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
};
