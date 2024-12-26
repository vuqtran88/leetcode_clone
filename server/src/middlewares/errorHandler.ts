import { NextFunction, Response, Request } from "express";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { message, stack } = error;
  const status = res.statusCode || 500;
  res.status(status).json({
    message,
    status,
    stack: process.env.NODE_ENV === "production" ? "🥞" : stack,
  });
};

/* eslint-enable @typescript-eslint/no-unused-vars */
