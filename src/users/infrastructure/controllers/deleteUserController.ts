import { Request, Response } from 'express';
import { DeleteUserUseCase } from '../../application/deleteUserUseCase';


export class DeleteUserController{
   constructor(private readonly deleteUserUseCase : DeleteUserUseCase){}


   async run(req: Request, res: Response): Promise<Response>{
       const uuid = req.query.uuid as string;


       if (!uuid) {
           return res.status(400).json({ message: 'UUID is required' });
       }


       try {
           const wasDeleted = await this.deleteUserUseCase.run(uuid);


           if (!wasDeleted) {
               return res.status(404).json({ message: 'User not found or unable to delete' });
           }


           return res.status(200).json({ message: 'User deleted successfully' });
       } catch (error) {
           return res.status(500).json({ message: 'Internal Server Error'});
       }
   }
}
