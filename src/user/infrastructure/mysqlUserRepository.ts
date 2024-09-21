import {query} from "../../database/connection"

import { User } from "../domain/userModel";
import { UserRepository } from "../domain/userRepository";
import { v4 as uuidv4 } from "uuid";

export class MysqlUserRepository implements UserRepository {
  findUserByUUID(uuid: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  updateUser(user: User): Promise<User | null> {
      throw new Error("Method not implemented.");
  }
  async createUser(
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
  ): Promise<User | null> {
    const uuid = uuidv4();
    const sql = `INSERT INTO users 
      (uuid, name, email, password, date_of_birth, height, weight, medical_conditions, allergies, preferred_food, subscription_type) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params: any[] = [
      uuid,
      name,
      email,
      password,
      dateOfBirth,
      height,
      weight,
      JSON.stringify(medicalConditions),
      JSON.stringify(allergies),
      JSON.stringify(preferredFood),
      subscriptionType,
    ];
  
    console.log("params: ", params);
    try {
      const result: any = await query(sql, params); // No destructuring
      console.log("result.insertId: ", result.insertId);
        return new User(
          result.insertId, 
          uuid,
          name,
          email,
          password,
          dateOfBirth,
          height,
          weight,
          medicalConditions,
          allergies,
          preferredFood,
          subscriptionType
        );

    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  // Eliminar un usuario
  async deleteUser(id: string): Promise<boolean> {
    const sql = "DELETE FROM users WHERE id = ?";
    const params: any[] = [id];
    try {
      const [result]: any = await query(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }



}
