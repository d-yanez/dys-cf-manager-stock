// src/infrastructure/repositories/OrderRepository.ts

import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order } from '../../domain/entities/Order';

export class OrderRepository implements IOrderRepository {
    async save(order: Order): Promise<void> {
        // Implementa la lógica para guardar la orden, por ejemplo, en una base de datos
        console.log('Orden guardada:', order);
        // Aquí podrías usar Firestore, Firestore, etc.
    }
}
