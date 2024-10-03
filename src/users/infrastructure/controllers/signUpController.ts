import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { SignUp } from "../../application/signUpUseCase";

import { signUpBodyValidation } from "../utils/validationSchema";

export class SignUpController {
  constructor(readonly singUpUseCase: SignUp) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    console.log("data: ", data);

    try {
      // Validación de los datos de entrada usando el esquema de validación
      const { error } = signUpBodyValidation(req.body);
      if (error)
        return res
          .status(400)
          .json({ error: error, message: error.details[0].message });

      // Generar hash de la contraseña
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      console.log(hashPassword)

      const user = await this.singUpUseCase.run(
        data.name,
        data.email,
        hashPassword,
        new Date(data.dateOfBirth), // Convertir fecha de nacimiento a Date
        data.height,
        data.weight,
        data.medicalConditions || [],
        data.allergies || [],
        data.preferredFood || [],
        data.subscriptionType || 'free',
      );

      // Respuesta de éxito si el usuario fue creado
      if (user)
        res.status(201).send({
          status: "success",
          data: {
            id: user?.id,
            uuid: user?.uuid,
            name: user?.name,
            email: user?.email,
            dateOfBirth: user?.dateOfBirth,
            height: user?.height,
            weight: user?.weight,
            medicalConditions: user?.medicalConditions,
            allergies: user?.allergies,
            preferredFood: user?.preferredFood,
            subscriptionType: user?.subscriptionType
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "No fue posible agregar el registro",
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "error",
        data: "Ocurrió un error",
        message: error,
      });
    }
  }
}
