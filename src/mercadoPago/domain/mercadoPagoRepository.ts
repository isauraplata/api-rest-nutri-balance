export interface MercadoPagoRepository {
    createPlan(planData: any): Promise<any>;
    createSubscription(subscriptionData: any): Promise<any>;
  }
  