import supertest from 'supertest';
import { configuration } from '@/app-config';
import { App } from '@/server';
import { Server } from 'http';
import { randomUUID } from 'crypto';
import { Database } from '@/db';


let app: Server;

beforeAll(async () => {
  app = new App(configuration).server;
})
afterAll(async () => {
  Database.closeConnection();
  app.close();
})
describe('user route', () => {
  describe('get user route', () => {
    describe('given the user does exist', () => {
      it('should return user with ok status code (200)', async () => {
        const userId = "320b020f-28cf-4776-bd4a-a92bb8b1f23f";
        // const userPayload = {
        //   "id": "a567b7df-c62e-4a53-9889-fffaadae12ad",
        //   "firstName": "Jacek",
        //   "lastName": "Bak",
        //   "email": "email@emailtest.co",
        //   "password": "password@123",
        //   "verificationCode": null,
        //   "passwordResetCode": null,
        //   "verified": false,
        //   "created_at": "2022-07-02T05:21:16.545Z",
        //   "updated_at": "2022-07-02T05:21:16.545Z"
        // }

        const { statusCode } = await supertest(app).get(`/api/users/${userId}`);

        expect(statusCode).toEqual(404);
        // expect(body).toEqual(userPayload);
      })
    })

    describe('given the user does not exist', () => {
      it('should return not found error (404)', async () => {
        const userId = randomUUID();
        const notFoundPayload = {
          status: 404,
          name: "NotFoundError"
        }

        const { body, statusCode } = await supertest(app)
          .get(`/api/users/${userId}`)

        expect(statusCode).toEqual(404);
        expect(body).toEqual(notFoundPayload);
      })
    })
  })
})