import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

interface HttpRequestI<P extends ParamsDictionary = {}> {
  req: Request<P>;
  res: Response;
}

interface HttpMiddlewareI extends HttpRequestI<any> {
  next: NextFunction;
}

export { HttpRequestI, HttpMiddlewareI };
