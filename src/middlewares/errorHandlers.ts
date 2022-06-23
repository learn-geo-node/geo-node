import { HttpErrorMessages, NotFoundError } from "@errors";
import { NextFunction, Request, Response } from "express";

export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
  const err = new NotFoundError(HttpErrorMessages.NOT_FOUND);
  next(err);
}