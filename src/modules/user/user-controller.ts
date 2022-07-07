import { NotFoundError } from '@/errors';
import { HttpRequestI } from '@/interfaces';
import { UserService } from './user-service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async ({ res }: HttpRequestI) => {
    return res.status(200).send(await this.userService.findAllUsers());
  };

  getUserById = async ({ req, res }: HttpRequestI<{ id: string }>) => {
    const user = await this.userService.findUserById(req.params.id);

    if (!user) {
      return res.status(404).send(new NotFoundError());
    }

    return res.status(200).send(user);
  };
}
