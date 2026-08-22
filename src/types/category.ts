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

    // Collection card image
    image_path?: string | null;
    image_alt?: string | null;

    // Collection page desktop banner image
    banner_image_path?: string | null;

    // Collection page mobile banner image
    banner_mobile_image_path?: string | null;
}

export interface CategoryFormData {
    name: string;
    slug: string;
    description?: string;
    parent_id?: string | null;
    display_order?: number;
    is_active?: boolean;

    // Collection card image
    image?: File | null;

    // Collection page desktop banner image
    bannerImage?: File | null;

    // Collection page mobile banner image
    bannerMobileImage?: File | null;

    image_alt?: string;
}