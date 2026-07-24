export interface Product {
    id: string;
    category_id: string;

    name: string;
    slug: string;

    short_description: string;
    description: string | null;

    status: "draft" | "published" | "archived";

    featured: boolean;

    amazon_enabled: boolean;
    amazon_url: string | null;

    display_order: number;

    is_active: boolean;

    seo_title: string | null;
    seo_description: string | null;

    created_at: string;
    updated_at: string; 

    categories?: {
        name: string;
    };
}

export interface ProductFormData {
    category_id: string;

    name: string;
    slug: string;

    short_description: string;
    description?: string;

    status: "draft" | "published" | "archived";

    featured: boolean;

    amazon_enabled: boolean;
    amazon_url?: string | null;

    display_order?: number;

    is_active: boolean;

    seo_title?: string;
    seo_description?: string;
}