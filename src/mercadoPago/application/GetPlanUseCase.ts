import { MercadoPagoRepository } from "../domain/mercadoPagoRepository";

export class GetPlanUseCase {
  constructor(private mercadoPagoRepository: MercadoPagoRepository) {}

  async execute(planId: string): Promise<any> {
    return this.mercadoPagoRepository.getPlan(planId);
  }
}
