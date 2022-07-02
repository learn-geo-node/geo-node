require('dotenv').config()
import 'reflect-metadata';
import { AppDataSource } from './config';

export class Database {
  static initConnection() {
      AppDataSource.initialize()
      .then(() => {
        console.log("> [postgres db] Database connection initialized successfully.")
      })
  }

  static closeConnection() {
    AppDataSource.destroy()
      .then(async () => {  
        console.log('Database connection destroyed.')
    })
    .catch(error => console.error(error)); 
  }
}