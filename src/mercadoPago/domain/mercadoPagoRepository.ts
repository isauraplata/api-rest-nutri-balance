export interface MercadoPagoRepository {
  createPlan(planData: any): Promise<any>;
  createSubscription(subscriptionData: any): Promise<any>;
  getSubscription(subscriptionId: string): Promise<any>; 
  searchSubscriptionsByEmail(email: string): Promise<any>;
}