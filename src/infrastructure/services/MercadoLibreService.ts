// src/infrastructure/services/MercadoLibreService.ts

import axios from 'axios';
import { IStockService } from '../../domain/services/IStockService';

export class MercadoLibreService implements IStockService {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    async checkStock(sku: string): Promise<number> {
        const response = await axios.get(`https://api.mercadolibre.com/items/${sku}/stock`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });
        return response.data.available_quantity;
    }

    async checkFulfillmentStock(sku: string): Promise<number> {
        const response = await axios.get(`https://api.mercadolibre.com/fulfillment/items/${sku}/stock`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });
        return response.data.available_quantity;
    }
}
