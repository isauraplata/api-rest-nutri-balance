import { Router } from "express";
import { planController, subscriptionController } from "./dependencies";

export const routerMercadoPago = Router();

// Ruta para planes
routerMercadoPago.post("/create-plan", planController.createPlan.bind(planController));

// Ruta para suscripciones
routerMercadoPago.post("/create-subscription", subscriptionController.createSubscription.bind(subscriptionController));
