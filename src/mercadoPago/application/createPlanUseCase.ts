import { MercadoPagoRepository } from "../domain/mercadoPagoRepository";
import { MercadoPagoPlan } from "../domain/PlanModel";
export class CreatePlanUseCase {
  constructor(private mercadoPagoRepo: MercadoPagoRepository) {}
  async execute(plan: MercadoPagoPlan) {
    return await this.mercadoPagoRepo.createPlan(plan);
  }
}
