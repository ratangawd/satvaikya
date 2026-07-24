import { supabase } from "@/lib/supabase";
import type {
    ProductImage,
    ProductImageFormData,
} from "@/types/product-image";

const BUCKET = "product-images";

// Get all images for a product
export async function getProductImages(
    productId: string
): Promise<ProductImage[]> {
    const { data, error } = await supabase
        .from("product_images")
        .select("*")
        .eq("product_id", productId)
        .order("display_order", { ascending: true });

    if (error) throw error;

    return data;
}

// Upload image to Storage + save in DB
export async function uploadProductImage(
    productId: string,
    file: File
): Promise<ProductImage> {
    const extension = file.name.split(".").pop();

    const fileName = `${productId}/${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Find highest display order
    const { data: existing } = await supabase
        .from("product_images")
        .select("display_order")
        .eq("product_id", productId)
        .order("display_order", { ascending: false })
        .limit(1);

    const nextOrder =
        existing && existing.length > 0
            ? existing[0].display_order + 1
            : 1;

    // Check if first image
    const { count } = await supabase
        .from("product_images")
        .select("*", { count: "exact", head: true })
        .eq("product_id", productId);

    const payload: ProductImageFormData = {
        product_id: productId,
        storage_path: fileName,
        display_order: nextOrder,
        is_primary: count === 0,
        alt_text: "",
    };

    const { data, error } = await supabase
        .from("product_images")
        .insert(payload)
        .select()
        .single();

    if (error) throw error;

    return data;
}

// Delete image
export async function deleteProductImage(
    image: ProductImage
): Promise<void> {
    const { error: storageError } = await supabase.storage
        .from(BUCKET)
        .remove([image.storage_path]);

    if (storageError) throw storageError;

    const { error } = await supabase
        .from("product_images")
        .delete()
        .eq("id", image.id);

    if (error) throw error;
}

// Set primary image
export async function setPrimaryImage(
    image: ProductImage
): Promise<void> {
    // Remove current primary
    await supabase
        .from("product_images")
        .update({ is_primary: false })
        .eq("product_id", image.product_id);

    // Set selected image
    const { error } = await supabase
        .from("product_images")
        .update({ is_primary: true })
        .eq("id", image.id);

    if (error) throw error;
}

// Generate public URL
export function getImageUrl(path: string): string {
    const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(path);

    return data.publicUrl;
}