import { Product } from "./product";

export interface CartItem {
    id: string;
    customerId: string;
    productId: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;

    product: Product;
}

export interface StoreCartItem {
    id: string;
    customer_id: string;
    product_id: string;
    quantity: number;
    created_at: string;
    updated_at: string;

    products: Product;
}

export function mapCartItem(item: StoreCartItem): CartItem {
    return {
        id: item.id,
        customerId: item.customer_id,
        productId: item.product_id,
        quantity: item.quantity,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        product: item.products,
    };
}