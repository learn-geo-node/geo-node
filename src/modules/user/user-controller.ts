import { NotFoundError } from "@/errors";
import { Request, Response } from "express";
import { UserService } from "./user-service";
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (_: Request, res: Response) => {    
    return res.status(200).send(await this.userService.findAllUsers());
  };

  getUserById = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const user = await this.userService.findUserById(req.params.id);

    if (!user) {
      return res.status(404).send(new NotFoundError());
    }
    
    return res.status(200).send(user);
  };
}