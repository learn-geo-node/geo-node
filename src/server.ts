import { AppConfiguration } from '@app-config';
import { handleAnyError, notFoundHandler } from '@middlewares/errorHandlers';
import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import { Database } from './db';
import validateCustomEnv from '@utils/validateCustomEnv';
import userRouter from '@modules/user/user-router';

export class App {
  databaseInstance: void;
  configuration: AppConfiguration;

  constructor(configuration: AppConfiguration) {
    this.configuration = configuration;
    this.databaseInstance = Database.initConnection();
  }

  startServer({ port = this.configuration.port } = {}): Promise<void> {

    validateCustomEnv();

    const app = express();

    app.use(express.json());
    app.use(cors());

    // Logger
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

    // TODO: Register routes
    app.use('/api/users', userRouter);

    app.get('/', (_, res) => {
        res.json({"message": "All is fine."});
    });

    app.use(notFoundHandler);
    app.use(handleAnyError);

    return new Promise((resolve, reject) => {
      app.listen(port, () => {
        console.log(`> [node server] Server listening at http://localhost:${port}`);
        resolve();
      }).once('error', reject)
    });
}
}


