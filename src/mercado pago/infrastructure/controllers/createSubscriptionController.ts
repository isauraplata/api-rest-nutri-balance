import { Request, Response } from "express";
import { CreateSubscriptionUseCase } from "../../application/createSubscriptionUseCase";
import { MercadoPagoSubscription } from "../../domain/SubscriptionModel";

export class SubscriptionController {
  constructor(private createSubscriptionUseCase: CreateSubscriptionUseCase) {}

  public createSubscription = async (req: Request, res: Response) => {
    const { planId, reason, payerEmail, token, amount, frequency, frequencyType, startDate, currency, backUrl } = req.body;

    const subscription = new MercadoPagoSubscription(
      planId,
      reason,
      payerEmail,
      token,
      amount,
      frequency,
      frequencyType,
      startDate,
      currency,
      backUrl
    );

    try {
      const createdSubscription = await this.createSubscriptionUseCase.execute(subscription);
      res.json(createdSubscription);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la suscripción' });
    }
  };
}
