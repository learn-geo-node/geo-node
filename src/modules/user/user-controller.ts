import { NotFoundError, Conflict, InternalServerError } from "@/errors";
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
      return res.send(new NotFoundError());
    }
    
    return res.status(200).send(user);
  };

  createUser = async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
    
    try {
      await this.userService.addUser(req.body);

      return res.status(201).send("User created successfully.")
    } catch (error) {
      
      if (error.code === '23505') {
        return res.send(new Conflict("Account already exists."));
      }

      return res.send(new InternalServerError());
    }
  }
}

interface CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}
