import { MercadoPagoRepository } from "../domain/mercadoPagoRepository";

export class UpdateSubscriptionUseCase {
  constructor(private mercadoPagoRepository: MercadoPagoRepository) {}

  async execute(subscriptionId: string, subscriptionData: any): Promise<any> {
    return this.mercadoPagoRepository.updateSubscription(subscriptionId, subscriptionData);
  }
}
