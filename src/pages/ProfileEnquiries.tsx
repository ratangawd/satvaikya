import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, CalendarDays, MessageSquare, Hash, ArrowRight, Boxes } from "lucide-react";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";
import { getCustomerEnquiries } from "@/services/enquiry.service";
import { getCategoryUrl, getStoreCategories } from "@/services/store.service";

/**
 * ── Data shape note ──
 * `getCustomerEnquiries` is untouched — same call, same return value.
 * The exact field names on each enquiry row weren't available at design
 * time, so `normalizeEnquiry()` below reads from a few likely aliases
 * (e.g. `product?.name` vs `product_name`) and falls back gracefully.
 * If your actual rows use different keys, adjust ONLY the accessors
 * inside `normalizeEnquiry` — nothing else needs to change.
 */
function normalizeEnquiry(raw: any) {
    const product = raw?.product ?? raw?.products ?? {};

    const productPath =
        product?.path ??
        raw?.product_path ??
        raw?.path ??
        null;

    const category =
        product?.category ??
        product?.categories ??
        raw?.category ??
        raw?.categories ??
        null;

    const categorySlug =
        category?.slug ??
        product?.category_slug ??
        raw?.category_slug ??
        null;

    return {
        id: raw?.id ?? crypto.randomUUID(),
        productName: product?.name ?? raw?.product_name ?? "Product",
        productCode: product?.code ?? raw?.product_code ?? null,
        productImage:
            product?.image ??
            product?.image_url ??
            raw?.product_image ??
            raw?.image ??
            null,
        productSlug: product?.slug ?? raw?.product_slug ?? null,
        productPath,
        categorySlug,
        quantity: raw?.quantity ?? raw?.qty ?? 1,
        status: (raw?.status ?? "new").toString().toLowerCase(),
        submittedAt: raw?.created_at ?? raw?.submitted_at ?? raw?.createdAt ?? null,
        message: raw?.message ?? raw?.customer_message ?? raw?.note ?? "",
    };
}

const STATUS_STYLES: Record<string, string> = {
    new: "bg-green-50 text-green-700 border-green-200",
    contacted: "bg-yellow-50 text-yellow-700 border-yellow-200",
    processing: "bg-blue-50 text-blue-700 border-blue-200",
    completed: "bg-purple-50 text-purple-700 border-purple-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
};

function StatusBadge({ status }: { status: string }) {
    const style = STATUS_STYLES[status] ?? "bg-muted text-muted-foreground border-border";
    const label = status.charAt(0).toUpperCase() + status.slice(1);
    return (
        <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize whitespace-nowrap ${style}`}
        >
            {label}
        </span>
    );
}

function formatDate(value: string | null) {
    if (!value) return "—";
    try {
        return new Date(value).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    } catch {
        return "—";
    }
}

type NormalizedEnquiry = ReturnType<typeof normalizeEnquiry>;

interface ProductGroup {
    key: string;
    productName: string;
    productCode: string | null;
    productImage: string | null;
    productSlug: string | null;
    productPath: string | null;
    categorySlug: string | null;
    entries: NormalizedEnquiry[];
}

/**
 * Groups enquiries by product so multiple enquiries for the same product
 * appear as one card with an enquiry history, instead of one card each.
 * Grouping key prefers `productSlug` (stable identifier); falls back to
 * product name if a slug isn't present on the row.
 */
function findCategoryWithAncestors(
    categories: any[],
    slug: string | null,
    ancestors: Array<{ name: string; slug: string }> = []
): any | null {
    if (!slug) return null;

    for (const category of categories) {
        if (category.slug === slug) {
            return { ...category, ancestors };
        }

        const child = findCategoryWithAncestors(
            category.children ?? [],
            slug,
            [...ancestors, { name: category.name, slug: category.slug }]
        );

        if (child) return child;
    }

    return null;
}

async function resolveProductHref(productSlug: string | null, categorySlug: string | null): Promise<string> {
    if (!productSlug) return "/collections";

    try {
        const categories = await getStoreCategories();
        const foundCategory = findCategoryWithAncestors(categories, categorySlug);

        if (foundCategory) {
            return `${getCategoryUrl(foundCategory)}/${productSlug}`;
        }

        if (categorySlug) {
            return `/collections/${categorySlug}/${productSlug}`;
        }

        return `/collections/${productSlug}`;
    } catch {
        if (categorySlug) {
            return `/collections/${categorySlug}/${productSlug}`;
        }

        return `/collections/${productSlug}`;
    }
}

function groupByProduct(items: NormalizedEnquiry[]): ProductGroup[] {
    const map = new Map<string, ProductGroup>();

    for (const item of items) {
        const key = item.productSlug ?? `name:${item.productName}`;

        if (!map.has(key)) {
            map.set(key, {
                key,
                productName: item.productName,
                productCode: item.productCode,
                productImage: item.productImage,
                productSlug: item.productSlug,
                productPath: item.productPath,
                categorySlug: item.categorySlug,
                entries: [],
            });
        }

        map.get(key)!.entries.push(item);
    }

    const groups = Array.from(map.values());

    // Newest enquiry first within each product's history
    for (const group of groups) {
        group.entries.sort((a, b) => {
            const aTime = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
            const bTime = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
            return bTime - aTime;
        });
    }

    // Products with the most recent activity first
    groups.sort((a, b) => {
        const aTime = a.entries[0]?.submittedAt ? new Date(a.entries[0].submittedAt).getTime() : 0;
        const bTime = b.entries[0]?.submittedAt ? new Date(b.entries[0].submittedAt).getTime() : 0;
        return bTime - aTime;
    });

    return groups;
}

export default function ProfileEnquiries() {
    const { user } = useCustomerAuth();

    const [loading, setLoading] = useState(true);
    const [enquiries, setEnquiries] = useState<any[]>([]);
    const [productUrls, setProductUrls] = useState<Record<string, string>>({});

    useEffect(() => {
        async function load() {
            if (!user) return;

            try {
                const data = await getCustomerEnquiries(user.id);
                setEnquiries(data ?? []);

                const groups = groupByProduct((data ?? []).map(normalizeEnquiry));
                const resolved: Record<string, string> = {};

                for (const group of groups) {
                    resolved[group.key] = await resolveProductHref(group.productSlug, group.categorySlug);
                }

                setProductUrls(resolved);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [user]);

    if (loading) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-16 text-center text-muted-foreground">
                Loading your enquiries…
            </div>
        );
    }

    const items = enquiries.map(normalizeEnquiry);
    const groups = groupByProduct(items);

    return (
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
            <div className="mb-8">
                <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                    Your account
                </span>
                <h1 className="mt-2 font-display text-3xl md:text-4xl">My Enquiries</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Track the products you've reached out to us about.
                </p>
            </div>

            {groups.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card px-6 py-16 md:py-20 text-center">
                    <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
                        <Package className="h-8 w-8" />
                    </div>
                    <h2 className="mt-5 font-display text-2xl">No enquiries yet</h2>
                    <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                        When you enquire about a piece, it'll show up here so you can track its status.
                    </p>
                    <Link
                        to="/collections"
                        className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white font-medium text-sm hover:bg-brand-hover active:scale-[0.99] transition-all"
                    >
                        Browse Products <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            ) : (
                <div className="space-y-4 md:space-y-5">
                    {groups.map((group, i) => {
                        const productHref = productUrls[group.key] ??
                            (group.productPath
                                ? group.productPath.startsWith("/collections")
                                    ? group.productPath
                                    : `/collections/${group.productPath.replace(/^\/+/, "")}`
                                : group.productSlug && group.categorySlug
                                    ? `/collections/${group.categorySlug}/${group.productSlug}`
                                    : group.productSlug
                                        ? `/collections/${group.productSlug}`
                                        : "/collections");

                        const hasMultiple = group.entries.length > 1;

                        return (
                            <motion.article
                                key={group.key}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                                className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                            >
                                <div className="flex flex-col sm:flex-row">
                                    {/* Product image */}
                                    <div className="sm:w-48 md:w-56 shrink-0">
                                        <div className="aspect-square sm:aspect-auto sm:h-full overflow-hidden bg-muted">
                                            {group.productImage ? (
                                                <img
                                                    src={group.productImage}
                                                    alt={group.productName}
                                                    className="h-full w-full object-cover"
                                                    loading="lazy"
                                                    width={300}
                                                    height={300}
                                                />
                                            ) : (
                                                <div className="h-full w-full min-h-[160px] flex items-center justify-center text-muted-foreground">
                                                    <Boxes className="h-8 w-8" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0 p-5 sm:p-6 flex flex-col gap-4">
                                        {/* Product header */}
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                {group.productCode && (
                                                    <div className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-gold">
                                                        <Hash className="h-3 w-3" />
                                                        {group.productCode}
                                                    </div>
                                                )}
                                                <h3 className="mt-1 font-display text-lg md:text-xl truncate">
                                                    {group.productName}
                                                </h3>
                                            </div>
                                            {hasMultiple && (
                                                <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground whitespace-nowrap">
                                                    {group.entries.length} enquiries
                                                </span>
                                            )}
                                        </div>

                                        {/* Enquiry history for this product */}
                                        <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
                                            {group.entries.map((entry) => (
                                                <div key={entry.id} className="p-3.5 sm:p-4 bg-background/40 space-y-2.5">
                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                                            <span>
                                                                Qty <span className="text-foreground font-medium">{entry.quantity}</span>
                                                            </span>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                                                                {formatDate(entry.submittedAt)}
                                                            </span>
                                                        </div>
                                                        <StatusBadge status={entry.status} />
                                                    </div>

                                                    {entry.message && (
                                                        <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                                                            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-foreground/70 mb-1">
                                                                <MessageSquare className="h-3.5 w-3.5" />
                                                                Your message
                                                            </div>
                                                            <p className="leading-relaxed line-clamp-3">{entry.message}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-1">
                                            <Link
                                                to={productHref}
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium hover:border-brand hover:text-brand active:scale-[0.99] transition-all whitespace-nowrap"
                                            >
                                                View Product <ArrowRight className="h-3.5 w-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            )}
        </div>
    );
}