export interface ProductImage {
    id: string;
    product_id: string;
    storage_path: string;
    alt_text: string | null;
    display_order: number;
    is_primary: boolean;
    created_at: string;
}

export interface ProductImageFormData {
    product_id: string;
    storage_path: string;
    alt_text?: string;
    display_order?: number;
    is_primary?: boolean;
}