import { CreateUser } from "../application/createUserUseCase";

import { CreateUserController } from "./controllers/createUserController";
import { MysqlUserRepository } from "./mysqlUserRepository";

const userRepository = new MysqlUserRepository();

export const createUserUseCase = new CreateUser(userRepository);
export const createUserController = new CreateUserController(createUserUseCase);