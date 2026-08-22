import { useEffect, useState, type ReactNode } from "react";
import {
    CheckCircle2,
    ChevronDown,
    FileText,
    FolderTree,
    Info,
    Link2,
    Loader2,
    Package,
    Plus,
    Search,
    Settings2,
    Tag,
    Trash2,
    X,
} from "lucide-react";

import type {
    Product,
    ProductFormData,
} from "@/types/product";

import type { Category } from "@/types/category";
import { getCategories } from "@/services/category.service";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ProductFormData) => Promise<void>;
    initialData?: Product | null;
    title?: string;
}

type SpecRow = {
    key: string;
    value: string;
};

export default function ProductModal({
    open,
    onClose,
    onSubmit,
    initialData,
    title = "Add Product",
}: Props) {
    // Categories
    const [categories, setCategories] = useState<Category[]>([]);

    // Product Fields
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [code, setCode] = useState("");
    const [price, setPrice] = useState<string>("");

    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");

    const [specifications, setSpecifications] = useState<SpecRow[]>([]);

    const [status, setStatus] = useState<
        "draft" | "active" | "archived"
    >("draft");

    const [featured, setFeatured] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [displayOrder, setDisplayOrder] = useState(0);

    const [amazonEnabled, setAmazonEnabled] = useState(false);
    const [amazonUrl, setAmazonUrl] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");

    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (!open) return;

        async function loadCategories() {
            try {
                const data = await getCategories();

                setCategories(
                    data.filter((category) => category.is_active)
                );
            } catch (error) {
                console.error("Failed to load categories:", error);
            }
        }

        loadCategories();

        setName(initialData?.name ?? "");
        setSlug(initialData?.slug ?? "");
        setCategoryId(initialData?.category_id ?? "");

        setCode(initialData?.code ?? "");

        setPrice(
            initialData?.price !== null &&
                initialData?.price !== undefined
                ? String(initialData.price)
                : ""
        );

        setShortDescription(
            initialData?.short_description ?? ""
        );

        setDescription(
            initialData?.description ?? ""
        );

        setSpecifications(
            initialData?.specifications &&
                initialData.specifications.length > 0
                ? initialData.specifications
                : []
        );

        setStatus(initialData?.status ?? "draft");
        setFeatured(initialData?.featured ?? false);
        setIsActive(initialData?.is_active ?? true);
        setDisplayOrder(initialData?.display_order ?? 0);

        setAmazonEnabled(
            initialData?.amazon_enabled ?? false
        );

        setAmazonUrl(
            initialData?.amazon_url ?? ""
        );

        setInstagramUrl(
            initialData?.instagram_url ?? ""
        );

        setYoutubeUrl(
            initialData?.youtube_url ?? ""
        );

        setSeoTitle(
            initialData?.seo_title ?? ""
        );

        setSeoDescription(
            initialData?.seo_description ?? ""
        );
    }, [initialData, open]);

    useEffect(() => {
        if (!open) return;

        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [open]);

    if (!open) {
        return successMessage ? (
            <SuccessToast message={successMessage} />
        ) : null;
    }

    function addSpecRow() {
        setSpecifications((prev) => [
            ...prev,
            {
                key: "",
                value: "",
            },
        ]);
    }

    function updateSpecRow(
        index: number,
        field: "key" | "value",
        value: string
    ) {
        setSpecifications((prev) =>
            prev.map((row, i) =>
                i === index
                    ? {
                        ...row,
                        [field]: value,
                    }
                    : row
            )
        );
    }

    function removeSpecRow(index: number) {
        setSpecifications((prev) =>
            prev.filter((_, i) => i !== index)
        );
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);
            setSuccessMessage("");

            const cleanSpecs = specifications.filter(
                (row) =>
                    row.key.trim() !== "" ||
                    row.value.trim() !== ""
            );

            await onSubmit({
                category_id: categoryId,
                name,
                slug,

                code: code || null,
                price: price !== "" ? Number(price) : null,

                short_description: shortDescription,
                description,

                specifications: cleanSpecs,

                status,
                featured,

                amazon_enabled: amazonEnabled,
                amazon_url: amazonEnabled ? amazonUrl : null,

                instagram_url: instagramUrl || null,
                youtube_url: youtubeUrl || null,

                display_order: displayOrder,
                is_active: isActive,

                seo_title: seoTitle,
                seo_description: seoDescription,
            });

            setSuccessMessage(
                title === "Add Product"
                    ? "Product saved successfully!"
                    : "Product updated successfully!"
            );

            // Close the modal after the save has completed
            onClose();

            // Automatically remove the notification
            setTimeout(() => {
                setSuccessMessage("");
            }, 3500);
        } catch (error) {
            console.error("Failed to save product:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5"
            onMouseDown={(e) => {
                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-modal-title"
                className="flex max-h-[calc(100vh-24px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100vh-40px)] sm:rounded-3xl"
                onMouseDown={(e) =>
                    e.stopPropagation()
                }
            >
                {/* ===================================================== */}
                {/* HEADER */}
                {/* ===================================================== */}

                <div className="shrink-0 border-b border-slate-100 bg-white px-5 py-4 sm:px-7 sm:py-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 sm:h-12 sm:w-12">
                                <Package className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>

                            <div className="min-w-0">
                                <h2
                                    id="product-modal-title"
                                    className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
                                >
                                    {title === "Add Product"
                                        ? "Add New Product"
                                        : title}
                                </h2>

                                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                                    Add and manage your product
                                    information
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Close modal"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* ===================================================== */}
                {/* SCROLLABLE CONTENT */}
                {/* ===================================================== */}

                <form
                    id="product-form"
                    onSubmit={handleSubmit}
                    className="min-h-0 flex-1 overflow-y-auto"
                >
                    <div className="space-y-8 px-5 py-6 sm:px-7 sm:py-7">

                        {/* ================================================= */}
                        {/* BASIC INFORMATION */}
                        {/* ================================================= */}

                        <section>
                            <SectionHeader
                                icon={
                                    <Tag className="h-4 w-4" />
                                }
                                title="Basic Information"
                                description="Enter the core details of your product."
                            />

                            <div className="mt-5 grid gap-5 md:grid-cols-2">

                                {/* Product Name */}
                                <Field label="Product Name" required>
                                    <input
                                        className={inputClass}
                                        placeholder="Enter product name"
                                        value={name}
                                        onChange={(e) => {
                                            const value =
                                                e.target.value;

                                            setName(value);

                                            setSlug(
                                                value
                                                    .toLowerCase()
                                                    .trim()
                                                    .replace(
                                                        /\s+/g,
                                                        "-"
                                                    )
                                                    .replace(
                                                        /[^a-z0-9-]/g,
                                                        ""
                                                    )
                                            );
                                        }}
                                        required
                                    />
                                </Field>

                                {/* Category */}
                                <Field
                                    label="Category"
                                    required
                                >
                                    <div className="relative">
                                        <select
                                            className={`${inputClass} appearance-none pr-10`}
                                            value={
                                                categoryId
                                            }
                                            onChange={(e) =>
                                                setCategoryId(
                                                    e.target
                                                        .value
                                                )
                                            }
                                            required
                                        >
                                            <option value="">
                                                Select Category
                                            </option>

                                            {categories.map(
                                                (
                                                    category
                                                ) => (
                                                    <option
                                                        key={
                                                            category.id
                                                        }
                                                        value={
                                                            category.id
                                                        }
                                                    >
                                                        {
                                                            category.name
                                                        }
                                                    </option>
                                                )
                                            )}
                                        </select>

                                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    </div>
                                </Field>

                                {/* Product Code */}
                                <Field label="Product Code">
                                    <input
                                        className={inputClass}
                                        placeholder="e.g. PROD-001"
                                        value={code}
                                        onChange={(e) =>
                                            setCode(
                                                e.target
                                                    .value
                                            )
                                        }
                                    />
                                </Field>

                                {/* Price */}
                                <Field label="Price">
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                                            ₹
                                        </span>

                                        <input
                                            type="number"
                                            step="0.01"
                                            min={0}
                                            className={`${inputClass} pl-9`}
                                            placeholder="0.00"
                                            value={price}
                                            onChange={(e) =>
                                                setPrice(
                                                    e.target
                                                        .value
                                                )
                                            }
                                        />
                                    </div>
                                </Field>

                                {/* Slug */}
                                <Field
                                    label="Slug"
                                    required
                                    helper="URL-friendly product identifier."
                                >
                                    <input
                                        className={inputClass}
                                        placeholder="product-slug"
                                        value={slug}
                                        onChange={(e) =>
                                            setSlug(
                                                e.target
                                                    .value
                                            )
                                        }
                                        required
                                    />
                                </Field>

                                {/* Status */}
                                <Field label="Status">
                                    <div className="relative">
                                        <select
                                            className={`${inputClass} appearance-none pr-10`}
                                            value={status}
                                            onChange={(e) =>
                                                setStatus(
                                                    e.target
                                                        .value as
                                                    | "draft"
                                                    | "active"
                                                    | "archived"
                                                )
                                            }
                                        >
                                            <option value="draft">
                                                Draft
                                            </option>

                                            <option value="active">
                                                Active
                                            </option>

                                            <option value="archived">
                                                Archived
                                            </option>
                                        </select>

                                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    </div>
                                </Field>
                            </div>
                        </section>

                        {/* ================================================= */}
                        {/* PRODUCT SETTINGS */}
                        {/* ================================================= */}

                        <section>
                            <SectionHeader
                                icon={
                                    <Settings2 className="h-4 w-4" />
                                }
                                title="Product Settings"
                                description="Control visibility, ordering, and product highlights."
                            />

                            <div className="mt-5 grid gap-4 md:grid-cols-3">

                                <ToggleCard
                                    title="Featured Product"
                                    description="Show this product in featured sections."
                                    checked={featured}
                                    onChange={setFeatured}
                                />

                                <ToggleCard
                                    title="Active Product"
                                    description="Make this product visible in the store."
                                    checked={isActive}
                                    onChange={setIsActive}
                                />

                                <ToggleCard
                                    title="Available on Amazon"
                                    description="Enable the Amazon product link."
                                    checked={amazonEnabled}
                                    onChange={
                                        setAmazonEnabled
                                    }
                                />
                            </div>

                            <div className="mt-5 max-w-md">
                                <Field
                                    label="Display Order"
                                    helper="Lower numbers appear first."
                                >
                                    <input
                                        type="number"
                                        min={0}
                                        className={inputClass}
                                        placeholder="0"
                                        value={
                                            displayOrder
                                        }
                                        onChange={(e) =>
                                            setDisplayOrder(
                                                Number(
                                                    e.target
                                                        .value
                                                )
                                            )
                                        }
                                    />
                                </Field>
                            </div>
                        </section>

                        {/* ================================================= */}
                        {/* AMAZON / SOCIAL LINKS */}
                        {/* ================================================= */}

                        <section>
                            <SectionHeader
                                icon={
                                    <Link2 className="h-4 w-4" />
                                }
                                title="External Links"
                                description="Connect this product to Amazon and social media."
                            />

                            <div className="mt-5 grid gap-5 md:grid-cols-2">

                                {/* Amazon URL */}
                                <Field
                                    label="Amazon URL"
                                    helper={
                                        amazonEnabled
                                            ? "Required when Amazon is enabled."
                                            : "Enable Amazon above to activate this field."
                                    }
                                >
                                    <input
                                        type="url"
                                        className={`${inputClass} disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
                                        placeholder="https://www.amazon.in/..."
                                        value={amazonUrl}
                                        onChange={(e) =>
                                            setAmazonUrl(
                                                e.target
                                                    .value
                                            )
                                        }
                                        disabled={
                                            !amazonEnabled
                                        }
                                        required={
                                            amazonEnabled
                                        }
                                    />
                                </Field>

                                {/* Instagram */}
                                <Field label="Instagram URL">
                                    <input
                                        type="url"
                                        className={inputClass}
                                        placeholder="https://instagram.com/..."
                                        value={
                                            instagramUrl
                                        }
                                        onChange={(e) =>
                                            setInstagramUrl(
                                                e.target
                                                    .value
                                            )
                                        }
                                    />
                                </Field>

                                {/* YouTube */}
                                <Field label="YouTube URL">
                                    <input
                                        type="url"
                                        className={inputClass}
                                        placeholder="https://youtube.com/..."
                                        value={youtubeUrl}
                                        onChange={(e) =>
                                            setYoutubeUrl(
                                                e.target
                                                    .value
                                            )
                                        }
                                    />
                                </Field>
                            </div>
                        </section>

                        {/* ================================================= */}
                        {/* DESCRIPTIONS */}
                        {/* ================================================= */}

                        <section>
                            <SectionHeader
                                icon={
                                    <FileText className="h-4 w-4" />
                                }
                                title="Product Content"
                                description="Write the content customers will see on the product page."
                            />

                            <div className="mt-5 space-y-5">

                                {/* Short Description */}
                                <Field
                                    label="Short Description"
                                    required
                                >
                                    <textarea
                                        className={`${textareaClass} min-h-[110px]`}
                                        rows={3}
                                        placeholder="Write a short product summary..."
                                        value={
                                            shortDescription
                                        }
                                        onChange={(e) =>
                                            setShortDescription(
                                                e.target
                                                    .value
                                            )
                                        }
                                        required
                                    />

                                    <div className="mt-1.5 flex justify-end text-[11px] text-slate-400">
                                        {
                                            shortDescription.length
                                        }{" "}
                                        characters
                                    </div>
                                </Field>

                                {/* Long Description */}
                                <Field
                                    label="Long Description"
                                >
                                    <textarea
                                        className={`${textareaClass} min-h-[160px]`}
                                        rows={6}
                                        placeholder="Write the detailed product description..."
                                        value={
                                            description
                                        }
                                        onChange={(e) =>
                                            setDescription(
                                                e.target
                                                    .value
                                            )
                                        }
                                    />

                                    <div className="mt-1.5 flex justify-end text-[11px] text-slate-400">
                                        {
                                            description.length
                                        }{" "}
                                        characters
                                    </div>
                                </Field>
                            </div>
                        </section>

                        {/* ================================================= */}
                        {/* SPECIFICATIONS */}
                        {/* ================================================= */}

                        <section>
                            <SectionHeader
                                icon={
                                    <FolderTree className="h-4 w-4" />
                                }
                                title="Specifications"
                                description="Add product specifications such as material, size, color, and weight."
                            />

                            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-800">
                                            Product Specifications
                                        </h3>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Add as many specification
                                            rows as required.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={
                                            addSpecRow
                                        }
                                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-50 px-4 text-sm font-semibold text-violet-600 transition hover:bg-violet-100"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Specification
                                    </button>
                                </div>

                                {specifications.length ===
                                    0 && (
                                        <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center">
                                            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                                <FolderTree className="h-5 w-5" />
                                            </div>

                                            <p className="mt-3 text-sm font-medium text-slate-600">
                                                No specifications
                                                added yet
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                Click "Add Specification"
                                                to add product details.
                                            </p>
                                        </div>
                                    )}

                                {specifications.length >
                                    0 && (
                                        <div className="mt-4 space-y-3">
                                            {specifications.map(
                                                (
                                                    row,
                                                    index
                                                ) => (
                                                    <div
                                                        key={
                                                            index
                                                        }
                                                        className="rounded-xl border border-slate-200 bg-white p-3"
                                                    >
                                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                                            <div className="flex-1">
                                                                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                                    Specification
                                                                </label>

                                                                <input
                                                                    className={smallInputClass}
                                                                    placeholder="e.g. Material"
                                                                    value={
                                                                        row.key
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateSpecRow(
                                                                            index,
                                                                            "key",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="flex-1">
                                                                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                                    Value
                                                                </label>

                                                                <input
                                                                    className={smallInputClass}
                                                                    placeholder="e.g. Brass"
                                                                    value={
                                                                        row.value
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateSpecRow(
                                                                            index,
                                                                            "value",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeSpecRow(
                                                                        index
                                                                    )
                                                                }
                                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                                                                aria-label="Remove specification"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                        </section>

                        {/* ================================================= */}
                        {/* SEO */}
                        {/* ================================================= */}

                        <section>
                            <SectionHeader
                                icon={
                                    <Search className="h-4 w-4" />
                                }
                                title="SEO"
                                description="Optimize how this product appears in search engines."
                            />

                            <div className="mt-5 space-y-5 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">

                                <Field
                                    label="SEO Title"
                                    helper="Recommended: around 50–60 characters."
                                >
                                    <input
                                        className={inputClass}
                                        placeholder="Enter SEO title"
                                        value={seoTitle}
                                        onChange={(e) =>
                                            setSeoTitle(
                                                e.target
                                                    .value
                                            )
                                        }
                                    />

                                    <div className="mt-1.5 flex justify-between text-[11px]">
                                        <span className="text-slate-400">
                                            Search result title
                                        </span>

                                        <span
                                            className={
                                                seoTitle.length >
                                                    60
                                                    ? "text-amber-500"
                                                    : "text-slate-400"
                                            }
                                        >
                                            {seoTitle.length}
                                            /60
                                        </span>
                                    </div>
                                </Field>

                                <Field
                                    label="SEO Description"
                                    helper="Recommended: around 150–160 characters."
                                >
                                    <textarea
                                        className={`${textareaClass} min-h-[110px]`}
                                        rows={4}
                                        placeholder="Enter a concise SEO description..."
                                        value={
                                            seoDescription
                                        }
                                        onChange={(e) =>
                                            setSeoDescription(
                                                e.target
                                                    .value
                                            )
                                        }
                                    />

                                    <div className="mt-1.5 flex justify-between text-[11px]">
                                        <span className="text-slate-400">
                                            Search result description
                                        </span>

                                        <span
                                            className={
                                                seoDescription.length >
                                                    160
                                                    ? "text-amber-500"
                                                    : "text-slate-400"
                                            }
                                        >
                                            {
                                                seoDescription.length
                                            }
                                            /160
                                        </span>
                                    </div>
                                </Field>
                            </div>
                        </section>
                    </div>
                </form>

                {/* ===================================================== */}
                {/* FOOTER */}
                {/* ===================================================== */}

                <div className="shrink-0 border-t border-slate-100 bg-white px-5 py-4 sm:px-7">
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <p className="hidden text-xs text-slate-400 sm:block">
                            Fields marked with{" "}
                            <span className="text-red-500">
                                *
                            </span>{" "}
                            are required.
                        </p>

                        <div className="flex w-full gap-3 sm:w-auto">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                form="product-form"
                                disabled={loading}
                                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="h-4 w-4" />

                                        {title ===
                                            "Add Product"
                                            ? "Save Product"
                                            : "Save Changes"}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ========================================================= */
/* REUSABLE UI COMPONENTS */
/* ========================================================= */

function SectionHeader({
    icon,
    title,
    description,
}: {
    icon: ReactNode;
    title: string;
    description?: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                    <h2 className="text-sm font-bold text-violet-600 sm:text-base">
                        {title}
                    </h2>

                    <div className="hidden h-px flex-1 bg-slate-200 sm:block" />
                </div>

                {description && (
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}

function Field({
    label,
    required = false,
    helper,
    children,
}: {
    label: string;
    required?: boolean;
    helper?: string;
    children: ReactNode;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            {children}

            {helper && (
                <p className="mt-1.5 text-[11px] leading-4 text-slate-400">
                    {helper}
                </p>
            )}
        </div>
    );
}

function ToggleCard({
    title,
    description,
    checked,
    onChange,
}: {
    title: string;
    description: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`flex min-h-[100px] items-center justify-between gap-4 rounded-2xl border p-4 text-left transition ${checked
                    ? "border-violet-200 bg-violet-50/50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
        >
            <div className="min-w-0">
                <div className="flex items-center gap-2">
                    <span
                        className={`h-2 w-2 rounded-full ${checked
                                ? "bg-violet-500"
                                : "bg-slate-300"
                            }`}
                    />

                    <span className="text-sm font-semibold text-slate-800">
                        {title}
                    </span>
                </div>

                <p className="mt-1.5 text-[11px] leading-4 text-slate-400">
                    {description}
                </p>
            </div>

            <span
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked
                        ? "bg-violet-600"
                        : "bg-slate-300"
                    }`}
            >
                <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${checked
                            ? "left-6"
                            : "left-1"
                        }`}
                />
            </span>
        </button>
    );
}

function SuccessToast({ message }: { message: string }) {
    return (
        <div className="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm sm:right-6 sm:top-6">
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-white p-4 shadow-2xl">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900">
                        Success
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        {message}
                    </p>
                </div>
            </div>

            <div className="mt-1 h-1 overflow-hidden rounded-full bg-emerald-100">
                <div className="h-full w-full origin-left animate-[toastProgress_3.5s_linear_forwards] bg-emerald-500" />
            </div>
        </div>
    );
}

/* ========================================================= */
/* INPUT STYLES */
/* ========================================================= */

const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10";

const smallInputClass =
    "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10";

const textareaClass =
    "w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10";