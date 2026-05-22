import { Order } from '../entities/Order';

export interface IOrderRepository {
    save(order: Order): Promise<void>;
    // Otros métodos según necesidad
}