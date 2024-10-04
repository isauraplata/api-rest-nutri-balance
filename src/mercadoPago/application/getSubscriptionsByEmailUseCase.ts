import { MercadoPagoRepository } from "../domain/mercadoPagoRepository";

export class GetSubscriptionByEmailUseCase {
    constructor(private mercadoPagoRepo: MercadoPagoRepository) {}
  
    async execute(email: string) {
      return await this.mercadoPagoRepo.searchSubscriptionsByEmail(email);
    }
  }