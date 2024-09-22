import express from "express";

import { signUpController, signInController } from "./dependencies";

export const userRouter = express.Router();

userRouter.post("/signup",signUpController.run.bind(signUpController))
userRouter.post("/signin",signInController.run.bind(signInController))

