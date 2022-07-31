import { AppDataSource } from '@/db/config';
import { DeepPartial } from 'typeorm';
import { User } from './user.entity';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  static instance: UserService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  async findAllUsers() {
    try {
      return await this.userRepository.find();      
    } catch (error) {
      return;
    }
  };

  async findUserById(userId: string) {

    try {
      return await this.userRepository.findOne({ where: { id: userId } })      
    } catch (error) {
      return;
    }
  };

  async deleteUserById(userId: string) {

    try {
      return await this.userRepository.delete({ id: userId })      
    } catch (error) {
      return;
    }
  };

  async addUser (input: DeepPartial<User>) {
    return this.userRepository.save(this.userRepository.create(input));
  };
}