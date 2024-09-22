import { Request, Response } from 'express';
//import axios from 'axios';

// Función que manejará la Cloud Function
export const orderProcessing = async (req: Request, res: Response) => {
    console.log("orderProcessing init...")
    if (req.method !== 'POST') {
        return res.status(405).send('Método no permitido');
    }

    // Responder inmediatamente al evento
    
    console.log("response 200")
    res.status(200).send('OK');
    // Procesar el evento en background
    setImmediate(async () => {
        try {
            console.log("setImmediate init...")
            const order = req.body;
            console.log(order)
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
        } catch (error) {
            console.error('Error en el procesamiento de la orden:', error);
        }
    });
};