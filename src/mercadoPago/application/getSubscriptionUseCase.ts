import { MercadoPagoRepository } from "../domain/mercadoPagoRepository";

export class GetSubscriptionUseCase {
    constructor(private mercadoPagoRepo: MercadoPagoRepository) {}

    async execute(subscriptionId: string) {
        return await this.mercadoPagoRepo.getSubscription(subscriptionId);
    }
}