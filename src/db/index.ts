import { handleError } from '@/utils/handleError';
import 'reflect-metadata';
import { AppDataSource } from './config';

export class Database {
  static instance: Database;

  constructor() {
    AppDataSource.initialize()
    .then(() => {
      console.log("> [postgres db] Database connection initialized successfully.");
    })
    .catch(error => {
      handleError(error);
    })
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }

  async closeConnection() {
    try {
      await AppDataSource.destroy();
      console.log(' > [postgres db] Database connection destroyed.')      
    } catch (error) {
      handleError(error);
    } 
  }
}