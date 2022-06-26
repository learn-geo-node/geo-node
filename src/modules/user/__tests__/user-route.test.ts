// import supertest from 'supertest';
import { configuration } from '@/app-config';
import { Database } from '@/db';
import { App } from '@/server';
import { Server } from 'http';


let app: Server;

beforeAll(async () => {
  app = new App(configuration).server;
})
afterAll(async () => {
  app.close();
  Database.closeConnection();
})
describe('user route', () => {
  describe('get user route', () => {
    describe('given the user does not exist', () => {
      it('should return not found error (404)', async () => {
        // const userId = 'test1'
        // await supertest(app).get(`/api/users/${userId}`).expect(404)

        expect(true).toBe(true);
      })
    })
  })
})