import express from "express"
import * as dotenv from "dotenv"
import cors from "cors";
import rateLimit from "express-rate-limit";

import { userRouter } from "./user/infrastructure/userRouter";

const app =express();

dotenv.config();
app.use(express.json());
app.use(cors());

const port=process.env.PORT_SERVER;
const now = new Date();

// Middleware de límite de tasa global
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 100, // Máximo de solicitudes por minuto
    message: 'Demasiadas solicitudes desde esta dirección IP, por favor inténtalo de nuevo más tarde.'
});


app.use(limiter);

app.listen(port,()=>{
    console.log("listening on port: "+port)
    console.log(now.toLocaleString());
});




app.use("/api/v1/users",userRouter);