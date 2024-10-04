import express from "express";

import { signUpController, signInController, getUserByUuidController, getAllUsersController, updateUserController, deleteUserController } from "./dependencies";

export const userRouter = express.Router();

userRouter.post("/signup",signUpController.run.bind(signUpController))
userRouter.post("/signin",signInController.run.bind(signInController))
userRouter.get('/:uuid', getUserByUuidController.run.bind(getUserByUuidController))
userRouter.get('/', getAllUsersController.run.bind(getAllUsersController))
userRouter.put('/', updateUserController.run.bind(updateUserController))
userRouter.delete('/', deleteUserController.run.bind(deleteUserController))


