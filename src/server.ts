import express from 'express'
import dotenv from 'dotenv';
import { AppDataSource } from './db';
import { User } from './modules/user/entity/User';

dotenv.config();

const app = express();

function startServer({ port = process.env.PORT } = {}): Promise<void> {
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
    AppDataSource.initialize().then(async () => {
      startServer();
    
      await AppDataSource.manager.save(
          AppDataSource.manager.create(User, {
              firstName: "Kamil",
              lastName: "Ślimak",
              age: 18
          })
      )
    }).catch(error => console.log(error));
  }
  catch (err) {
    console.error(err);
  }
}


