"use strict";
// src/application/use-cases/ProcessOrder.ts
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
exports.ProcessOrder = void 0;
class ProcessOrder {
    constructor(orderRepository, stockService, metaMessageService) {
        this.orderRepository = orderRepository;
        this.stockService = stockService;
        this.metaMessageService = metaMessageService;
    }
    execute(order) {
        return __awaiter(this, void 0, void 0, function* () {
            // Guardar la orden en el repositorio
            yield this.orderRepository.save(order);
            // Procesar cada ítem de la orden
            for (const item of order.items) {
                const stock = yield this.stockService.checkStock(item.sku);
                if (stock === 0) {
                    yield this.metaMessageService.sendMessage(`No hay stock para el SKU: ${item.sku}`);
                }
                if (item.fulfillment) {
                    const fulfillmentStock = yield this.stockService.checkFulfillmentStock(item.sku);
                    if (fulfillmentStock === 0) {
                        yield this.metaMessageService.sendMessage(`No hay stock de fulfillment para el SKU: ${item.sku}`);
                    }
                }
            }
        });
    }
}
exports.ProcessOrder = ProcessOrder;
