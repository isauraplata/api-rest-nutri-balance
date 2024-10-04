import { UserRepository } from "../domain/userRepository";
import { User } from "../domain/userModel";


export class GetUserByUuidUseCase {
   constructor(private readonly userRepository : UserRepository){}


   async run(
       uuid: string,
       fields: string[] | null
   ): Promise<User | null>{
       try {
           const user = await this.userRepository.findUserByUUID(uuid, fields);


           if (!user) {
               console.log('User not found');
               return null;
             }
          
           return user;
       } catch (error) {
           console.error('Get One User Error:', error);
           return null;
       }
   }
}
