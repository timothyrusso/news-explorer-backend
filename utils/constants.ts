import rateLimit from 'express-rate-limit';

const REQUEST_SUCCEDED: number = 200;
const RESOURCE_CREATED: number = 201;
const INTERNAL_SERVER_ERROR: number = 500;

const JWT_DEVELOPMENT: string = 'casual-secret-key';

const FRONTEND_URL: string = 'https://newsexplorer23.netlify.app/';

const limiter = rateLimit({
  // Limit repeated requests to public APIs and/or endpoints
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

export {
  REQUEST_SUCCEDED,
  RESOURCE_CREATED,
  INTERNAL_SERVER_ERROR,
  JWT_DEVELOPMENT,
  limiter,
  FRONTEND_URL,
};
