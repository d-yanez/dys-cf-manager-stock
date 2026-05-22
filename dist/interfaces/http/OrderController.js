"use strict";
// src/interfaces/http/OrderController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const ProcessOrder_1 = require("../../application/use-cases/ProcessOrder");
const OrderRepository_1 = require("../../infrastructure/repositories/OrderRepository");
const MercadoLibreService_1 = require("../../infrastructure/services/MercadoLibreService");
const MetaMessageService_1 = require("../../infrastructure/services/MetaMessageService");
class OrderController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.method !== 'POST') {
                res.status(405).send('Método no permitido');
                return;
            }
            res.status(200).send('OK');
            //logger.info('Recibiendo orden de compra', { body: req.body });
            console.log("OrderController.handle -> recibiendo order");
            console.log(req.body);
            const orderData = req.body;
            // Inicializar servicios con tokens (puedes cargar estos valores desde config)
            const mercadoLibreService = new MercadoLibreService_1.MercadoLibreService(process.env.MERCADOLIBRE_TOKEN || '');
            const metaMessageService = new MetaMessageService_1.MetaMessageService(process.env.META_TOKEN || '');
            const orderRepository = new OrderRepository_1.OrderRepository(); // Implementa esta clase según tus necesidades
            const processOrder = new ProcessOrder_1.ProcessOrder(orderRepository, mercadoLibreService, metaMessageService);
            // Procesar la orden en background
            setImmediate(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    console.log("await processOrder.execute(orderData)");
                    //await processOrder.execute(orderData);
                }
                catch (error) {
                    console.error('Error procesando la orden:', error);
                }
            }));
        });
    }
}
exports.OrderController = OrderController;
