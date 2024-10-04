import { SignUp } from "../application/signUpUseCase";
import { SignIn } from "../application/signinUserUseCase";
import { SignInController } from "./controllers/signinController";

import { SignUpController } from "./controllers/signUpController";
import { MysqlUserRepository } from "./mysqlUserRepository";

import { GetUserByUuidUseCase } from "../application/getUserByUuidUseCase";
import { GetUserByUuidController } from "./controllers/getUserByUuidController";

import { GetAllUserUseCase } from "../application/getAllUsersUseCase";
import { GetAllUsersController } from "./controllers/getAllUserController";

import { UpdateUserUseCase } from "../application/updateUserUseCase";
import { UpdateUserController } from "./controllers/updateUserController";

import { DeleteUserUseCase } from "../application/deleteUserUseCase";
import { DeleteUserController } from "./controllers/deleteUserController";

const userRepository = new MysqlUserRepository();

export const signUpUseCase = new SignUp(userRepository);
export const signUpController = new SignUpController(signUpUseCase);


export const signInUserUseCase = new SignIn(userRepository);
export const signInController = new SignInController(signInUserUseCase);

const getUserByUuidUseCase = new GetUserByUuidUseCase(userRepository);
export const getUserByUuidController = new GetUserByUuidController(getUserByUuidUseCase);

const getAllUsersUseCase = new GetAllUserUseCase(userRepository);
export const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);

const updateUserUseCase = new UpdateUserUseCase(userRepository);
export const updateUserController = new UpdateUserController(updateUserUseCase);

const deleteUserUseCase =  new DeleteUserUseCase(userRepository);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
