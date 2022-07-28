import supertest from 'supertest';
import { configuration } from '@/app-config';
import { App } from '@/server';
import { randomUUID } from 'crypto';
import { Database } from '@/db';
import { Server } from 'http';


let server: Server;
let db: Database;

beforeAll(async () => {
  db = new Database();
  await db.initConnection();
  server = new App(configuration).server;
})
afterAll(async () => {
  await db.closeConnection();
  server.close();
})
describe('user route', () => {
  describe('get user route', () => {
    describe('given the user does exist', () => {
      it('should return user with ok status code (200)', async () => {
        const userId = "a567b7df-c62e-4a53-9889-fffaadae12ad";
        const userPayloadMock = {
          "id": "a567b7df-c62e-4a53-9889-fffaadae12ad",
          "firstName": "Jacek",
          "lastName": "Bak",
          "email": "email@emailtest.co",
          "password": "password@123",
          "verificationCode": null,
          "passwordResetCode": null,
          "verified": false,
          "created_at": "2022-07-02T05:21:16.545Z",
          "updated_at": "2022-07-02T05:21:16.545Z"
        }

        const { statusCode, body } = await supertest(server).get(`/api/users/${userId}`);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(userPayloadMock);
      })
    })

    describe('given the user does not exist', () => {
      it('should return not found error (404)', async () => {
        const userId = randomUUID();
        const notFoundPayloadMock = {
          status: 404,
          name: "NotFoundError",
          message: "User not found"
        }

        const { body, statusCode } = await supertest(server)
          .get(`/api/users/${userId}`)

        expect(statusCode).toEqual(404);
        expect(body).toEqual(notFoundPayloadMock);
      })
    })
  })
})