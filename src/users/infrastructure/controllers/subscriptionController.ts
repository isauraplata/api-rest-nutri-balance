import { Request, Response } from 'express';
import { UpdateSubscription } from '../../application/updateSubscriptionUseCase';

export class SubscriptionController {
  constructor(readonly updateSubscription: UpdateSubscription) {}

  async run(req: Request, res: Response): Promise<Response> { 
    const { uuid } = req.params;
    const data = req.body;
    console.log("data: ", data);

    try {
      if (data.newSubscriptionType === 'premium' && !data.paymentMethod) {
        return res.status(400).json({
          status: "error",
          message: 'Se requiere un método de pago para la suscripción premium',
        });
      }

      const updatedUser = await this.updateSubscription.updateUserSubscription(
        uuid,
        data.newSubscriptionType,
        data.paymentMethod
      );

      console.log("Usuario actualizado:", updatedUser);

      if (updatedUser) {
        return res.status(200).json({
          status: "success",
          message: 'Suscripción actualizada correctamente',
          user: {
            id: updatedUser.id,
            uuid: updatedUser.uuid,
            subscriptionType: updatedUser.subscriptionType,
            paymentMethod: updatedUser.paymentMethod,
          },
        });
      } else {
        return res.status(400).json({
          status: "error",
          message: 'Error al actualizar la suscripción',
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: 'Error en el servidor',
        error: error,
      });
    }
  }
}
