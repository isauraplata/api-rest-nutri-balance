import { WhatsAppMessage } from "./whatsappMessage";

export interface WhatsAppService {
    sendMessage(message: WhatsAppMessage): Promise<void>;
}