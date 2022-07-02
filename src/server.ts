import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import { Express } from 'express-serve-static-core';
import { AppConfiguration } from '@/app-config';
import validateCustomEnv from '@/utils/validateCustomEnv';
import userRouter from '@/modules/user/user-route';
import { handleAnyError, notFoundHandler } from '@/middlewares/errorHandlers';
import { shutdownConnections } from './utils/shutdownConnections';
import { Server } from 'http';
import { Database } from './db';

export class App {
  app: Express;
  databaseInstance: void;
  configuration: AppConfiguration;
  server: Server;

  constructor(configuration: AppConfiguration) {
    this.app = express();
    this.configuration = configuration;
    this.databaseInstance = Database.initConnection();
    this.server = this.runServer();
  }

  private runServer({ port = this.configuration.port } = {}) {
    validateCustomEnv();

    this.app.use(express.json());
    this.app.use(cors());

    // Logger
    if (process.env.NODE_ENV === 'development') this.app.use(morgan('dev'));

    // TODO: Register routes
    this.app.use('/api/users', userRouter);

    this.app.get('/', (_, res) => {
        res.json({"message": "All is fine."});
    });

    this.app.use(notFoundHandler);
    this.app.use(handleAnyError);
    
    return this.app.listen(port, () => {
      console.log(`> [node server] Server listening at http://localhost:${port}`);
    })
  }

  initServerConnection() {
    const signals = ["SIGTERM", "SIGINT"];

    for (let i = 0; i < signals.length; i++) {
      shutdownConnections(signals[i], this.server);
    }
  }
}


