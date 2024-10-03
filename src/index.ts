import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { userRouter } from "./users/infrastructure/userRouter";
import { routerMercadoPago } from "./mercado pago/infrastructure/mercadoRouter";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT_SERVER;
const now = new Date();

// Middleware de límite de tasa global
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100, // Máximo de solicitudes por minuto
  message: 'Demasiadas solicitudes desde esta dirección IP, por favor inténtalo de nuevo más tarde.'
});

app.use(limiter);

// Mover el `app.listen` a un archivo separado cuando hagas pruebas
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log("listening on port: " + port);
    console.log(now.toLocaleString());
  });
}

app.use("/api/v1/users", userRouter);

app.use("/api/v1/mercado", routerMercadoPago);

export default app;  
