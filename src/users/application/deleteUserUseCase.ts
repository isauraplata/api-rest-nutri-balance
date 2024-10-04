import { UserRepository } from "../domain/userRepository";


export class DeleteUserUseCase {
   constructor(private readonly userRepository: UserRepository) {}


   async run(uuid: string): Promise<boolean> {
       try {
           const deleted = await this.userRepository.deleteUser(uuid);


           if (!deleted) {
               console.log('User not found or unable to delete');
               return false;
           }


           return true;
       } catch (error) {
           console.error('Error deleting user:', error);
           return false;
       }
   }
}
