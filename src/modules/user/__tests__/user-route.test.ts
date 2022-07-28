import supertest from 'supertest';
import { App } from '@/server';
import { randomUUID } from 'crypto';
import { Server } from 'http';
import { NOT_FOUND_PAYLOAD_MOCK, USER_DATA_PAYLOAD_MOCKS, USER_ID_MOCKS } from './mocks/user';

let server: Server;

beforeAll(async () => {
  server = App.getInstance().server;
})
afterAll(async () => {
  server.close();
})
describe('user route', () => {
  describe('get user route', () => {
    describe('given the user does exist', () => {
      it('should return user with ok status code (200)', async () => {
        const userId = USER_ID_MOCKS[0];
        const userPayloadMock = USER_DATA_PAYLOAD_MOCKS[0];

        const { statusCode, body } = await supertest(server).get(`/api/users/${userId}`);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(userPayloadMock);
      })
    })

    describe('given the user does not exist', () => {
      it('should return not found error (404)', async () => {
        const userId = randomUUID();
        const notFoundPayloadMock = NOT_FOUND_PAYLOAD_MOCK;

        const { body, statusCode } = await supertest(server)
          .get(`/api/users/${userId}`)

        expect(statusCode).toEqual(404);
        expect(body).toEqual(notFoundPayloadMock);
      })
    })
  })
})