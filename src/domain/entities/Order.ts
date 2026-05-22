export interface OrderItem {
    sku: string;
    fulfillment: boolean;
}

export interface Order {
    id: string;
    items: OrderItem[];
}