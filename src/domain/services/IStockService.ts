// src/domain/services/IStockService.ts

export interface IStockService {
    checkStock(sku: string): Promise<number>;
    checkFulfillmentStock(sku: string): Promise<number>;
}
