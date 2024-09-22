import { SignUp } from "../application/signUpUseCase";
import { SignIn } from "../application/signinUserUseCase";
import { SignInController } from "./controllers/signinController";

import { SignUpController } from "./controllers/signUpController";
import { MysqlUserRepository } from "./mysqlUserRepository";

const userRepository = new MysqlUserRepository();

export const signUpUseCase = new SignUp(userRepository);
export const signUpController = new SignUpController(signUpUseCase);


export const signInUserUseCase = new SignIn(userRepository);
export const signInController = new SignInController(signInUserUseCase);