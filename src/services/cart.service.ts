import { supabase } from "@/lib/supabase";

export async function getCart(customerId: string) {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user || user.id !== customerId) {
        throw new Error("Unauthorized");
    }

    const { data, error } = await supabase
        .from("cart_items")
        .select(`
            *,
            products (*)
        `)
        .eq("customer_id", customerId);

    if (error) throw error;

    return data;
}

export async function addToCart(
    customerId: string,
    productId: string,
    quantity: number = 1
) {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user || user.id !== customerId) {
        throw new Error("Unauthorized");
    }

    const { data: existing } = await supabase
        .from("cart_items")
        .select("*")
        .eq("customer_id", customerId)
        .eq("product_id", productId)
        .maybeSingle();

    if (existing) {
        const { error } = await supabase
            .from("cart_items")
            .update({
                quantity: existing.quantity + quantity,
                updated_at: new Date().toISOString(),
            })
            .eq("id", existing.id)
            .eq("customer_id", customerId);

        if (error) throw error;

        return;
    }

    const { error } = await supabase
        .from("cart_items")
        .insert({
            customer_id: customerId,
            product_id: productId,
            quantity,
        });

    if (error) throw error;
}

export async function updateCartQuantity(
    cartItemId: string,
    quantity: number
) {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("Unauthorized");
    }

    const { error } = await supabase
        .from("cart_items")
        .update({
            quantity,
            updated_at: new Date().toISOString(),
        })
        .eq("id", cartItemId)
        .eq("customer_id", user.id);

    if (error) throw error;
}

export async function removeFromCart(cartItemId: string) {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("Unauthorized");
    }

    const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", cartItemId)
        .eq("customer_id", user.id);

    if (error) throw error;
}

export async function clearCart(customerId: string) {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user || user.id !== customerId) {
        throw new Error("Unauthorized");
    }

    const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("customer_id", customerId);

    if (error) throw error;
}