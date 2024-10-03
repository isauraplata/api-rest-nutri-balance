export class MercadoPagoSubscription {
    constructor(
        public planId: string,
        public reason: string,
        public payerEmail: string,
        public token: string,
        public amount: number,
        public frequency: number,
        public frequencyType: string,
        public startDate: string,
        public currency: string,  
        public backUrl: string
    ) {}
}
