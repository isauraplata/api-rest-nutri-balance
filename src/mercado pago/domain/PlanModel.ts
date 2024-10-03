export class MercadoPagoPlan {
    constructor(
      public reason: string,
      public frequency: number,
      public frequencyType: string,
      public repetitions: number,
      public billingDay: number,
      public amount: number,
      public currency: string,
      public backUrl: string
    ) {}
  }