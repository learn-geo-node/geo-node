import { AppDataSource } from '@/db/config';
import { DeepPartial } from 'typeorm';
import { User } from './user-entity';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async findAllUsers() {
    return this.userRepository
      .find()
      .then((res) => res)
      .catch(() => undefined);
  }

  async findUserById(userId: string) {
    return this.userRepository
      .findOne({ where: { id: userId } })
      .then((res) => res)
      .catch(() => undefined);
  }

  async createUser(input: DeepPartial<User>) {
    return this.userRepository.save(this.userRepository.create(input));
  }
}
