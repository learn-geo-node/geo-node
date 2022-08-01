import { Request, Response } from "express";
import { UserService } from "./user.service";

export const BASE_USER_ROUTE = '/api/users';

type UserRouteNames = 'getAllUsers' | 'getUserById' | 'createUser' | 'updateUser' | 'deleteUser';
type HTTPMethod = "get" | "post" | "put" | "patch" | "delete";
type UserPaths = '' | '/:id';

interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserRouterProps {
  service: UserService; 
  routes: {
    name: UserRouteNames;
    method: HTTPMethod;
    path: UserPaths;
    controller: (req: Request<{ id: string }, {}, CreateUserInput>, res: Response) => Promise<Response<any, Record<string, any>>>;
  }[];
};