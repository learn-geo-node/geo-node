require('dotenv').config()
import { handleError } from '@/utils/handleError';
import 'reflect-metadata';
import { AppDataSource } from './config';

export class Database {
  async initConnection() {
    try {
      await AppDataSource.initialize()
      console.log("> [postgres db] Database connection initialized successfully.") 
    } catch (error) {
      handleError(error);
    }
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