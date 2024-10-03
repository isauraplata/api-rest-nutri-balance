import { Request, Response } from "express";
import { SendMessageUseCase } from "../../application/sendMessageUseCase";

export class SendMessageController {
    constructor(private sendMessageUseCase: SendMessageUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { to, message } = req.body;

        console.log("Recibiendo el req.body");
        console.log(req.body)
        
        try {
            await this.sendMessageUseCase.execute(to, message);
            return res.status(200).json({ message: "Message sent successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Failed to send message" });
        }
    }
}