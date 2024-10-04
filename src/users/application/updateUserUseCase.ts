import { UserRepository } from "../domain/userRepository";
import { User } from "../domain/userModel";


export class UpdateUserUseCase {
   constructor(private readonly userRepository : UserRepository){}


   async run(
       uuid: string,
       updateFields: Partial<User>
   ):Promise<User | null>{
       try {
           const user = await this.userRepository.findUserByUUID(uuid, null);
           if (!user) {
               console.log('User not found');
               return null;
           }


           const updatedUser = await this.userRepository.updateUser(uuid, updateFields);
           return updatedUser;
       } catch (error) {
           console.error('Update User Error:', error);
           return null;
       }
   }
}
