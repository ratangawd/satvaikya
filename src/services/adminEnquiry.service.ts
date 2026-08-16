import { supabase } from "@/lib/supabase";

export interface CustomerEnquiryGroup {
    customer_id: string;
    customer_name: string;
    email: string | null;
    phone: string;
    city: string | null;

    enquiryCount: number;
    lastEnquiry: string;

    enquiries: any[];
}

export async function getAdminEnquiries(): Promise<CustomerEnquiryGroup[]> {
    const { data, error } = await supabase
        .from("enquiries")
        .select(`
            *,
            products(
                id,
                name,
                slug,
                code
            )
        `)
        .order("created_at", { ascending: false });

    if (error) throw error;

    const grouped = new Map<string, CustomerEnquiryGroup>();

    for (const enquiry of data ?? []) {
        const key = enquiry.customer_id;

        if (!grouped.has(key)) {
            grouped.set(key, {
                customer_id: enquiry.customer_id,
                customer_name: enquiry.customer_name,
                email: enquiry.email,
                phone: enquiry.phone,
                city: enquiry.city,

                enquiryCount: 1,
                lastEnquiry: enquiry.created_at,

                enquiries: [enquiry],
            });
        } else {
            const customer = grouped.get(key)!;

            customer.enquiryCount++;

            customer.enquiries.push(enquiry);

            if (
                new Date(enquiry.created_at) >
                new Date(customer.lastEnquiry)
            ) {
                customer.lastEnquiry = enquiry.created_at;
            }
        }
    }

    return Array.from(grouped.values()).sort(
        (a, b) =>
            new Date(b.lastEnquiry).getTime() -
            new Date(a.lastEnquiry).getTime()
    );
}

export async function getCustomerEnquiriesForAdmin(customerId: string) {
    const { data, error } = await supabase
        .from("enquiries")
        .select(`
            *,
            products(
                id,
                name,
                slug,
                code,
                price,
                product_images(
                    storage_path,
                    is_primary
                )
            )
        `)
        .eq("customer_id", customerId)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
}