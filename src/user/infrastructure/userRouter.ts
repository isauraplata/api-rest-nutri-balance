import express from "express";

import { createUserController } from "./dependencies";

export const userRouter = express.Router();

userRouter.post("/signup",createUserController.run.bind(createUserController))

// userRouter.post("/subscription/:uuid",createUserController.run.bind(createUserController))



// userRouter.post("/create-payment",createUserController.run.bind(createUserController))


// userRouter.get("/capture-payment",createUserController.run.bind(createUserController))

// userRouter.get("/cancel-payment",createUserController.run.bind(createUserController))