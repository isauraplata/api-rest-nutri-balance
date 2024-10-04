import { Request, Response } from 'express';
import { GetSubscriptionByEmailUseCase } from '../../application/getSubscriptionsByEmailUseCase';

export class GetSubscriptionByEmailController {
  constructor(private readonly getSubscriptionByEmailUseCase: GetSubscriptionByEmailUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const email = req.query.payer_email as string | undefined;
      console.log("email recibido:", email);

      if (!email) {
        return res.status(400).send({
          status: "error",
          data: "Email is required",
        });
      }

      const subscriptions = await this.getSubscriptionByEmailUseCase.execute(email);

      if (subscriptions && Object.keys(subscriptions).length > 0) {
        res.status(200).send({
          status: "success",
          data: subscriptions,
        });
      } else {
        res.status(404).send({
          status: "error",
          data: "No subscriptions found for the given email",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "error",
        data: "Error al buscar las suscripciones",
        message: error
      });
    }
  }
}