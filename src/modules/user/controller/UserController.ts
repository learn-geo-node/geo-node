import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "@db/config"
import { User } from "@modules/user/entity/User"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body)
    }
}