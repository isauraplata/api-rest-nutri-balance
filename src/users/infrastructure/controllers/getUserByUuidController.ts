import { Request, Response } from "express";
import { GetUserByUuidUseCase } from "../../application/getUserByUuidUseCase";


export class GetUserByUuidController {


   constructor(private readonly getUserByUuidUseCase : GetUserByUuidUseCase){}
   async run(req: Request, res: Response){
       const {uuid} = req.params;
       const { fields, page, limit } = req.query;
       const fieldsArray = fields ? (fields as string).split(',') : null;


       try {
           const user = await this.getUserByUuidUseCase.run(
               uuid,
               fieldsArray
           )


           if(!user){
               return res.status(404).json({ message: 'User not found' });
           }


           return res.json(user);
       } catch (error) {
           console.error("SignIn error:", error);
           return res.status(500).json({
               error: true,
               message: "An error occurred while trying to sign in",
           });
       }
   }


}
