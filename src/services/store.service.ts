//Folder 2 - store.service.ts

import { supabase } from "@/lib/supabase";
import { getImageUrl } from "@/services/product-image.service";
import { getCategoryImageUrl } from "@/services/category-image.service";

function mapSpecifications(specifications: unknown) {
    if (!Array.isArray(specifications)) return [];

    return specifications.map((spec: { key?: string; label?: string; value: string }) => ({
        label: spec.label ?? spec.key ?? "",
        value: spec.value,
    }));
}

export interface StoreBreadcrumb {
    name: string;
    slug: string;
}

export interface StoreProduct {
    id: string;
    slug: string;
    path: string;
    code: string;
    name: string;
    price: number;
    short: string;
    long: string;
    specs: { label: string; value: string }[];
    image: string;

    images: string[]; // <-- ADD THIS

    featured: boolean;
    amazonEnabled: boolean;
    amazonUrl: string | null;
    instagramUrl?: string | null;
    youtubeUrl?: string | null;
}

export interface StoreCategory {
    id: string;
    parentId: string | null;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    image: string;
    imageAlt: string;
    products: StoreProduct[];
    children: StoreCategory[];
    /** Ancestor categories from root down to (but not including) this category */
    ancestors: StoreBreadcrumb[];
}

function mapProduct(product: Record<string, unknown>): StoreProduct {
    const images = product.product_images as
        | { storage_path: string; is_primary: boolean }[]
        | undefined;

    const primaryImage =
        images?.find((img) => img.is_primary) ?? images?.[0];

    return {
        id: product.id as string,
        slug: product.slug as string,
        path: product.path as string,
        code: (product.code ?? "") as string,
        name: product.name as string,
        price: (product.price as number) ?? 0,
        short: product.short_description as string,
        long: product.description as string,
        specs: mapSpecifications(product.specifications),

        image: primaryImage ? getImageUrl(primaryImage.storage_path) : "",

        // ✅ NEW
        images: (images ?? []).map((img) => getImageUrl(img.storage_path)),

        featured: product.featured as boolean,
        amazonEnabled: product.amazon_enabled as boolean,
        amazonUrl: product.amazon_url as string | null,
        instagramUrl: product.instagram_url as string | null,
        youtubeUrl: product.youtube_url as string | null,
    };
}

export async function getStoreCategories(): Promise<StoreCategory[]> {
    const { data, error } = await supabase
        .from("categories")
        .select(`
            *,
            products!products_category_id_fkey (
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

    const raw = (data ?? []) as Record<string, unknown>[];

    const mapped: StoreCategory[] = raw.map((category) => {
        const rawProducts = (category.products as Record<string, unknown>[]) ?? [];

        // 🔍 DIAGNOSTIC LOGGING — inspect the actual field values before filtering
        if (rawProducts.length > 0) {
            console.log(
                "CATEGORY:",
                category.name,
                "RAW PRODUCT COUNT:",
                rawProducts.length
            );
            console.log("FIRST PRODUCT FULL OBJECT:", JSON.stringify(rawProducts[0], null, 2));
            console.log(
                "FIRST PRODUCT KEY FIELDS ->",
                "status:", rawProducts[0].status,
                "| is_active:", rawProducts[0].is_active,
                "| category_id:", rawProducts[0].category_id
            );
        }

        // ⚠️ Filter made resilient: don't assume exact casing/value of `status`,
        // and don't assume `is_active` is always present as a strict boolean.
        // Previously: p.is_active && p.status === "active"
        // That silently drops every product if either field is missing,
        // null, a different case ("Active"), or a different value ("published").
        const filteredProducts = rawProducts.filter((p) => {
            const isActiveOk = p.is_active === undefined || p.is_active === null
                ? true // field not present on this row — don't reject on it
                : Boolean(p.is_active);

            const statusRaw = typeof p.status === "string" ? p.status.toLowerCase() : p.status;
            const statusOk = p.status === undefined || p.status === null
                ? true // field not present — don't reject on it
                : statusRaw === "active" || statusRaw === "published";

            return isActiveOk && statusOk;
        });

        if (rawProducts.length > 0 && filteredProducts.length === 0) {
            console.warn(
                `CATEGORY "${category.name}" had ${rawProducts.length} raw product(s) but 0 survived the filter — check status/is_active values above.`
            );
        }

        return {
            id: category.id as string,
            parentId: category.parent_id as string | null,
            slug: category.slug as string,
            name: category.name as string,
            tagline: "",
            description: category.description as string,
            image: category.image_path
                ? getCategoryImageUrl(category.image_path as string)
                : "",
            imageAlt: category.image_alt as string,
            products: filteredProducts
                .sort(
                    (a, b) =>
                        ((a.display_order as number) ?? 0) -
                        ((b.display_order as number) ?? 0)
                )
                .map(mapProduct),
            children: [],
            ancestors: [],
        };
    });

    const categoryMap = new Map<string, StoreCategory>();
    mapped.forEach((c) => categoryMap.set(c.id, c));

    const rootCategories: StoreCategory[] = [];

    mapped.forEach((category) => {
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

/**
 * Recursively searches for a category by slug, attaching ancestors along the way.
 * Returns the category with `ancestors` populated, or null if not found.
 */
function findCategoryBySlugWithAncestors(
    categories: StoreCategory[],
    slug: string,
    ancestors: StoreBreadcrumb[] = []
): StoreCategory | null {
    for (const category of categories) {
        if (category.slug === slug) {
            return { ...category, ancestors };
        }

        if (category.children.length > 0) {
            const found = findCategoryBySlugWithAncestors(
                category.children,
                slug,
                [
                    ...ancestors,
                    { name: category.name, slug: category.slug },
                ]
            );

            if (found) return found;
        }
    }

    return null;
}

export async function getStoreCategory(
    categorySlug: string,
    subCategorySlug?: string
): Promise<StoreCategory | null> {

    const categories = await getStoreCategories();
    console.log("ALL ROOT CATEGORIES:", categories.map(c => c.slug));

    const category = findCategoryBySlugWithAncestors(
        categories,
        categorySlug
    );

    console.log("SEARCHING:", categorySlug);
    console.log("FOUND CATEGORY:", category);

    if (!category) return null;

    if (!subCategorySlug) {
        return category;
    }

    return findCategoryBySlugWithAncestors(
        category.children,
        subCategorySlug,
        [
            ...category.ancestors,
            {
                name: category.name,
                slug: category.slug,
            },
        ]
    );
}

/**
 * ── CENTRALIZED URL BUILDERS ──────────────────────────────────────────────
 * Every screen (Navbar, Collections, CategoryPage, ProductPage, breadcrumbs,
 * search, wishlist, related products, admin previews, etc.) should build
 * /collections/... URLs through these two helpers instead of concatenating
 * strings by hand. That's what caused the inconsistent / broken links:
 * some components used the full ancestor chain, some used only the last
 * ancestor, some ignored ancestors entirely.
 */
export function getCategoryUrl(
    category: Pick<StoreCategory, "slug" | "ancestors">
): string {
    const segments = [
        ...category.ancestors.map((a) => a.slug),
        category.slug,
    ];
    return `/collections/${segments.join("/")}`;
}

export function getProductUrl(
    category: Pick<StoreCategory, "slug" | "ancestors">,
    product: Pick<StoreProduct, "slug">
): string {
    return `${getCategoryUrl(category)}/${product.slug}`;
}

/**
 * ── CENTRALIZED PATH RESOLUTION ───────────────────────────────────────────
 * Given the raw URL segments after "/collections/", walks the category tree
 * one segment at a time. Whichever segment is the *last* one is allowed to
 * be either a category slug or a product slug within the last matched
 * category — this is what lets the same route pattern serve:
 *   /collections/gifts
 *   /collections/gifts/personalized-gifts
 *   /collections/gifts/personalized-gifts/keychain
 *   /collections/diy-kits
 *   /collections/diy-kits/diy-magnetic
 * without any special-casing per depth, and without duplicating this logic
 * in a separate resolver component.
 */
export type ResolvedStorePath =
    | { type: "category"; category: StoreCategory }
    | { type: "product"; category: StoreCategory; product: StoreProduct }
    | null;

export async function resolveStorePath(
    rawSegments: string[]
): Promise<ResolvedStorePath> {
    const segments = rawSegments.filter(Boolean);
    if (segments.length === 0) return null;

    const rootCategories = await getStoreCategories();

    let currentLevel: StoreCategory[] = rootCategories;
    let currentCategory: StoreCategory | null = null;
    let ancestors: StoreBreadcrumb[] = [];

    for (let i = 0; i < segments.length; i++) {
        const slug = segments[i];
        const match = currentLevel.find((c) => c.slug === slug);

        if (match) {
            currentCategory = { ...match, ancestors };
            ancestors = [...ancestors, { name: match.name, slug: match.slug }];
            currentLevel = match.children;
            continue;
        }

        // No category matched at this depth. This is only valid if it's the
        // final segment and it matches a product inside the last category
        // we successfully resolved.
        const isLastSegment = i === segments.length - 1;
        if (!isLastSegment || !currentCategory) return null;

        const product = currentCategory.products.find((p) => p.slug === slug);
        if (!product) return null;

        return { type: "product", category: currentCategory, product };
    }

    if (!currentCategory) return null;
    return { type: "category", category: currentCategory };
}

export async function getStoreProduct(
    categorySlug: string,
    subCategorySlug: string | undefined,
    productSlug: string
): Promise<{ category: StoreCategory; product: StoreProduct } | null> {

    const category = await getStoreCategory(
        categorySlug,
        subCategorySlug
    );

    if (!category) return null;

    const product = category.products.find(
        (p) => p.slug === productSlug
    );

    if (!product) return null;

    return {
        category,
        product,
    };
}
/**
 * Recursively collects all featured products from every category at any depth.
 */
function collectFeatured(
    categories: StoreCategory[]
): (StoreProduct & { categorySlug: string; categoryName: string })[] {
    const results: (StoreProduct & { categorySlug: string; categoryName: string })[] =
        [];

    for (const category of categories) {
        for (const product of category.products) {
            if (product.featured) {
                results.push({
                    ...product,
                    categorySlug: category.slug,
                    categoryName: category.name,
                });
            }
        }

        if (category.children.length > 0) {
            results.push(...collectFeatured(category.children));
        }
    }

    return results;
}

export async function getFeaturedProducts() {
    const categories = await getStoreCategories();
    return collectFeatured(categories);
}