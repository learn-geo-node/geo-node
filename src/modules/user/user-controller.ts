import { Request, Response } from "express";
import { UserService } from "./user-service"

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const userService = new UserService();
    
    return res.status(200).send(await userService.findAllUsers());
  };
}