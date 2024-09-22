import { v4 as uuidv4 } from 'uuid'; 
import { User } from "../domain/userModel";

import { UserRepository } from '../domain/userRepository';
export class SignUp {
  constructor(readonly userRepository: UserRepository) {}

  async run(
    name: string,
    email: string,
    password: string,
    dateOfBirth: Date,
    height: number,
    weight: number,
    medicalConditions: string[],
    allergies: string[],
    preferredFood: string[],
    subscriptionType: 'free' | 'premium',

  ): Promise<User | null> {
    try {
      const id = uuidv4();
      const user = await this.userRepository.signUp(
        name,
        email,
        password,
        dateOfBirth,
        height,
        weight,
        medicalConditions,
        allergies,
        preferredFood,
        subscriptionType,

      );
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

