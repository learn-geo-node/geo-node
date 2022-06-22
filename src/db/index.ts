require('dotenv').config()
import 'reflect-metadata';
import { AppDataSource } from './config';
import { User } from '../modules/user/entity/User';

export const initDbConnection = () => {
  AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            firstName: "Kamil",
            lastName: "Ślimak",
            age: 18
        })
    )
  })
  .catch(error => console.error(error)); 
}