import { Request, Response } from "express";
import { UserService } from "./user.service";

export type HTTPMethod = "get" | "post" | "put" | "patch" | "delete";

interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

type UserRouteNames = 'getAllUsers' | 'getUserById' | 'createUser' | 'updateUser' | 'deleteUser';

type UserPaths = '' | '/:id';

export interface UserRouterProps {
  service: UserService; 
  routes: {
    name: UserRouteNames;
    method: HTTPMethod;
    path: UserPaths;
    controller: (req: Request<{ id: string }, {}, CreateUserInput>, res: Response) => Promise<Response<any, Record<string, any>>>;
  }[];
};

export const BASE_USER_ROUTE = '/api/users';