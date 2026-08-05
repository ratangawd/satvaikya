import { useEffect, useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

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

type SpecRow = { key: string; value: string };

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

    const [status, setStatus] = useState<"draft" | "active" | "archived">("draft");

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

    useEffect(() => {
        if (!open) return;

        async function loadCategories() {
            const data = await getCategories();
            setCategories(data.filter((category) => category.is_active));
        }

        loadCategories();

        setName(initialData?.name ?? "");
        setSlug(initialData?.slug ?? "");
        setCategoryId(initialData?.category_id ?? "");

        setCode(initialData?.code ?? "");
        setPrice(
            initialData?.price !== null && initialData?.price !== undefined
                ? String(initialData.price)
                : ""
        );

        setShortDescription(initialData?.short_description ?? "");
        setDescription(initialData?.description ?? "");

        setSpecifications(
            initialData?.specifications && initialData.specifications.length > 0
                ? initialData.specifications
                : []
        );

        setStatus(initialData?.status ?? "draft");
        setFeatured(initialData?.featured ?? false);
        setIsActive(initialData?.is_active ?? true);
        setDisplayOrder(initialData?.display_order ?? 0);

        setAmazonEnabled(initialData?.amazon_enabled ?? false);
        setAmazonUrl(initialData?.amazon_url ?? "");

        setInstagramUrl(initialData?.instagram_url ?? "");
        setYoutubeUrl(initialData?.youtube_url ?? "");

        setSeoTitle(initialData?.seo_title ?? "");
        setSeoDescription(initialData?.seo_description ?? "");
    }, [initialData, open]);

    if (!open) return null;

    function addSpecRow() {
        setSpecifications((prev) => [...prev, { key: "", value: "" }]);
    }

    function updateSpecRow(index: number, field: "key" | "value", value: string) {
        setSpecifications((prev) =>
            prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
        );
    }

    function removeSpecRow(index: number) {
        setSpecifications((prev) => prev.filter((_, i) => i !== index));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);

            const cleanSpecs = specifications.filter(
                (row) => row.key.trim() !== "" || row.value.trim() !== ""
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

            onClose();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl">
                <form onSubmit={handleSubmit}>
                    {/* HEADER */}
                    <div className="flex items-center justify-between border-b px-6 py-4 sticky top-0 bg-white z-10">
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* TWO-COLUMN CORE FIELDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Name */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <input
                                    className="w-full rounded border p-3"
                                    placeholder="Product Name"
                                    value={name}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setName(value);
                                        setSlug(
                                            value
                                                .toLowerCase()
                                                .trim()
                                                .replace(/\s+/g, "-")
                                                .replace(/[^a-z0-9-]/g, "")
                                        );
                                    }}
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Category</label>
                                <select
                                    className="w-full rounded border p-3"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Code */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Code</label>
                                <input
                                    className="w-full rounded border p-3"
                                    placeholder="Product Code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>

                            {/* Price */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    className="w-full rounded border p-3"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            {/* Slug */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Slug</label>
                                <input
                                    className="w-full rounded border p-3"
                                    placeholder="Slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Status */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Status</label>
                                <select
                                    className="w-full rounded border p-3"
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value as "draft" | "active" | "archived")
                                    }
                                >
                                    <option value="draft">Draft</option>
                                    <option value="active">Active</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            {/* Display Order */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Display Order</label>
                                <input
                                    type="number"
                                    className="w-full rounded border p-3"
                                    placeholder="Display Order"
                                    value={displayOrder}
                                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                                />
                            </div>

                            {/* Featured */}
                            <div className="flex items-center gap-2 pt-6">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={featured}
                                    onChange={(e) => setFeatured(e.target.checked)}
                                />
                                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                                    Featured Product
                                </label>
                            </div>

                            {/* Active */}
                            <div className="flex items-center gap-2 pt-6">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                />
                                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                                    Active Product
                                </label>
                            </div>

                            {/* Amazon Enabled */}
                            <div className="flex items-center gap-2 pt-6">
                                <input
                                    type="checkbox"
                                    id="amazonEnabled"
                                    checked={amazonEnabled}
                                    onChange={(e) => setAmazonEnabled(e.target.checked)}
                                />
                                <label htmlFor="amazonEnabled" className="text-sm font-medium text-gray-700">
                                    Available on Amazon
                                </label>
                            </div>

                            {/* Amazon URL */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Amazon URL</label>
                                <input
                                    className="w-full rounded border p-3 disabled:bg-gray-100 disabled:text-gray-400"
                                    placeholder="Amazon Product URL"
                                    value={amazonUrl}
                                    onChange={(e) => setAmazonUrl(e.target.value)}
                                    disabled={!amazonEnabled}
                                    required={amazonEnabled}
                                />
                            </div>

                            {/* Instagram URL */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">
                                    Instagram URL
                                </label>

                                <input
                                    className="w-full rounded border p-3"
                                    placeholder="Instagram Post / Reel URL"
                                    value={instagramUrl}
                                    onChange={(e) => setInstagramUrl(e.target.value)}
                                />
                            </div>

                            {/* YouTube URL */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">
                                    YouTube URL
                                </label>

                                <input
                                    className="w-full rounded border p-3"
                                    placeholder="YouTube Video URL"
                                    value={youtubeUrl}
                                    onChange={(e) => setYoutubeUrl(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* SHORT DESCRIPTION */}
                        <div className="border-t pt-6 space-y-1">
                            <label className="text-sm font-medium text-gray-700">Short Description</label>
                            <textarea
                                className="w-full rounded border p-3"
                                rows={3}
                                placeholder="Short Description"
                                value={shortDescription}
                                onChange={(e) => setShortDescription(e.target.value)}
                                required
                            />
                        </div>

                        {/* LONG DESCRIPTION */}
                        <div className="border-t pt-6 space-y-1">
                            <label className="text-sm font-medium text-gray-700">Long Description</label>
                            <textarea
                                className="w-full rounded border p-3"
                                rows={5}
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* SPECIFICATIONS */}
                        <div className="border-t pt-6 space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700">Specifications</label>
                                <button
                                    type="button"
                                    onClick={addSpecRow}
                                    className="flex items-center gap-1 text-sm text-brand hover:underline"
                                >
                                    <Plus className="h-4 w-4" /> Add Row
                                </button>
                            </div>

                            {specifications.length === 0 && (
                                <p className="text-sm text-gray-400">No specifications added yet.</p>
                            )}

                            <div className="space-y-2">
                                {specifications.map((row, i) => (
                                    <div key={i} className="flex gap-2 items-center">
                                        <input
                                            className="flex-1 rounded border p-2"
                                            placeholder="e.g. Material"
                                            value={row.key}
                                            onChange={(e) => updateSpecRow(i, "key", e.target.value)}
                                        />
                                        <input
                                            className="flex-1 rounded border p-2"
                                            placeholder="e.g. Brass"
                                            value={row.value}
                                            onChange={(e) => updateSpecRow(i, "value", e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeSpecRow(i)}
                                            className="text-gray-400 hover:text-red-500 p-2"
                                            aria-label="Remove specification"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SEO */}
                        <div className="border-t pt-6 space-y-4">
                            <h3 className="font-semibold text-lg">SEO</h3>
                            <input
                                className="w-full rounded border p-3"
                                placeholder="SEO Title"
                                value={seoTitle}
                                onChange={(e) => setSeoTitle(e.target.value)}
                            />
                            <textarea
                                className="w-full rounded border p-3"
                                rows={3}
                                placeholder="SEO Description"
                                value={seoDescription}
                                onChange={(e) => setSeoDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="flex justify-end gap-3 border-t px-6 py-4 sticky bottom-0 bg-white">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded border px-4 py-2"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            className="rounded bg-black px-4 py-2 text-white"
                        >
                            {loading ? "Saving..." : "Save Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}