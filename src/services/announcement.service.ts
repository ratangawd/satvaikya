import { supabase } from "@/lib/supabase";
import type { Announcement } from "@/types/announcement";

const TABLE = "announcements";

export async function getAnnouncements(): Promise<Announcement[]> {
    const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

    if (error) {
        console.error("Failed to load announcements:", error);
        return [];
    }

    return data ?? [];
}