import express from "express";

import { createUserController, signInController } from "./dependencies";

export const userRouter = express.Router();

userRouter.post("/signup",createUserController.run.bind(createUserController))
userRouter.post("/signin",signInController.run.bind(signInController))

