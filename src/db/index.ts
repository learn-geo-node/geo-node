require('dotenv').config()
import { User } from '@modules/user/user-entity';
import 'reflect-metadata';
import { AppDataSource } from './config';

export class Database {
  static initConnection() {
    AppDataSource.initialize()
      .then(async () => {  
        console.log('Database connection initialize successfully.')

        await AppDataSource.manager.save(
            AppDataSource.manager.create(User, {
                firstName: "Kamil",
                lastName: "Ślimak",
                email: "kamilslimak@go.co"
            })
        )
    })
    .catch(error => console.error(error)); 
  }
}