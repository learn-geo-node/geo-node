import { NotFoundError } from "@/errors";
import { Request, Response } from "express";
import { UserService } from "../user.service";
import { UserRouterProps } from "./interface";
const { findUserById } =  UserService.getInstance();

export const userByIdRoute: UserRouterProps = {
  method: "get",
  path: '/:id',
  controller: async (req: Request<{ id: string }, {}, {}>, res: Response) => {    
    const { id } = req.params;
    const user = await findUserById(id);

    if (!user) {
      return res.status(404).send(new NotFoundError(`User not found`));
    }
    
    return res.status(200).send(user);
  },
}