import { Request, Response } from "express";
import { GetPlanUseCase } from "../../application/GetPlanUseCase";

export class GetPlanController {
  constructor(private getPlanUseCase: GetPlanUseCase) {}

  public getPlan = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const plan = await this.getPlanUseCase.execute(id);
      res.json(plan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el plan de suscripción' });
    }
  };
}
