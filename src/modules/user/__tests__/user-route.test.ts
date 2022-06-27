import supertest from 'supertest';
import { configuration } from '@/app-config';
import { App } from '@/server';
import { Server } from 'http';
import { UserService } from '../user-service';
import { randomUUID } from 'crypto';


let app: Server;

beforeAll(async () => {
  
  app = new App(configuration).server;
})
afterAll(async () => {
  app.close();
})
describe('user route', () => {
  describe('get user route', () => {
    describe('given the user does exist', () => {
      it('should return user with ok status code (200)', async () => {
        const userId = "477628de-32b4-4e69-9027-3a428495832f";
        const userPayload = {
          id: "477628de-32b4-4e69-9027-3a428495832f",
          firstName: "Kamil",
          lastName: "Ślimak",
          email: "kamilslimak@go.co"
        }

        const findUsersServiceMock = jest.spyOn(new UserService, "findUserById")
        // @ts-ignore
        .mockResolvedValueOnce(userPayload)

        await supertest(app).get(`/api/users/${userId}`)

        expect(findUsersServiceMock).toReturnWith(userPayload);
      })
    })

    describe('given the user does not exist', () => {
      it('should return not found error (404)', async () => {
        const userId = randomUUID();
        const notFoundPayload = {
          status: 404,
          name: "NotFoundError"
        }

        const { statusCode, body } = await supertest(app)
          .get(`/api/users/${userId}`)

        expect(statusCode).toBe(404);
        expect(body).toEqual(notFoundPayload);
      })
    })
  })
})