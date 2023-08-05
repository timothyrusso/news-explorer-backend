export interface UserPayload {
    _id: string;
  }
export interface ValidationError extends Error {
    errors: Record<string, { message: string }>;
  }