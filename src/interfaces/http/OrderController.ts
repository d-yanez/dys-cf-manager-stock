// src/interfaces/http/OrderController.ts

import { Request, Response } from 'express';
import { ProcessOrder } from '../../application/use-cases/ProcessOrder';
import { OrderRepository } from '../../infrastructure/repositories/OrderRepository';
import { MercadoLibreService } from '../../infrastructure/services/MercadoLibreService';
import { MetaMessageService } from '../../infrastructure/services/MetaMessageService';
import { Order } from '../../domain/entities/Order';
import logger from '../../utils/Logger';

export class OrderController {
    public async handle(req: Request, res: Response): Promise<void> {
        if (req.method !== 'POST') {
            res.status(405).send('Método no permitido');
            return;
        }

        res.status(200).send('OK');

        //logger.info('Recibiendo orden de compra', { body: req.body });
        console.log("OrderController.handle -> recibiendo order")
        console.log(req.body)
        const orderData: Order = req.body;

        // Inicializar servicios con tokens (puedes cargar estos valores desde config)
        const mercadoLibreService = new MercadoLibreService(process.env.MERCADOLIBRE_TOKEN || '');
        const metaMessageService = new MetaMessageService(process.env.META_TOKEN || '');

        const orderRepository = new OrderRepository(); // Implementa esta clase según tus necesidades

        const processOrder = new ProcessOrder(orderRepository, mercadoLibreService, metaMessageService);

        // Procesar la orden en background
        setImmediate(async () => {
            try {
                console.log("await processOrder.execute(orderData)")
                //await processOrder.execute(orderData);
            } catch (error) {
                console.error('Error procesando la orden:', error);
            }
        });
    }
}
