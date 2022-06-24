import { UserService } from "./user-service"

export class UserController {
  static service = new UserService();

  static async getAllUsers() {
    await this.service.findAllUsers();
  };
}