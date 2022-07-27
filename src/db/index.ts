import 'reflect-metadata';
import { AppDataSource } from './config';

export class Database {
  static closeConnection() {
    AppDataSource.destroy()
      .then(async () => {  
        console.log('Database connection destroyed.')
    })
    .catch(error => console.error(error)); 
  }
}