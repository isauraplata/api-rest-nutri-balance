import { WhatsAppMessage } from "../domain/whatsappMessage";
import { WhatsAppService } from "../domain/whatsappService";

export class SendMessageUseCase {
    constructor(private whatsappService: WhatsAppService) {}

    async execute(to: string, message: string): Promise<void> {
        const whatsappMessage = new WhatsAppMessage(to, message);
        await this.whatsappService.sendMessage(whatsappMessage);
    }
}