import { HttpError, HttpErrorMessages, NotFoundError } from "@/errors";
import { NextFunction, Request, Response } from "express";

export function handleAnyError(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (res.headersSent) {
      return next(err);
  }

  if (process.env.NODE_ENV !== 'production') {
      res.status(err.status).json({
          message: err.message,
          stack: err.stack,
      });
  } else {
      res.status(err.status).json({ message: err.message });
  }
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
  const err = new NotFoundError(HttpErrorMessages.NOT_FOUND);
  next(err);
}