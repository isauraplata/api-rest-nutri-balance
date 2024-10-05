import { UserRepository } from "../domain/userRepository";
import { User } from "../domain/userModel";
import { PaginationResponse } from "../../utils/paginationResponse";

export class GetUsersByStatusUseCase {
    constructor(private readonly userRepository : UserRepository){}

    async run(
        status: string,
        fields: string[] | null = null, 
        page: number = 1, 
        limit: number = 10
    ): Promise<PaginationResponse<User>| null>{
        try {
            const validPage = isNaN(page) || page < 1 ? 1 : page;
               const validLimit = isNaN(limit) || limit < 1 ? 10 : limit;
  
               const users = await this.userRepository.getUsersByStatus(status, fields, validPage, validLimit);
  
               return users;
        } catch (error) {
            console.error('Get Users by Status Error:', error);
           return null;
        }
    }
}