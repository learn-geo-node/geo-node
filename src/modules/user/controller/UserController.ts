import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../../../db/config"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body)
    }
}