import { Response } from "express";
import { UserService } from "../user.service";
import { UserRouterProps } from "./interface";
const { findAllUsers } =  UserService.getInstance();

export const allUsersRoute: UserRouterProps = {
  method: "get",
  path: '',
  controller: async (res: Response) => {    
    return res.status(200).send(await findAllUsers());
  },
}