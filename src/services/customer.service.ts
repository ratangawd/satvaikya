import { supabase } from "@/lib/supabase";
import { CustomerProfile } from "@/types/customer-auth";

export async function getCustomerProfile(
    id: string
): Promise<CustomerProfile | null> {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user || user.id !== id) {
        return null;
    }

    const { data, error } =
        await supabase
            .from("customer_profiles")
            .select("*")
            .eq("id", id)
            .single();

    if (error) return null;

    return data;
}