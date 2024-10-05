import { User } from "./userModel";
import { PaginationResponse } from "../../utils/paginationResponse";

export interface UserRepository {
  findUserByEmail(email: string): Promise<User | null>;
  getAllUsers(
    fields: string[] | null,
    page: number,
    limit: number
  ): Promise<PaginationResponse<User> | null>; 
  signIn(email: string, password: string): Promise<User | null>;
  findUserByUUID(uuid: string, fields: string[] | null): Promise<User | null>;
  getUsersByStatus(
    status: string, 
    fields: string[] | null,
    page: number,
    limit: number
  ): Promise<PaginationResponse<User> | null>;
  updateUser(uuid: string, updateFields: Partial<User>): Promise<User | null>;
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
  deleteUser(uuid: string): Promise<boolean>;
  
}