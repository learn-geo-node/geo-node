require('dotenv').config()
import 'reflect-metadata';
import { AppDataSource } from './config';

export class Database {
  static initConnection() {
    throw new Error('Method not implemented.');
  }
  initConnection() {
    AppDataSource.initialize()
    .catch(error => console.error(error)); 
  }
}