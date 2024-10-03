import { WhatsAppMessage } from "../../domain/whatsappMessage";
import { WhatsAppService } from "../../domain/whatsappService";
import twilio from "twilio";

export class TwilioWhatsAppService implements WhatsAppService {
    private client;

    constructor() {
        this.client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async sendMessage(message: WhatsAppMessage): Promise<void> {
        console.log("LLego hasta aca");
        await this.client.messages.create({
            body: message.message,
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
            to: `whatsapp:${message.to}`
        });
    }
}