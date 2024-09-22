import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { signInBodyValidation } from "../utils/validationSchema"; // Esquema de validación para el cuerpo de la solicitud
import { SignIn } from "../../application/signinUserUseCase";
import generateTokens from "../utils/generateToke";

export class SignInController {
  constructor(private readonly signInUserUseCase: SignIn) {}

  async run(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { error } = signInBodyValidation(req.body);
      if (error) {
        return res
          .status(400)
          .json({ error: true, message: error.details[0].message });
      }

      // Buscar al usuario por correo electrónico
      const user = await this.signInUserUseCase.run(email, password);
      console.log(user)

      // Si no se encuentra el usuario, retornar error
      if (!user) {
        console.log("User not found");
        return res
          .status(401)
          .json({ error: true, message: "Invalid email or password" });
      }

      // Verificar si la contraseña proporcionada es correcta
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("Invalid password");
        return res
          .status(401)
          .json({ error: true, message: "Invalid password" });
      }

     
      // Generar tokens (accessToken y refreshToken)
      const { accessToken, refreshToken } = await generateTokens(user);

      // Devolver respuesta exitosa con los tokens y detalles del usuario
      return res.status(200).json({
        error: false,
        message: "Logged in successfully",
        accessToken
      });
    } catch (error) {
      console.error("SignIn error:", error);
      return res.status(500).json({
        error: true,
        message: "An error occurred while trying to sign in",
      });
    }
  }
}
