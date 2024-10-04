import { MercadoPagoRepository } from "../domain/mercadoPagoRepository";

export class CreateCardTokenUseCase {
  constructor(private mercadoPagoRepository: MercadoPagoRepository) {}

  async execute(cardData: any): Promise<any> {
    return this.mercadoPagoRepository.createCardToken(cardData);
  }
}
