import { AppDataSource } from '@db/config';
import { DeepPartial } from 'typeorm';
import { User } from './user-entity';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async findAllUsers() {
    return await this.userRepository.find();
  };

  async createUser (input: DeepPartial<User>) {
    return this.userRepository.save(this.userRepository.create(input));
  };
}