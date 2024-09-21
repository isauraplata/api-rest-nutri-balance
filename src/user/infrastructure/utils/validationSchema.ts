import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const signUpBodyValidation = (body: object) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    dateOfBirth: Joi.date().iso().required().label("Date of Birth"), // Validar como fecha ISO
    height: Joi.number().positive().required().label("Height"), // Validar altura como número positivo
    weight: Joi.number().positive().required().label("Weight"), // Validar peso como número positivo
    medicalConditions: Joi.array().items(Joi.string()).label("Medical Conditions"), // Validar un array de strings
    allergies: Joi.array().items(Joi.string()).label("Allergies"), // Validar un array de strings
    preferredFood: Joi.array().items(Joi.string()).label("Preferred Food"), // Validar un array de strings
    subscriptionType: Joi.string().valid("free", "premium").default("free").label("Subscription Type"), // Validar como 'free' o 'premium'
  });
  
  return schema.validate(body);
};
