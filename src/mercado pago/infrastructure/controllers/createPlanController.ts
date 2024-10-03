import { Request, Response } from "express";
import { CreatePlanUseCase } from "../../application/createPlanUseCase";
import { MercadoPagoPlan } from "../../domain/PlanModel";

export class PlanController {
  constructor(private createPlanUseCase: CreatePlanUseCase) {}

  public createPlan = async (req: Request, res: Response) => {
    const { reason, frequency, frequencyType, repetitions, billingDay, amount, currency } = req.body;

    const plan = new MercadoPagoPlan(
      reason,
      frequency,
      frequencyType,
      repetitions,
      billingDay,
      amount,
      currency,
      req.body.backUrl
    );

    try {
      const createdPlan = await this.createPlanUseCase.execute(plan);
      res.json(createdPlan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el plan' });
    }
  };
}
