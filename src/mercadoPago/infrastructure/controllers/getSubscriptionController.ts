import { Request, Response } from "express";
import { GetSubscriptionUseCase } from "../../application/getSubscriptionUseCase";

export class GetSubscriptionController {
    constructor(private getSubscriptionUseCase: GetSubscriptionUseCase) {}

    public getSubscription = async (req: Request, res: Response) => {
        const subscriptionId = req.params.id; 

        try {
            const subscription = await this.getSubscriptionUseCase.execute(subscriptionId);
            res.json(subscription);
        } catch (error) {
            console.error('Error al obtener la suscripción:', error);
            res.status(500).json({ error: 'Error al obtener la suscripción' });
        }
    };
}