import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "@db/config"
import { User } from "@modules/user/user-entity"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async getAllUsers(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async createUser(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body)
    }
}