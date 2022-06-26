import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import { AppConfiguration } from '@/app-config';
import { Database } from './db';
import validateCustomEnv from '@/utils/validateCustomEnv';
import userRouter from '@/modules/user/user-route';
import { handleAnyError, notFoundHandler } from '@/middlewares/errorHandlers';
import { shutdownConnections } from './utils/shutdownConnections';
import { Server } from 'http';

export class App {
  databaseInstance: void;
  configuration: AppConfiguration;
  server: Server

  constructor(configuration: AppConfiguration) {
    this.configuration = configuration;
    this.databaseInstance = Database.initConnection();
    this.server = this.runServer();
  }

  runServer({ port = this.configuration.port } = {}) {

    const app = express()

    validateCustomEnv();

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

    return app.listen(port, () => {
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


