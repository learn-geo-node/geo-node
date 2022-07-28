import express from "express";
import { UserController } from "./user-controller";

const router = express.Router();
const { getAllUsers, getUserById, createUser, removeUserById } = new UserController();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.delete('/:id', removeUserById);

export default router;