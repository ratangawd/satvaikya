export interface Product {
    id: string;
    category_id: string;

    name: string;
    slug: string;

    code: string | null;
    price: number | null;

    short_description: string;
    description: string | null;

    specifications: { key: string; value: string }[];

    status: "draft" | "active" | "archived";

    featured: boolean;

    amazon_enabled: boolean;
    amazon_url: string | null;
    instagram_url?: string | null;
    youtube_url?: string | null;

    display_order: number;

    is_active: boolean;

    seo_title: string | null;
    seo_description: string | null;

    created_at: string;
    updated_at: string;

    categories?: {
        id: string;
        name: string;
        slug: string;
    };

    product_images?: {
        id: string;
        storage_path: string;
        alt_text: string | null;
        display_order: number;
        is_primary: boolean;
    }[];
}

export interface ProductFormData {
    category_id: string;

    name: string;
    slug: string;

    code?: string | null;
    price?: number | null;

    short_description: string;
    description?: string;

    specifications?: { key: string; value: string }[];

    status: "draft" | "active" | "archived";

    featured: boolean;

    amazon_enabled: boolean;
    amazon_url?: string | null;
    instagram_url?: string | null;
    youtube_url?: string | null;

    display_order?: number;

    is_active: boolean;

    seo_title?: string;
    seo_description?: string;
}