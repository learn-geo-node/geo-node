
import { Request, Response } from "express";
import { DUPLICATE_KEY_VALUE_ERROR } from "@/constants";
import { NotFoundError, Conflict, InternalServerError } from "@/errors";
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
    const { id } = req.params;
    const user = await this.userService.findUserById(id);

    if (!user) {
      return res.status(404).send(new NotFoundError(`User not found`));
    }
    
    return res.status(200).send(user);
  };

  removeUserById = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.findUserById(id);

    if (!user) {
      return res.status(404).send(new NotFoundError(`User not found`));
    }

    this.userService.deleteUserById(id);
    
    return res.status(200).send({ message: "User deleted successfully." });
  };

  createUser = async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
    
    try {
      await this.userService.addUser(req.body);

      return res.status(201).send("User created successfully.")
    } catch (error) {
      
      if (error.code === DUPLICATE_KEY_VALUE_ERROR) {
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
