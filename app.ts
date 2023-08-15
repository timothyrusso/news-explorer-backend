import express, { RequestHandler, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import routes from './routes/index.js';
import { requestLogger, errorLogger } from './middlewares/logger';
import error from './middlewares/error';
import { config as dotenvConfig } from 'dotenv';
import { limiter, FRONTEND_URL } from './utils/constants';

dotenvConfig();

const app = express();

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/newsdb', NODE_ENV = 'development' } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/newsdb', (err) => {
  if (err) {
    console.log('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

app.use(express.json()); // To parse the incoming requests with JSON payloads

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(helmet());

app.use(requestLogger); // enabling the request logger

app.use(limiter);

const corsMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.header(
    'Access-Control-Allow-Origin',
    NODE_ENV === 'production' ? FRONTEND_URL : 'http://localhost:3000/',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
};

app.use(corsMiddleware);

app.use(cors());

app.options('*', cors()); // Enable requests for all routes

app.use(routes);

app.use(errorLogger); // enabling the error logger

app.use(errors()); // celebrate error handler

app.use(error); // error middleware

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line no-console
});
