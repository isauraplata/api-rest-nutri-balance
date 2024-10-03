import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const signUpBodyValidation = (body: object) => {
  //Verifica que toda la información sea obligatoria.
  const schema = Joi.object({
    name: Joi.string().required().label("Name"), 
    email: Joi.string().email().required().label("Email"), //valida el formato del correo
    password: passwordComplexity().required().label("Password"), //valida que sea una contraseña segura en cuanto a formato
    dateOfBirth: Joi.date().iso().required().label("Date of Birth"), 
    height: Joi.number().positive().required().label("Height"), // Validar que sea número positivo
    weight: Joi.number().positive().required().label("Weight"), // Validar que sea número positivo
    medicalConditions: Joi.array().items(Joi.string()).label("Medical Conditions"), // Validar un array de strings
    allergies: Joi.array().items(Joi.string()).label("Allergies"), // Validar un array de strings
    preferredFood: Joi.array().items(Joi.string()).label("Preferred Food"),
    subscriptionType: Joi.string().valid("free", "premium").default("free").label("Subscription Type"), // Validar como 'free' o 'premium'
  });
  
  return schema.validate(body);
};

export const signInBodyValidation = (body: object) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"), //valida el formato del correo
    password: Joi.string().required().label("Password"), ///valida que sea una contraseña segura en cuanto a formato
  });

  return schema.validate(body);
};