import { supabase } from "@/lib/supabase";
import { getImageUrl } from "@/services/product-image.service";
import { getCategoryImageUrl } from "@/services/category-image.service";

function mapSpecifications(specifications: any) {
    if (!Array.isArray(specifications)) return [];

    return specifications.map((spec) => ({
        label: spec.label,
        value: spec.value,
    }));
}

export async function getStoreCategories() {
    const { data, error } = await supabase
        .from("categories")
        .select(`
            *,
            products (
                *,
                product_images (
                    storage_path,
                    is_primary
                )
            )
        `)
        .eq("is_active", true)
        .order("display_order", { ascending: true });

    if (error) throw error;

    const mappedCategories = (data ?? []).map((category: any) => ({
        id: category.id,
        parentId: category.parent_id,
        slug: category.slug,
        name: category.name,
        tagline: "",
        description: category.description,
        image: category.image_path
            ? getCategoryImageUrl(category.image_path)
            : "",
        imageAlt: category.image_alt,

        products: (category.products ?? [])
            .filter(
                (product: any) =>
                    product.is_active &&
                    product.status === "active"
            )
            .sort(
                (a: any, b: any) =>
                    (a.display_order ?? 0) - (b.display_order ?? 0)
            )
            .map((product: any) => {
                const primaryImage =
                    product.product_images?.find(
                        (img: any) => img.is_primary
                    ) ?? product.product_images?.[0];

                return {
                    id: product.id,
                    slug: product.slug,
                    code: product.code,
                    name: product.name,
                    price: product.price ?? 0,

                    short: product.short_description,
                    long: product.description,

                    specs: mapSpecifications(product.specifications),

                    image: primaryImage
                        ? getImageUrl(primaryImage.storage_path)
                        : "",

                    featured: product.featured,
                    amazonEnabled: product.amazon_enabled,
                    amazonUrl: product.amazon_url,
                };
            }),

        children: [],
    }));

    const categoryMap = new Map();

    mappedCategories.forEach((category: any) => {
        categoryMap.set(category.id, category);
    });

    const rootCategories: any[] = [];

    mappedCategories.forEach((category: any) => {
        if (category.parentId) {
            const parent = categoryMap.get(category.parentId);

            if (parent) {
                parent.children.push(category);
            }
        } else {
            rootCategories.push(category);
        }
    });

    return rootCategories;
}

function findCategoryBySlug(categories: any[], slug: string): any {
    for (const category of categories) {
        if (category.slug === slug) {
            return category;
        }

        if (category.children?.length) {
            const child = findCategoryBySlug(category.children, slug);

            if (child) {
                return child;
            }
        }
    }

    return null;
}

export async function getStoreCategory(slug: string) {
    const categories = await getStoreCategories();

    return findCategoryBySlug(categories, slug);
}

export async function getStoreProduct(
    categorySlug: string,
    productSlug: string
) {
    const category = await getStoreCategory(categorySlug);

    if (!category) return null;

    const product = (category.products ?? []).find(
        (product: any) => product.slug === productSlug
    );

    if (!product) return null;

    return {
        category,
        product,
    };
}

function collectFeaturedProducts(
    categories: any[],
    featured: any[] = []
) {
    for (const category of categories) {
        featured.push(
            ...(category.products ?? [])
                .filter((product: any) => product.featured)
                .map((product: any) => ({
                    ...product,
                    categorySlug: category.slug,
                    categoryName: category.name,
                }))
        );

        if (category.children?.length) {
            collectFeaturedProducts(category.children, featured);
        }
    }

    return featured;
}

export async function getFeaturedProducts() {
    const categories = await getStoreCategories();

    return collectFeaturedProducts(categories);
}