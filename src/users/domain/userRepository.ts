import { User } from "./userModel";

export interface UserRepository {
  findUserByEmail(email: string): Promise<User | null>;
  signIn(email: string, password: string): Promise<User | null>;
  findUserByUUID(uuid: string): Promise<User | null>;
  updateUser(user: User): Promise<User | null>;
  signUp(
    name: string,
    email: string,
    password: string,
    dateOfBirth: Date,
    height: number,
    weight: number,
    medicalConditions: string[],
    allergies: string[],
    preferredFood: string[],
    subscriptionType: 'free' | 'premium'
  ): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}