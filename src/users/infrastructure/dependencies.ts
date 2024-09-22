import { CreateUser } from "../application/createUserUseCase";
import { SignIn } from "../application/signinUserUseCase";
import { SignInController } from "./controllers/signinController";

import { CreateUserController } from "./controllers/createUserController";
import { MysqlUserRepository } from "./mysqlUserRepository";

const userRepository = new MysqlUserRepository();

export const createUserUseCase = new CreateUser(userRepository);
export const createUserController = new CreateUserController(createUserUseCase);


export const signInUserUseCase = new SignIn(userRepository);
export const signInController = new SignInController(signInUserUseCase);