import { supabase } from "@/lib/supabase";

const BUCKET = "category-images";

export function getCategoryImageUrl(path: string): string {
    const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(path);

    return data.publicUrl;
}