export interface MercadoPagoRepository {
  createPlan(planData: any): Promise<any>;
  createSubscription(subscriptionData: any): Promise<any>;
  getSubscription(subscriptionId: string): Promise<any>; 
  searchSubscriptionsByEmail(email: string): Promise<any>;
  updateSubscription(subscriptionId: string, subscriptionData: any): Promise<any>;
  getPlan(planId: string): Promise<any>; 
  createCardToken(cardData: any): Promise<any>;
}