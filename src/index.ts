// src/index.ts

import express, { Request, Response } from 'express';
import { OrderController } from './interfaces/http/OrderController';
//import { config } from '../config';

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

const orderController = new OrderController();

app.post('/', (req: Request, res: Response) => {
    orderController.handle(req, res);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

// Exportar la función para Google Cloud Functions
export const orderProcessing = app;
