import { Router } from "express";
import { SendMessageController } from "./controllers/sendMessageController";
import { TwilioWhatsAppService } from "./services/twilioWhatsappService";
import { SendMessageUseCase } from "../application/sendMessageUseCase";

const whatsappRouter = Router();

const whatsappService = new TwilioWhatsAppService();
const sendMessageUseCase = new SendMessageUseCase(whatsappService);
const sendMessageController = new SendMessageController(sendMessageUseCase);

whatsappRouter.post("/send", (req, res) => sendMessageController.handle(req, res));

export default whatsappRouter;