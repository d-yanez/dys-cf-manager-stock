// src/application/use-cases/ProcessOrder.ts

import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { IStockService } from '../../domain/services/IStockService';
import { MetaMessageService } from '../../infrastructure/services/MetaMessageService';
import { Order } from '../../domain/entities/Order';

export class ProcessOrder {
    private orderRepository: IOrderRepository;
    private stockService: IStockService;
    private metaMessageService: MetaMessageService;

    constructor(orderRepository: IOrderRepository, stockService: IStockService, metaMessageService: MetaMessageService) {
        this.orderRepository = orderRepository;
        this.stockService = stockService;
        this.metaMessageService = metaMessageService;
    }

    async execute(order: Order): Promise<void> {
        // Guardar la orden en el repositorio
        await this.orderRepository.save(order);

        // Procesar cada ítem de la orden
        for (const item of order.items) {
            const stock = await this.stockService.checkStock(item.sku);

            if (stock === 0) {
                await this.metaMessageService.sendMessage(`No hay stock para el SKU: ${item.sku}`);
            }

            if (item.fulfillment) {
                const fulfillmentStock = await this.stockService.checkFulfillmentStock(item.sku);
                if (fulfillmentStock === 0) {
                    await this.metaMessageService.sendMessage(`No hay stock de fulfillment para el SKU: ${item.sku}`);
                }
            }
        }
    }
}
