import { Request as ExpressRequest } from "express";

export interface UserPayload {
    _id: string;
  }
  
export interface Request extends ExpressRequest {
    user: UserPayload;
  }

export interface ValidationError extends Error {
    errors: Record<string, { message: string }>;
  }