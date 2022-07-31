import express from "express";
import { RequestHandler } from "express-serve-static-core";
import { ParsedQs } from "qs";

export type HTTPMethod = "get" | "post" | "put" | "patch" | "delete";

export interface UserRouterProps {
  method: HTTPMethod;
  path: string;
  controller: RequestHandler<{ id: string }, any, any, ParsedQs, Record<string, any>>;
  router?: express.Router;  
}

export const BASE_USER_ROUTE = '/api/users';