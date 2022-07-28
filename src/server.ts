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
  databaseInstance: Database;
  configuration: AppConfiguration;
  server: Server;
  static instance: App;
  static configuration: AppConfiguration;

  constructor() {
    this.app = express();
    this.configuration = AppConfiguration.getInstance();
    this.databaseInstance = Database.getInstance();
    this.server = this.runServer();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new App();
    }
    return this.instance;
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

  async closeServerConnection() {
    this.server.close(() => {
      console.log(" > [node server] Server connection closed.");
    })
  }

  async initServerConnection() {
    const signals = ["SIGTERM", "SIGINT"];

    for (let i = 0; i < signals.length; i++) {
      shutdownConnections(signals[i], this.databaseInstance, this.closeServerConnection.bind(this));
    }
  }
}


