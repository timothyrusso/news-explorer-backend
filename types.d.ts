import { UserPayload } from "./controllers/types";

declare module 'express-serve-static-core' {
  export interface Request {
    user: UserPayload;
  }
}
