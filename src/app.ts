import { configuration } from '@/app-config';
import { AppDataSource } from './db/config';
import { App } from './server';

export const runApp = () => {
  AppDataSource.initialize()
  .then(() => {
    console.log("> [postgres db] Database connection initialized successfully.")
  
    const app = new App(configuration);
    app.initServerConnection();
  })
  .catch(error => {
    console.error(error);
  })
}

runApp();
