import { getCustomerEnquiriesForAdmin } from "@/services/adminEnquiry.service";
import { getImageUrl } from "@/services/product-image.service";
import { getStoreCategories } from "@/services/store.service";
import type { StoreCategory } from "@/services/store.service";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    Phone,
    MapPin,
    ClipboardList,
    Boxes,
    CalendarClock,
    Layers,
    Search,
    ImageOff,
    ExternalLink,
    Inbox,
    SearchX,
    ChevronDown,
} from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";

// =========================================================================
// Types
// =========================================================================

type EnquiryStatus =
    | "new"
    | "contacted"
    | "processing"
    | "completed"
    | "cancelled";

interface NormalizedEnquiry {
    id: string;
    productName: string;
    productCode: string;
    productSlug: string;
    productImage: string | null;
    quantity: number;
    message: string;
    status: EnquiryStatus;
    createdAt: Date | null;
    raw: any;
}

interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
    city: string;
}

type DateFilter = "all" | "today" | "last7" | "last30" | "thisMonth";
type QuantityFilter = "all" | "1" | "2" | "3" | "4" | "5plus" | "10plus";
type StatusFilter = "all" | EnquiryStatus;

// =========================================================================
// Normalization helpers
// Field names coming back from Supabase / the admin enquiry service aren't
// guaranteed to be consistent, so every read goes through a fallback chain
// rather than assuming one exact shape.
// =========================================================================

function resolveProductImage(item: any): string | null {
    const raw =
        item.product_images ??
        item.products?.product_images ??
        item.product?.product_images ??
        null;

    let storagePath: string | null = null;

    if (typeof raw === "string") {
        storagePath = raw;
    } else if (Array.isArray(raw) && raw.length > 0) {
        if (typeof raw[0] === "string") {
            storagePath = raw[0];
        } else {
            const primary = raw.find((img: any) => img?.is_primary) ?? raw[0];
            storagePath = primary?.storage_path ?? primary?.url ?? null;
        }
    }

    if (!storagePath) {
        storagePath = item.image ?? item.product_image ?? null;
    }

    if (!storagePath) return null;

    // storagePath may already be a resolved URL (starts with http) or a
    // Supabase storage path that needs to go through getImageUrl.
    if (storagePath.startsWith("http")) return storagePath;

    try {
        return getImageUrl(storagePath);
    } catch {
        return storagePath;
    }
}

function normalizeStatus(status: unknown): EnquiryStatus {
    const s = typeof status === "string" ? status.toLowerCase().trim() : "";
    const valid: EnquiryStatus[] = [
        "new",
        "contacted",
        "processing",
        "completed",
        "cancelled",
    ];
    return (valid as string[]).includes(s) ? (s as EnquiryStatus) : "new";
}

function normalizeEnquiry(item: any): NormalizedEnquiry {
    const product = item.products ?? item.product ?? {};

    const createdRaw = item.created_at ?? item.createdAt ?? null;
    const createdAt = createdRaw ? new Date(createdRaw) : null;

    return {
        id: item.id ?? crypto.randomUUID(),
        productName: product.name ?? item.product_name ?? "Untitled product",
        productCode: item.code ?? product.code ?? "—",
        productSlug: item.slug ?? product.slug ?? "",
        productImage: resolveProductImage(item),
        quantity: Number(item.quantity ?? 1),
        message: item.message ?? "",
        status: normalizeStatus(item.status),
        createdAt: createdAt && !isNaN(createdAt.getTime()) ? createdAt : null,
        raw: item,
    };
}

/**
 * The enquiries payload doesn't include a dedicated customer object in the
 * current service response, so customer details are read defensively off
 * the first row using every plausible nesting/naming pattern. Anything not
 * found falls back to a neutral placeholder rather than breaking the header.
 */
function extractCustomerInfo(rawEnquiries: any[], customerId?: string): CustomerInfo {
    const source =
        rawEnquiries.find((e) => e.customer ?? e.profiles ?? e.customer_profile ?? e.user) ??
        rawEnquiries[0] ??
        {};


    const c =
        source.customer ?? source.profiles ?? source.customer_profile ?? source.user ?? {};

    // Falls through on both null/undefined AND empty string — "??" alone
    // wouldn't catch a field that came back as "".
    const pick = (...values: (string | null | undefined)[]) =>
        values.find((v) => v != null && v !== "") ?? "—";

    // The enquiries row itself already carries these fields directly
    // (customer_name, email, phone, city) — there is no nested customer
    // object in the current response. Nested/prefixed variants are still
    // checked first in case a future response shape adds them, but the
    // plain `email` / `phone` / `city` fields are the real source today.
    return {
        name: pick(c.name, c.full_name, source.customer_name) === "—"
            ? `Customer ${customerId?.slice(0, 8) ?? ""}`.trim()
            : pick(c.name, c.full_name, source.customer_name),
        email: pick(c.email, source.customer_email, source.email),
        phone: pick(c.phone, c.phone_number, source.customer_phone, source.phone),
        city: pick(c.city, c.customer_city, source.customer_city, source.city),
    };
}

// =========================================================================
// Date bucketing / filtering helpers
// =========================================================================

function daysBetween(a: Date, b: Date) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const startA = new Date(a.getFullYear(), a.getMonth(), a.getDate());
    const startB = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.round((startA.getTime() - startB.getTime()) / msPerDay);
}

function matchesDateFilter(date: Date | null, filter: DateFilter): boolean {
    if (filter === "all") return true;
    if (!date) return false;

    const now = new Date();
    const diff = daysBetween(now, date); // days ago (>=0 for past dates)

    switch (filter) {
        case "today":
            return diff === 0;
        case "last7":
            return diff >= 0 && diff <= 6;
        case "last30":
            return diff >= 0 && diff <= 29;
        case "thisMonth":
            return (
                date.getMonth() === now.getMonth() &&
                date.getFullYear() === now.getFullYear()
            );
        default:
            return true;
    }
}

function matchesQuantityFilter(qty: number, filter: QuantityFilter): boolean {
    switch (filter) {
        case "all":
            return true;
        case "5plus":
            return qty >= 5;
        case "10plus":
            return qty >= 10;
        default:
            return qty === Number(filter);
    }
}

function formatDate(date: Date | null): string {
    if (!date) return "—";
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function formatDateSmart(date: Date | null): string {
    if (!date) return "—";
    const now = new Date();
    const diff = daysBetween(now, date);
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return formatDate(date);
}

// =========================================================================
// Product grouping
// One product acts as a parent thread; every enquiry for that product is
// nested underneath it (Gmail-thread / Amazon-order style), instead of one
// card per enquiry.
// =========================================================================

interface ProductGroup {
    key: string;
    productName: string;
    productCode: string;
    productSlug: string;
    productImage: string | null;
    enquiries: NormalizedEnquiry[]; // chronological, oldest first
    totalQuantity: number;
    latestDate: Date | null;
}

/**
 * Enquiries don't consistently carry a bare product_id at the top level, so
 * the grouping key falls back through every plausible identifier before
 * finally resorting to name — mirroring the defensive pattern used by
 * normalizeEnquiry/resolveProductImage above.
 */
function getProductKey(item: NormalizedEnquiry): string {
    const raw = item.raw ?? {};

    return (
        (
            raw.product_id ??
            raw.products?.id ??
            raw.product?.id
        ) ||
        item.productSlug ||
        item.productCode ||
        item.productName
    );
}

function groupByProduct(items: NormalizedEnquiry[]): ProductGroup[] {
    const map = new Map<string, ProductGroup>();

    for (const item of items) {
        const key = getProductKey(item);
        let group = map.get(key);
        if (!group) {
            group = {
                key,
                productName: item.productName,
                productCode: item.productCode,
                productSlug: item.productSlug,
                productImage: item.productImage,
                enquiries: [],
                totalQuantity: 0,
                latestDate: null,
            };
            map.set(key, group);
        }

        group.enquiries.push(item);
        group.totalQuantity += Number.isFinite(item.quantity) ? item.quantity : 0;
        if (item.createdAt && (!group.latestDate || item.createdAt > group.latestDate)) {
            group.latestDate = item.createdAt;
        }
        // Backfill image/slug in case the first enquiry for this product lacked them.
        if (!group.productImage && item.productImage) group.productImage = item.productImage;
        if (!group.productSlug && item.productSlug) group.productSlug = item.productSlug;
    }

    const groups = Array.from(map.values());

    for (const group of groups) {
        group.enquiries.sort((a, b) => {
            const at = a.createdAt ? a.createdAt.getTime() : 0;
            const bt = b.createdAt ? b.createdAt.getTime() : 0;
            return at - bt; // chronological, oldest first
        });
    }

    // Products with the most recent activity surface first.
    groups.sort((a, b) => {
        const at = a.latestDate ? a.latestDate.getTime() : 0;
        const bt = b.latestDate ? b.latestDate.getTime() : 0;
        return bt - at;
    });

    return groups;
}

// =========================================================================
// Storefront URL resolution
// The admin `enquiries`/`products` rows don't carry the storefront path, and
// products.path doesn't exist in Supabase. Instead, we reuse the same
// StoreCategory tree the storefront itself is built from (getStoreCategories,
// from store.service.ts) and walk it to find which category (at whatever
// depth) contains the product, then build the URL the same way
// getProductUrl/getCategoryUrl do: /collections/<ancestor slugs>/<category
// slug>/<product slug>.
// =========================================================================

/**
 * Recursively searches the category tree for a product matching `slug`.
 * `trail` accumulates ancestor category slugs as we descend. Returns null
 * if no category at any depth contains a product with that slug.
 */
function findProductUrlInTree(
    categories: StoreCategory[],
    productSlug: string,
    trail: string[] = []
): string | null {
    for (const category of categories) {
        const product = category.products.find((p) => p.slug === productSlug);
        if (product) {
            return `/collections/${[...trail, category.slug, product.slug].join("/")}`;
        }

        if (category.children.length > 0) {
            const found = findProductUrlInTree(category.children, productSlug, [
                ...trail,
                category.slug,
            ]);
            if (found) return found;
        }
    }

    return null;
}

// =========================================================================
// Presentational helpers
// =========================================================================

const STATUS_CONFIG: Record<EnquiryStatus, { label: string; className: string }> = {
    new: { label: "New", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    contacted: { label: "Contacted", className: "bg-blue-50 text-blue-700 border-blue-200" },
    processing: { label: "Processing", className: "bg-amber-50 text-amber-700 border-amber-200" },
    completed: { label: "Completed", className: "bg-violet-50 text-violet-700 border-violet-200" },
    cancelled: { label: "Cancelled", className: "bg-rose-50 text-rose-700 border-rose-200" },
};

function StatusBadge({ status }: { status: EnquiryStatus }) {
    const cfg = STATUS_CONFIG[status];
    return (
        <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-semibold uppercase tracking-wide ${cfg.className}`}
        >
            {cfg.label}
        </span>
    );
}

function SummaryCard({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string | number;
}) {
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
                <div className="mt-0.5 font-display text-2xl leading-tight text-foreground truncate">{value}</div>
            </div>
        </div>
    );
}

// =========================================================================
// Component
// =========================================================================

export default function CustomerEnquiries() {
    const { customerId } = useParams<{ customerId: string }>();

    const [rawEnquiries, setRawEnquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState<DateFilter>("all");
    const [quantityFilter, setQuantityFilter] = useState<QuantityFilter>("all");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

    // Locally-applied status overrides so the dropdown feels interactive.
    // NOTE: this does not persist to Supabase — there's no existing service
    // call to update enquiry status, and adding one is outside this page's
    // scope. Wire this up to a real mutation (e.g. updateEnquiryStatus) once
    // that endpoint exists.
    const [statusOverrides, setStatusOverrides] = useState<Record<string, EnquiryStatus>>({});

    // Which product's accordion is currently expanded. Only one open at a time.
    const [expandedProductKey, setExpandedProductKey] = useState<string | null>(null);

    // Storefront category tree, reused (not duplicated) from store.service.ts,
    // so "View Product" can resolve each product's real /collections/... URL
    // by traversal instead of relying on a non-existent products.path column.
    const [categoryTree, setCategoryTree] = useState<StoreCategory[] | null>(null);

    useEffect(() => {
        async function loadCategoryTree() {
            try {
                const data = await getStoreCategories();
                setCategoryTree(data ?? []);
            } catch (err) {
                console.error(err);
                setCategoryTree([]);
            }
        }

        void loadCategoryTree();
    }, []);

    useEffect(() => {
        if (!customerId) return;

        const customerIdValue = customerId;

        async function load() {
            setLoading(true);
            const data = await getCustomerEnquiriesForAdmin(customerIdValue);
            setRawEnquiries(data ?? []);
            setLoading(false);
        }

        void load();
    }, [customerId]);

    const enquiries = useMemo(
        () =>
            rawEnquiries.map((item) => {
                const normalized = normalizeEnquiry(item);
                const override = statusOverrides[normalized.id];
                return override ? { ...normalized, status: override } : normalized;
            }),
        [rawEnquiries, statusOverrides]
    );

    const customer = useMemo(() => extractCustomerInfo(rawEnquiries, customerId), [rawEnquiries, customerId]);

    const summary = useMemo(() => {
        const totalQuantity = enquiries.reduce((sum, e) => sum + (Number.isFinite(e.quantity) ? e.quantity : 0), 0);
        const uniqueProducts = new Set(enquiries.map((e) => e.productSlug || e.productName)).size;
        const latest = enquiries.reduce<Date | null>((latestDate, e) => {
            if (!e.createdAt) return latestDate;
            if (!latestDate || e.createdAt > latestDate) return e.createdAt;
            return latestDate;
        }, null);

        return {
            total: enquiries.length,
            totalQuantity,
            uniqueProducts,
            latest,
        };
    }, [enquiries]);

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();
        return enquiries.filter((e) => {
            const matchesSearch = term === "" || e.productName.toLowerCase().includes(term);
            const matchesDate = matchesDateFilter(e.createdAt, dateFilter);
            const matchesQty = matchesQuantityFilter(e.quantity, quantityFilter);
            const matchesStatus = statusFilter === "all" || e.status === statusFilter;
            return matchesSearch && matchesDate && matchesQty && matchesStatus;
        });
    }, [enquiries, search, dateFilter, quantityFilter, statusFilter]);

    const productGroups = useMemo(() => {
        const groups = groupByProduct(filtered);
        return groups.map((group) => ({
            ...group,
            productUrl: categoryTree ? findProductUrlInTree(categoryTree, group.productSlug) : null,
        }));
    }, [filtered, categoryTree]);

    const hasAnyEnquiries = enquiries.length > 0;
    const hasFilteredResults = filtered.length > 0;
    const filtersActive =
        search.trim() !== "" || dateFilter !== "all" || quantityFilter !== "all" || statusFilter !== "all";

    function handleStatusChange(id: string, status: EnquiryStatus) {
        setStatusOverrides((prev) => ({ ...prev, [id]: status }));
    }

    function toggleProductGroup(key: string) {
        setExpandedProductKey((prev) => (prev === key ? null : key));
    }

    return (
        <AdminLayout>
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                {/* ================= CUSTOMER HEADER ================= */}
                <div className="rounded-2xl border border-border bg-gradient-to-br from-brand to-[oklch(0.32_0.07_148)] text-white p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                            <User className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                            <h1 className="font-display text-2xl sm:text-3xl truncate">{customer.name}</h1>
                            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/85">
                                <span className="inline-flex items-center gap-1.5">
                                    <Mail className="h-3.5 w-3.5" /> {customer.email}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <Phone className="h-3.5 w-3.5" /> {customer.phone}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <MapPin className="h-3.5 w-3.5" /> {customer.city}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= SUMMARY CARDS ================= */}
                <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <SummaryCard icon={ClipboardList} label="Total Enquiries" value={summary.total} />
                    <SummaryCard icon={Boxes} label="Total Quantity" value={summary.totalQuantity} />
                    <SummaryCard icon={CalendarClock} label="Latest Enquiry" value={formatDate(summary.latest)} />
                    <SummaryCard icon={Layers} label="Unique Products" value={summary.uniqueProducts} />
                </div>

                {/* ================= FILTER BAR ================= */}
                <div className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <div className="relative flex-1 min-w-0">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search product…"
                                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-background text-sm focus:outline-none focus:border-brand"
                            />
                        </div>

                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value as DateFilter)}
                            className="px-4 py-2.5 rounded-full border border-border bg-background text-sm focus:outline-none focus:border-brand shrink-0"
                        >
                            <option value="all">All Dates</option>
                            <option value="today">Today</option>
                            <option value="last7">Last 7 Days</option>
                            <option value="last30">Last 30 Days</option>
                            <option value="thisMonth">This Month</option>
                        </select>

                        <select
                            value={quantityFilter}
                            onChange={(e) => setQuantityFilter(e.target.value as QuantityFilter)}
                            className="px-4 py-2.5 rounded-full border border-border bg-background text-sm focus:outline-none focus:border-brand shrink-0"
                        >
                            <option value="all">Any Quantity</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5plus">5+</option>
                            <option value="10plus">10+</option>
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                            className="px-4 py-2.5 rounded-full border border-border bg-background text-sm focus:outline-none focus:border-brand shrink-0"
                        >
                            <option value="all">All Statuses</option>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="mt-8">
                    {loading ? (
                        <div className="py-24 text-center text-muted-foreground">Loading enquiries…</div>
                    ) : !hasAnyEnquiries ? (
                        <EmptyState
                            icon={Inbox}
                            title="No enquiries found"
                            subtitle="This customer hasn't made any product enquiries yet."
                        />
                    ) : !hasFilteredResults ? (
                        <EmptyState
                            icon={SearchX}
                            title="No matching enquiries"
                            subtitle="Try adjusting or clearing your filters."
                        />
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence>
                                {productGroups.map((group, i) => (
                                    <ProductEnquiryGroup
                                        key={group.key}
                                        group={group}
                                        index={i}
                                        expanded={expandedProductKey === group.key}
                                        onToggle={() => toggleProductGroup(group.key)}
                                        onStatusChange={handleStatusChange}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

// =========================================================================
// Product accordion group (parent card) + nested enquiry rows
// =========================================================================

function ProductEnquiryGroup({
    group,
    index,
    expanded,
    onToggle,
    onStatusChange,
}: {
    group: ProductGroup & { productUrl: string | null };
    index: number;
    expanded: boolean;
    onToggle: () => void;
    onStatusChange: (id: string, status: EnquiryStatus) => void;
}) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.04 }}
            className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
            {/* Parent product row — click to expand/collapse the thread */}
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={expanded}
                className="w-full flex items-center gap-4 p-4 sm:p-5 text-left hover:bg-muted/40 transition-colors"
            >
                <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-xl bg-muted flex items-center justify-center overflow-hidden">
                    {group.productImage ? (
                        <img
                            src={group.productImage}
                            alt={group.productName}
                            loading="lazy"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <ImageOff className="h-5 w-5 text-muted-foreground" />
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base sm:text-lg leading-snug truncate">{group.productName}</h3>
                    <div className="text-xs text-muted-foreground mt-0.5">Code {group.productCode}</div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                        <span>
                            <span className="font-semibold text-foreground">{group.enquiries.length}</span>{" "}
                            enquir{group.enquiries.length === 1 ? "y" : "ies"}
                        </span>
                        <span>
                            <span className="font-semibold text-foreground">{group.totalQuantity}</span> qty requested
                        </span>
                        <span>Latest: {formatDateSmart(group.latestDate)}</span>
                    </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 shrink-0">
                    {group.productUrl ? (
                        <a
                            href={group.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted transition"
                        >
                            View Product <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    ) : (
                        <span className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-border text-sm text-muted-foreground/60 cursor-not-allowed">
                            View Product
                        </span>
                    )}
                </div>

                <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
            </button>

            {/* Mobile-only View Product button, since it's hidden in the row above on small screens */}
            <div className="sm:hidden px-4 pb-3 -mt-1">
                {group.productUrl ? (
                    <a
                        href={group.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted transition"
                    >
                        View Product <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                ) : (
                    <span className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-border text-sm text-muted-foreground/60 cursor-not-allowed">
                        View Product
                    </span>
                )}
            </div>

            {/* Expanded thread — every enquiry for this product, oldest first */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key="thread"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-border bg-muted/20"
                    >
                        <div className="p-4 sm:p-5 space-y-3">
                            {group.enquiries.map((item) => (
                                <EnquiryRow key={item.id} item={item} onStatusChange={onStatusChange} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function EnquiryRow({
    item,
    onStatusChange,
}: {
    item: NormalizedEnquiry;
    onStatusChange: (id: string, status: EnquiryStatus) => void;
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold">
                        Qty {item.quantity}
                    </span>
                    <StatusBadge status={item.status} />
                    <span className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</span>
                </div>

                {item.message ? (
                    <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{item.message}</p>
                ) : (
                    <p className="mt-2.5 text-sm text-muted-foreground/60 italic">No message</p>
                )}
            </div>

            <select
                value={item.status}
                onChange={(e) => onStatusChange(item.id, e.target.value as EnquiryStatus)}
                className="shrink-0 px-4 py-2 rounded-full border border-border bg-background text-sm focus:outline-none focus:border-brand"
            >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
            </select>
        </div>
    );
}

// =========================================================================
// Empty state
// =========================================================================

function EmptyState({
    icon: Icon,
    title,
    subtitle,
}: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
}) {
    return (
        <div className="py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 font-display text-xl">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
        </div>
    );
}