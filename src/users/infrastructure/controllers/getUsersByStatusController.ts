import { Request, Response } from "express";
import { GetUsersByStatusUseCase } from "../../application/getUsersByStatusUseCase";

export class GetUsersByStatusController {
    constructor(private readonly getUserByStatus : GetUsersByStatusUseCase){}

    async run(req: Request, res: Response){

        try {
            const { page = 1, limit = 10, fields, status = 'free' } = req.query;
 
 
            const fieldsArray = fields ? (fields as string).split(',') : null;
 
            

            const users = await this.getUserByStatus.run( status as string, fieldsArray, parseInt(page as string), parseInt(limit as string));
 
 
            return res.status(200).json(users);
        } catch (error) {
            console.error("Error getting all users:", error);
            return res.status(500).json({
                error: true,
                message: "An error occurred while trying to get users by status",
            });
        }
    }
}