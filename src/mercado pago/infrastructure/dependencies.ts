import { CreatePlanUseCase } from "../application/createPlanUseCase";
import { CreateSubscriptionUseCase } from "../application/createSubscriptionUseCase";
import { PlanController } from "./controllers/createPlanController";
import { SubscriptionController } from "./controllers/createSubscriptionController";
import { MercadoPagoRepositoryImpl } from "./MercadoPagoRepositoryImpl";


const accessToken = process.env.ACCESS_TOKEN_MERCADO_PAGO || ""

console.log("imprimiendo token mercado pago: " + accessToken)


const ngrokUrl = "https://22fd-2806-106e-e-2a81-f60a-fb13-8dd2-643d.ngrok-free.app";

const mercadoPagoRepository = new MercadoPagoRepositoryImpl(accessToken, ngrokUrl);

const createPlanUseCase = new CreatePlanUseCase(mercadoPagoRepository);
const createSubscriptionUseCase = new CreateSubscriptionUseCase(mercadoPagoRepository);

const planController = new PlanController(createPlanUseCase);
const subscriptionController = new SubscriptionController(createSubscriptionUseCase);


export { planController, subscriptionController };
