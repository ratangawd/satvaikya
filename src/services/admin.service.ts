import { supabase } from "@/lib/supabase";

export async function getAdminProfile(userId: string) {
    const { data, error } = await supabase
        .from("admin_profiles")
        .select("*")
        .eq("id", userId)
        .eq("is_active", true)
        .single();

    if (error) {
        return null;
    }

    return data;
}