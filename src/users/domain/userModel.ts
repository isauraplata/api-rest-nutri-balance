export class User {
    constructor(
      public id: number,
      public uuid: string,
      public name: string,
      public email: string,
      public password: string,
      public dateOfBirth: Date,
      public height: number, // en cm
      public weight: number, // en kg
      public medicalConditions: string[],
      public allergies: string[],
      public preferredFood: string[],
      public subscriptionType: 'free' | 'premium',
      public paymentMethod?: 'paypal' | null
    ) {}
  }