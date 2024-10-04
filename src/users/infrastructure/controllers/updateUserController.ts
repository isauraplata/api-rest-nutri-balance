import { Request, Response } from "express";
import { UpdateUserUseCase } from "../../application/updateUserUseCase";


export class UpdateUserController{


   constructor(private readonly updateUserUseCase : UpdateUserUseCase){}


   async run(req: Request, res: Response): Promise<Response>{
       const { uuid } = req.query;
       const updatedFields = req.body;


       if (!uuid) {
       return res.status(400).json({ message: "UUID is required" });
       }


       try {
       const updatedUser = await this.updateUserUseCase.run(uuid as string, updatedFields);
       if (!updatedUser) {
           return res.status(404).json({ message: "User not found" });
       }
       return res.status(200).json(updatedUser);
       } catch (error) {
       return res.status(500).json({ message: "Error updating user", error });
       }
   }
}
