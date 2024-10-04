import { CreatePlanUseCase } from "../application/createPlanUseCase";
import { CreateSubscriptionUseCase } from "../application/createSubscriptionUseCase";
import { GetSubscriptionUseCase } from "../application/getSubscriptionUseCase";
import { PlanController } from "./controllers/createPlanController";
import { SubscriptionController } from "./controllers/createSubscriptionController";
import { GetSubscriptionController } from "./controllers/getSubscriptionController";
import { MercadoPagoRepositoryImpl } from "./MercadoPagoRepository";

import { GetSubscriptionByEmailUseCase } from "../application/getSubscriptionsByEmailUseCase";

import { GetSubscriptionByEmailController } from "./controllers/getSubscriptionsByEmailController";

const mercadoPagoRepository = new MercadoPagoRepositoryImpl(
  process.env.ACCESS_TOKEN_MERCADO_PAGO || "",
  "https://22fd-2806-106e-e-2a81-f60a-fb13-8dd2-643d.ngrok-free.app"
);

export const createPlanUseCase = new CreatePlanUseCase(mercadoPagoRepository);
export const createSubscriptionUseCase = new CreateSubscriptionUseCase(mercadoPagoRepository);
export const getSubscriptionUseCase = new GetSubscriptionUseCase(mercadoPagoRepository);



export const planController = new PlanController(createPlanUseCase);
export const subscriptionController = new SubscriptionController(createSubscriptionUseCase);
export const getSubscriptionController = new GetSubscriptionController(getSubscriptionUseCase);


export const getSubscriptionByEmailUseCase = new GetSubscriptionByEmailUseCase(mercadoPagoRepository);
export const getSubscriptionByEmailController = new GetSubscriptionByEmailController(getSubscriptionByEmailUseCase);