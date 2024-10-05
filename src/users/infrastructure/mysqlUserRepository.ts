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

    async getAllUsers(
        fields: string[] | null = null,
        page: number = 1,
        limit: number = 10
    ): Promise<User[] | null> {
        try {
            const query = this.userRepository.createQueryBuilder('user');
 
 
            const defaultFields = ['uuid', 'created_at', 'updated_at'];
 
 
            console.log(fields)
           
            if (fields && fields.length > 0) {
                // Unir los campos por defecto y los campos adicionales
                query.select([...defaultFields.map(field => `user.${field}`), ...fields.map(field => `user.${field}`)]);
            }
   
           
            query.skip((page - 1) * limit).take(limit);
   
            const users = await query.getMany();
   
            return users;
        } catch (error) {
            throw new Error(`Error retrieving users: ${error}`);
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

    async findUserByUUID(
        uuid: string,
        fields: string[] | null = null,
    ): Promise<User | null> {
        try {
            const query = this.userRepository.createQueryBuilder("user").where('user.uuid = :uuid', {uuid})
 
 
            const defaultFields = ['uuid', 'created_at', 'updated_at'];
 
 
            if(fields && fields.length > 0){
                query.select([...defaultFields.map(field => `user.${field}`), ...fields.map(field => `user.${field}`)]);
            }
           
            const newUser = await query.getOne();
 
 
            if (!newUser) {
                return null;
            }
 
 
            return this.mapToDomain(newUser);
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

        
        try {
            const savedUser = await this.userRepository.save(user);
            return this.mapToDomain(savedUser);
        } catch (error) {
            throw new Error(`Error creating user: ${error}`);
        }
    }

    async updateUser(uuid: string, updatedFields: Partial<User>): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({ where: { uuid } });
            if (!user) return null;

            Object.assign(user, updatedFields);
            await this.userRepository.save(user);
            return this.mapToDomain(user);
        } catch (error) {
            throw new Error(`Error updating user: ${error}`);
        }
    }
 
    async deleteUser(uuid: string): Promise<boolean> {
        try {
            const result = await this.userRepository.delete({ uuid });
            return result.affected! > 0;
        } catch (error) {
            throw new Error(`Error deleting user: ${error}`);
        }
    }

    async getUsersByStatus(status: string, fields: string[] | null, page: number, limit: number): Promise<User[] | null> {
        try {
            const query = this.userRepository.createQueryBuilder('user').where('user.subscriptionType = :status', {status});
 
            const defaultFields = ['uuid', 'created_at', 'updated_at'];
           
            if (fields && fields.length > 0) {
                // Unir los campos por defecto y los campos adicionales
                query.select([...defaultFields.map(field => `user.${field}`), ...fields.map(field => `user.${field}`)]);
            }
   
           
            query.skip((page - 1) * limit).take(limit);
   
            const users = await query.getMany();

            return users;
        } catch (error) {
            throw new Error(`Error retrieving users: ${error}`);
        }
    }
 
    private mapToDomain(user: UserEntity): User {
        return new User(
            user.id,
            user.uuid,
            user.name,
            user.email,
            user.password,
            user.dateOfBirth,
            user.height,
            user.weight,
            user.medicalConditions,
            user.allergies,
            user.preferredFood,
            user.subscriptionType
        );
    }
}

