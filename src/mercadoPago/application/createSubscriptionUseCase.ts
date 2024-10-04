import { MercadoPagoRepository } from "../domain/mercadoPagoRepository";
import { MercadoPagoSubscription } from "../domain/SubcriptionModel";
export class CreateSubscriptionUseCase {
  constructor(private mercadoPagoRepo: MercadoPagoRepository) {}
  async execute(subscription: MercadoPagoSubscription) {
    return await this.mercadoPagoRepo.createSubscription(subscription);
  }
}
