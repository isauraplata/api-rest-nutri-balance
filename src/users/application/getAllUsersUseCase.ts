import { UserRepository } from "../domain/userRepository";
import { User } from "../domain/userModel";


export class GetAllUserUseCase{
   constructor(private readonly userRepository: UserRepository) {}


   async run(fields: string[] | null = null, page: number = 1, limit: number = 10): Promise<User[] | null> {
       try {
           try {
               const validPage = isNaN(page) || page < 1 ? 1 : page;
               const validLimit = isNaN(limit) || limit < 1 ? 10 : limit;
  
               const users = await this.userRepository.getAllUsers(fields, validPage, validLimit);
  
               return users;
           } catch (error) {
               console.error('Get All Users Error:', error);
               throw new Error('Error fetching users');
           }
       } catch (error) {
           console.error('Get All Users Error:', error);
           throw new Error('Error fetching users');
       }
   }
}
