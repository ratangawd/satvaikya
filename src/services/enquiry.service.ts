import { supabase } from "@/lib/supabase";

export async function getCustomerEnquiries(customerId: string) {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user || user.id !== customerId) {
        throw new Error("Unauthorized");
    }

    const { data, error } = await supabase
        .from("enquiries")
        .select(`
    *,
    products (
      id,
      name,
      slug,
      code,
      price,
      category_id,
      categories!products_category_id_fkey (
        id,
        slug,
        parent_id
      ),
      product_images (
        storage_path,
        is_primary
      )
    )
  `)
        .eq("customer_id", customerId)
        .order("created_at", { ascending: false })
        .limit(5);

    if (error) throw error;

    return data;
}

interface CreateEnquiryInput {
    product_id: string;
    customer_id?: string;

    customer_name: string;
    phone: string;
    email?: string;
    city?: string;

    quantity: number;

    message?: string;
}

export async function createEnquiry(
    enquiry: CreateEnquiryInput
) {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("Unauthorized");
    }

    const safeCustomerId = enquiry.customer_id ?? user.id;

    if (user.id !== safeCustomerId) {
        throw new Error("Unauthorized");
    }

    const { data, error } = await supabase
        .from("enquiries")
        .insert({
            ...enquiry,
            customer_id: safeCustomerId,
            status: "new",
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}