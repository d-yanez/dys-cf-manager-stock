"use strict";
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
exports.orderProcessing = void 0;
//import axios from 'axios';
// Función que manejará la Cloud Function
const orderProcessing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("orderProcessing init...");
    if (req.method !== 'POST') {
        return res.status(405).send('Método no permitido');
    }
    // Responder inmediatamente al evento
    console.log("response 200");
    res.status(200).send('OK');
    // Procesar el evento en background
    setImmediate(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("setImmediate init...");
            const order = req.body;
            console.log(order);
            /*const token = await getMercadoLibreToken();

            // Recorrer cada item de la orden de compra
            for (const item of order.items) {
                const sku = item.sku;
                const stock = await checkStockInMercadoLibre(sku, token);

                // Si no hay stock, enviar mensaje a Meta
                if (stock === 0) {
                    await sendMessageToMeta(`No hay stock para el SKU: ${sku}`);
                }

                // Verificar si es SKU de fulfillment
                if (item.fulfillment) {
                    const warehouseStock = await checkFulfillmentStock(sku, token);
                    if (warehouseStock === 0) {
                        await sendMessageToMeta(`No hay stock de fulfillment para el SKU: ${sku}`);
                    }
                }
            }
            */
        }
        catch (error) {
            console.error('Error en el procesamiento de la orden:', error);
        }
    }));
});
exports.orderProcessing = orderProcessing;
