import { supabase } from "@/lib/supabase";
import type { Category, CategoryFormData } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("display_order", { ascending: true });

    if (error) throw error;

    return data ?? [];
}

async function uploadCategoryImage(file: File): Promise<string> {
    const extension = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${extension}`;

    const { error } = await supabase.storage
        .from("category-images")
        .upload(fileName, file);

    if (error) throw error;

    return fileName;
}

export async function createCategory(
    category: CategoryFormData
): Promise<Category> {

    let imagePath = "";
    let bannerImagePath = "";

    // Upload collection card image
    if (category.image) {
        imagePath = await uploadCategoryImage(category.image);
    }

    // Upload collection banner image
    if (category.bannerImage) {
        bannerImagePath = await uploadCategoryImage(category.bannerImage);
    }

    const { data, error } = await supabase
        .from("categories")
        .insert([
            {
                name: category.name,
                slug: category.slug,
                description: category.description ?? "",
                parent_id: category.parent_id ?? null,
                display_order: category.display_order ?? 0,
                is_active: category.is_active ?? true,

                // Card image
                image_path: imagePath || null,

                // Banner image
                banner_image_path: bannerImagePath || null,

                image_alt: category.image_alt ?? "",
            },
        ])
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function updateCategory(
    id: string,
    category: CategoryFormData
): Promise<Category> {

    let imagePath: string | undefined;
    let bannerImagePath: string | undefined;

    // Upload new card image only if selected
    if (category.image) {
        imagePath = await uploadCategoryImage(category.image);
    }

    // Upload new banner image only if selected
    if (category.bannerImage) {
        bannerImagePath = await uploadCategoryImage(category.bannerImage);
    }

    const { data, error } = await supabase
        .from("categories")
        .update({
            name: category.name,
            slug: category.slug,
            description: category.description ?? "",
            parent_id: category.parent_id ?? null,
            display_order: category.display_order ?? 0,
            is_active: category.is_active ?? true,

            ...(imagePath && {
                image_path: imagePath,
            }),

            ...(bannerImagePath && {
                banner_image_path: bannerImagePath,
            }),

            image_alt: category.image_alt ?? "",
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function deleteCategory(id: string): Promise<void> {
    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

    if (error) throw error;
}

export async function toggleCategoryStatus(
    id: string,
    is_active: boolean
): Promise<Category> {
    const { data, error } = await supabase
        .from("categories")
        .update({ is_active })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
}