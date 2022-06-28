import express from "express";
import { UserController } from "./user-controller";

const router = express.Router();
const { getAllUsers, getUserById } = new UserController();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

export default router;