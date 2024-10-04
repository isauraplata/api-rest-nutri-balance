import { Router } from "express";
import { planController, subscriptionController , getSubscriptionController, getSubscriptionByEmailController} from "./dependencies";
export const routerMercadoPago = Router();
// Ruta para planes
routerMercadoPago.post("/create-plan", planController.createPlan.bind(planController));
// Ruta para suscripciones
routerMercadoPago.post("/create-subscription", subscriptionController.createSubscription.bind(subscriptionController));


// Ruta para traer una suscripción por ID
routerMercadoPago.get("/get-subscription/:id", getSubscriptionController.getSubscription.bind(getSubscriptionController));


// Permite buscar suscripciones registradas con este correo electrónico.
routerMercadoPago.get("/get-subscription-by-email", getSubscriptionByEmailController.run.bind(getSubscriptionByEmailController))