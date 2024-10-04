import { Request, Response } from "express";
import { GetAllUserUseCase } from "../../application/getAllUsersUseCase";

export class GetAllUsersController {
   constructor(private readonly getAllUsersUseCase: GetAllUserUseCase){}


   async run(req: Request, res: Response){
       try {
           const { page = 1, limit = 10, fields } = req.query;


           const fieldsArray = fields ? (fields as string).split(',') : null;


           const users = await this.getAllUsersUseCase.run(fieldsArray, parseInt(page as string), parseInt(limit as string));


           return res.status(200).json(users);
       } catch (error) {
           console.error("Error getting all users:", error);
           return res.status(500).json({
               error: true,
               message: "An error occurred while trying to get all users",
           });
       }
   }
}
