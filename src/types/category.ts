export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    parent_id: string | null;
    display_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;

    image_path?: string | null;
    image_alt?: string | null;
}

export interface CategoryFormData {
    name: string;
    slug: string;
    description?: string;
    parent_id?: string | null;
    display_order?: number;
    is_active?: boolean;

    image?: File | null;
    image_alt?: string;
}