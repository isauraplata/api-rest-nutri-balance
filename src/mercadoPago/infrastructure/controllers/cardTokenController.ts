import { Request, Response } from "express";
import { CreateCardTokenUseCase } from "../../application/ createCardTokenUseCase";


export class CardTokenController {
  constructor(private createCardTokenUseCase: CreateCardTokenUseCase) {}

  public createCardToken = async (req: Request, res: Response) => {
    const { card_number, cardholder_name, expiration_month, expiration_year, security_code, cardholder } = req.body;

    const cardData = {
      card_number,
      cardholder_name,
      expiration_month,
      expiration_year,
      security_code,
      cardholder
    };

    try {
      const cardToken = await this.createCardTokenUseCase.execute(cardData);
      res.json(cardToken);
    } catch (error) {
      console.error('Error al crear el token de tarjeta:', error);
      res.status(500).json({ error: 'Error al crear el token de tarjeta' });
    }
  };
}
