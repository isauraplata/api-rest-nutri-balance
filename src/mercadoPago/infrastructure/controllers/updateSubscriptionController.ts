import { Request, Response } from "express";
import { UpdateSubscriptionUseCase } from "../../application/updateSubscriptionUseCase";

export class UpdateSubscriptionController {
  constructor(private updateSubscriptionUseCase: UpdateSubscriptionUseCase) {}

  public updateSubscription = async (req: Request, res: Response) => {
    const { id } = req.params; 
    const subscriptionData = req.body;

    try {
      const updatedSubscription = await this.updateSubscriptionUseCase.execute(id, subscriptionData);
      res.json(updatedSubscription);
    } catch (error) {
      console.error('Error al actualizar la suscripción:', error);
      res.status(500).json({ error: 'Error al actualizar la suscripción' });
    }
  };
}
