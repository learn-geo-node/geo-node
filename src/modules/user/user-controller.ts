import { NotFoundError } from "@/errors";
import { Request, Response } from "express";
import { UserService } from "./user-service";
export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const userService = new UserService();
    
    return res.status(200).send(await userService.findAllUsers());
  };

  static async getUserById(req: Request<{ id: string }, {}, {}>, res: Response) {
    const userService = new UserService();
    const user = await userService.findUserById(req.params.id);

    if (!user) {
      return res.status(404).send(new NotFoundError());
    }
    
    return res.status(200).send(user);
  };
}