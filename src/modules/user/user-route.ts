import express from "express";
import { UserController } from "./user-controller";

const router = express.Router();
const { getAllUsers, getUserById, createUser } = new UserController();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createUser)

export default router;