import { AppConfiguration } from '@app-config';
import { notFoundHandler } from '@middlewares/errorHandlers';
import express from 'express'
import { Database } from './db';

export class App {
  databaseInstance: void;
  configuration: AppConfiguration;

  constructor(configuration: AppConfiguration) {
    this.configuration = configuration;
    this.databaseInstance = Database.initConnection();
  }

  startServer({ port = this.configuration.port } = {}): Promise<void> {
    const app = express();

    app.use(express.json());

    // TODO: Register routes
    app.get('/', (_, res) => {
        res.json({"message": "All is fine."});
    });

    app.use(notFoundHandler);

    return new Promise((resolve, reject) => {
      app.listen(port, () => {
        console.log(`> [node server] Server listening at http://localhost:${port}`);
        resolve();
      }).once('error', reject)
    });
}
}


