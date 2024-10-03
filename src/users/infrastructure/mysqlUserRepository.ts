import { getRepository, Repository } from "typeorm";
import { User as UserEntity } from "../domain/entities/userEntity";
import { User } from "../domain/userModel";
import { UserRepository } from "../domain/userRepository";
import { AppDataSource } from "../../database/connection";
import { v4 as uuidv4 } from "uuid";

export class MysqlUserRepository implements UserRepository{
    private userRepository: Repository<UserEntity>

    constructor(){
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                return null;
            }
            return this.mapToDomain(user);
        } catch (error) {
            throw new Error(`Error finding user by email: ${error}`);
        }
    }

    async signIn(email: string, password: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user || user.password !== password) {
                return null;
            }
            return this.mapToDomain(user);
        } catch (error) {
            throw new Error(`Error during sign-in: ${error}`);
        }
    }

    async findUserByUUID(uuid: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({ where: { uuid } });
            if (!user) {
                return null;
            }
            return this.mapToDomain(user);
        } catch (error) {
            throw new Error(`Error finding user by UUID: ${error}`);
        }
    }

    async signUp(
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
        const user = this.userRepository.create({
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
            subscriptionType,
        });

        console.log("Imprimiendo el user")
        console.log(user)
        
        try {
            const savedUser = await this.userRepository.save(user);
            return this.mapToDomain(savedUser);
        } catch (error) {
            throw new Error(`Error creating user: ${error}`);
        }
    }

    async updateUser(user: User): Promise<User | null> {
        try {
            const existingUser = await this.userRepository.findOne({ where: { id: user.id } });

            if (!existingUser) {
                return null; // Retorna null si el usuario no se encuentra
            }

            // Actualiza las propiedades del usuario
            existingUser.name = user.name;
            existingUser.email = user.email;
            existingUser.password = user.password; // Considera encriptar la contraseña
            existingUser.dateOfBirth = user.dateOfBirth;
            existingUser.height = user.height;
            existingUser.weight = user.weight;
            existingUser.medicalConditions = user.medicalConditions;
            existingUser.allergies = user.allergies;
            existingUser.preferredFood = user.preferredFood;
            existingUser.subscriptionType = user.subscriptionType;

            const updatedUser = await this.userRepository.save(existingUser);
            return this.mapToDomain(updatedUser); // Mapea de nuevo a tu modelo de dominio
        } catch (error) {
            throw new Error(`Error updating user: ${error}`);
        }
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
            const result = await this.userRepository.delete(id);
            return result.affected! > 0; 
        } catch (error) {
            throw new Error(`Error deleting user: ${error}`);
        }
    }

    private mapToDomain(user: UserEntity): User {
        return new User(
            user.id,
            user.uuid,
            user.name,
            user.email,
            user.password,
            new Date(user.dateOfBirth), // Asegúrate de que el nombre de la columna sea correcto
            user.height,
            user.weight,
            user.medicalConditions,
            user.allergies,
            user.preferredFood,
            user.subscriptionType
        );
    }
}

