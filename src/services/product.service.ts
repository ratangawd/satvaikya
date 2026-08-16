import { supabase } from "@/lib/supabase";
import type { Product, ProductFormData } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select(`
    *,
    categories!products_category_id_fkey (
        id,
        name,
        slug
    ),
    product_images (
        id,
        storage_path,
        alt_text,
        display_order,
        is_primary
    )
`)
        .order("display_order", { ascending: true });

    if (error) throw error;
        
    return data as Product[];
}

export async function createProduct(
    product: ProductFormData
): Promise<Product> {
    const { data, error } = await supabase
        .from("products")
        .insert(product)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function updateProduct(
    id: string,
    product: ProductFormData
): Promise<Product> {
    const { data, error } = await supabase
        .from("products")
        .update(product)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) throw error;
}

export async function toggleProductStatus(
    id: string,
    is_active: boolean
): Promise<Product> {
    const { data, error } = await supabase
        .from("products")
        .update({ is_active })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
}
