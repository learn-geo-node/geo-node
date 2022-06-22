import express from 'express'
import dotenv from 'dotenv';
import { initDbConnection } from './db';

dotenv.config();

const startServer = ({ port = process.env.PORT } = {}): Promise<void> => {
    const app = express();

    app.use(express.json());

    app.get('/', (_, res) => {
        res.json({"message": "All is fine."});
    });

    return new Promise((resolve, reject) => {
      app.listen(port, () => {
        console.log(`>node server listening at http://localhost:${port}`);
        resolve();
      }).once('error', reject)
    });
}


export async function main() {
  try {
    initDbConnection();
    startServer();
  } catch(error) {
    console.error(error)
  }
}


