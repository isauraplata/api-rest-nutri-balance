import axios from 'axios';
import { MercadoPagoRepository } from '../domain/mercadoPagoRepository';
import { MercadoPagoPlan } from '../domain/PlanModel';
import { MercadoPagoSubscription } from '../domain/SubcriptionModel';
import dotenv from "dotenv";

dotenv.config();

export class MercadoPagoRepositoryImpl implements MercadoPagoRepository {
  private accessToken: string;
  private ngrokUrl: string;
  constructor(accessToken: string, ngrokUrl: string) {
    this.accessToken = accessToken;
    this.ngrokUrl = ngrokUrl;
  }
  async createPlan(planData: MercadoPagoPlan): Promise<any> {
    try {
        console.log("CREANDO PLANNN ")
      const response = await axios.post("https://api.mercadopago.com/preapproval_plan", {
        reason: planData.reason,
        auto_recurring: {
          frequency: planData.frequency,
          frequency_type: planData.frequencyType,
          repetitions: planData.repetitions,
          billing_day: planData.billingDay,
          billing_day_proportional: true,
          transaction_amount: planData.amount,
          currency_id: planData.currency
        },
        back_url: `${this.ngrokUrl}/planes`
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.accessToken}`
        }
      });
      console.log("RESPONSE PLAN ", response)
      return response.data; 
    } catch (error) {
      console.error('Error al crear el plan:', error);
      throw new Error('Error al crear el plan');
    }
  }
  async createSubscription(subscriptionData: MercadoPagoSubscription): Promise<any> {
    try {
        console.log("CREANDO SUBSUBSCRIPTION ")
      const response = await axios.post("https://api.mercadopago.com/preapproval", {
        preapproval_plan_id: subscriptionData.planId,
        reason: subscriptionData.reason,
        external_reference: "YG-1234",
        payer_email: subscriptionData.payerEmail,
        card_token_id: subscriptionData.token,
        status: "authorized",
        auto_recurring: {
          frequency: subscriptionData.frequency,
          frequency_type: subscriptionData.frequencyType,
          start_date: subscriptionData.startDate,
          transaction_amount: subscriptionData.amount,
          currency_id: subscriptionData.currency
        },
        back_url: `${this.ngrokUrl}/subscriptions/callback`
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.accessToken}`
        }
      });
      console.log("RESPONSE SUBSCRIPTION ", response)
      return response.data; 
    } catch (error) {
      console.error('Error al crear la suscripción:', error);
      throw new Error('Error al crear la suscripción');
    }
  }

  async getSubscription(subscriptionId: string): Promise<any> {
    try {
        const response = await axios.get(`https://api.mercadopago.com/preapproval/${subscriptionId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.accessToken}`
            }
        });

        console.log("RESPONSE SUSCRIPCION ", response);
        return response.data; 
    } catch (error) {
        console.error('Error al obtener la suscripción:', error);
        throw new Error('Error al obtener la suscripción');
    }
}

async searchSubscriptionsByEmail(email: string): Promise<any> {
  try {
    // Corrección en la URL y parámetros
    console.log("AHHHH EMIALL", email);
    const response = await axios.get(`https://api.mercadopago.com/preapproval/search`, {
      params: {
        payer_email: email
      },
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.data) {
      throw new Error('No se encontraron datos en la respuesta');
    }

    console.log('Response from MP:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al buscar suscripciones:', error);
    throw new Error('Error al buscar suscripciones por email');
  }
}

}