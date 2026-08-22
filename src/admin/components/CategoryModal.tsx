import { useEffect, useRef, useState } from "react";
import type { Category, CategoryFormData } from "@/types/category";
import { getCategories } from "@/services/category.service";
import {
    CheckCircle2,
    FileText,
    FolderOpen,
    Image as ImageIcon,
    Info,
    Loader2,
    Settings2,
    Tag,
    Trash2,
    UploadCloud,
    X,
} from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CategoryFormData) => Promise<void>;
    initialData?: Category | null;
    title?: string;
}

interface UploadCardProps {
    title: string;
    description: string;
    recommended: string;
    file: File | null;
    onChange: (file: File | null) => void;
    icon?: React.ReactNode;
}

function UploadCard({
    title,
    description,
    recommended,
    file,
    onChange,
    icon,
}: UploadCardProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);

        return () => URL.revokeObjectURL(url);
    }, [file]);

    const handleFile = (selectedFile?: File) => {
        if (!selectedFile) return;

        if (!selectedFile.type.startsWith("image/")) {
            return;
        }

        onChange(selectedFile);
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-violet-200 hover:shadow-sm">
            {/* Header */}
            <div className="mb-3 flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    {icon ?? <ImageIcon className="h-4 w-4" />}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-semibold text-slate-800">
                            {title}
                        </h3>

                        <Info className="h-3.5 w-3.5 text-slate-400" />
                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        {description}
                    </p>
                </div>
            </div>

            {/* Upload area */}
            {!file ? (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add(
                            "border-violet-400",
                            "bg-violet-50"
                        );
                    }}
                    onDragLeave={(e) => {
                        e.currentTarget.classList.remove(
                            "border-violet-400",
                            "bg-violet-50"
                        );
                    }}
                    onDrop={(e) => {
                        e.preventDefault();

                        e.currentTarget.classList.remove(
                            "border-violet-400",
                            "bg-violet-50"
                        );

                        handleFile(e.dataTransfer.files?.[0]);
                    }}
                    className="group flex min-h-[150px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-center transition-all hover:border-violet-300 hover:bg-violet-50/40"
                >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition-transform group-hover:scale-105">
                        <UploadCloud className="h-5 w-5" />
                    </div>

                    <span className="text-sm font-semibold text-violet-600">
                        Click to upload
                    </span>

                    <span className="mt-1 text-xs text-slate-500">
                        or drag and drop
                    </span>

                    <span className="mt-3 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                        PNG, JPG, WEBP
                    </span>
                </button>
            ) : (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                        {preview ? (
                            <img
                                src={preview}
                                alt={file.name}
                                className="h-full w-full object-cover"
                            />
                        ) : null}

                        <button
                            type="button"
                            onClick={() => {
                                onChange(null);

                                if (inputRef.current) {
                                    inputRef.current.value = "";
                                }
                            }}
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-red-500"
                            aria-label={`Remove ${title}`}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 p-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <CheckCircle2 className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-slate-700">
                                {file.name}
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-400">
                                {(file.size / 1024).toFixed(0)} KB
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="shrink-0 text-xs font-medium text-violet-600 hover:text-violet-700"
                        >
                            Change
                        </button>
                    </div>
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    handleFile(e.target.files?.[0]);
                }}
            />

            <p className="mt-3 text-center text-[10px] font-medium leading-4 text-slate-400">
                Recommended: {recommended}
            </p>
        </div>
    );
}

export default function CategoryModal({
    open,
    onClose,
    onSubmit,
    initialData,
    title = "Add Category",
}: Props) {
    const [name, setName] = useState(initialData?.name ?? "");
    const [slug, setSlug] = useState(initialData?.slug ?? "");
    const [description, setDescription] = useState(
        initialData?.description ?? ""
    );

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [parentId, setParentId] = useState("");

    const [image, setImage] = useState<File | null>(null);
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [bannerMobileImage, setBannerMobileImage] =
        useState<File | null>(null);

    const [imageAlt, setImageAlt] = useState("");
    const [displayOrder, setDisplayOrder] = useState(
        String(initialData?.display_order ?? 0)
    );
    const [isActive, setIsActive] = useState(
        initialData?.is_active ?? true
    );

    useEffect(() => {
        if (!open) return;

        setName(initialData?.name ?? "");
        setSlug(initialData?.slug ?? "");
        setDescription(initialData?.description ?? "");
        setParentId(initialData?.parent_id ?? "");

        setImage(null);
        setBannerImage(null);
        setBannerMobileImage(null);

        setImageAlt(initialData?.image_alt ?? "");
        setDisplayOrder(String(initialData?.display_order ?? 0));
        setIsActive(initialData?.is_active ?? true);

        async function loadCategories() {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Failed to load categories:", error);
            }
        }

        loadCategories();
    }, [initialData, open]);

    useEffect(() => {
        if (!open) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [open]);

    if (!open) return null;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!name.trim()) return;

        try {
            setLoading(true);
            setSuccessMessage("");

            await onSubmit({
                name: name.trim(),
                slug: slug.trim(),
                description,
                parent_id: parentId || null,
                display_order: Number(displayOrder) || 0,
                is_active: isActive,
                image,
                bannerImage,
                bannerMobileImage,
                image_alt: imageAlt,
            });

            setLoading(false);

            setSuccessMessage(
                title === "Add Category"
                    ? "Category saved successfully!"
                    : "Category updated successfully!"
            );

            setTimeout(() => {
                setSuccessMessage("");
                onClose();
            }, 1800);
        } catch (error) {
            console.error("Failed to save category:", error);
            setLoading(false);
        }
    }

    return (
        <div
            
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget && !loading) {
                    onClose();
                }
            }}
        >
            {/* SUCCESS TOAST */}
            {successMessage && (
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
                                {successMessage}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setSuccessMessage("");
                                onClose();
                            }}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            aria-label="Close notification"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-emerald-100">
                        <div className="h-full w-full origin-left bg-emerald-500 animate-[categoryToastProgress_1.8s_linear_forwards]" />
                    </div>
                </div>
            )}
        
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="category-modal-title"
                className="flex max-h-[calc(100vh-24px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100vh-40px)] sm:rounded-3xl"
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <div className="shrink-0 border-b border-slate-100 bg-white px-5 py-4 sm:px-7 sm:py-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 sm:h-12 sm:w-12">
                                <FolderOpen className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>

                            <div className="min-w-0">
                                <h2
                                    id="category-modal-title"
                                    className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
                                >
                                    {title === "Add Category"
                                        ? "Add New Category"
                                        : title}
                                </h2>

                                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                                    Create and manage your collection details
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

                {/* SCROLLABLE FORM */}
                <form
                    id="category-form"
                    onSubmit={handleSubmit}
                    className="min-h-0 flex-1 overflow-y-auto"
                >
                    <div className="space-y-7 px-5 py-6 sm:px-7 sm:py-7">
                        {/* BASIC INFORMATION */}
                        <section>
                            <SectionHeader
                                icon={<Tag className="h-4 w-4" />}
                                title="Basic Information"
                            />

                            <div className="mt-5 grid gap-5 md:grid-cols-2">
                                {/* Category Name */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        Category Name
                                        <span className="ml-1 text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                        placeholder="Enter category name"
                                        value={name}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setName(value);

                                            setSlug(
                                                value
                                                    .toLowerCase()
                                                    .trim()
                                                    .replace(/\s+/g, "-")
                                                    .replace(
                                                        /[^a-z0-9-]/g,
                                                        ""
                                                    )
                                            );
                                        }}
                                        required
                                    />
                                </div>

                                {/* Slug */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        Slug
                                    </label>

                                    <input
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                        placeholder="category-slug"
                                        value={slug}
                                        onChange={(e) =>
                                            setSlug(e.target.value)
                                        }
                                    />

                                    <p className="mt-1.5 text-[11px] text-slate-400">
                                        URL-friendly version of the category
                                        name.
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <div className="mb-2 flex items-center justify-between">
                                        <label className="text-sm font-semibold text-slate-800">
                                            Description
                                        </label>

                                        <span className="text-[11px] text-slate-400">
                                            {description.length} characters
                                        </span>
                                    </div>

                                    <textarea
                                        className="min-h-[120px] w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                        placeholder="Enter a short description about this category..."
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        maxLength={1000}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* IMAGES */}
                        <section>
                            <SectionHeader
                                icon={<ImageIcon className="h-4 w-4" />}
                                title="Collection Images"
                                description="Upload the images used across your collection pages."
                            />

                            <div className="mt-5 grid gap-4 lg:grid-cols-3">
                                <UploadCard
                                    title="Category Image"
                                    description="Displayed on collection cards."
                                    recommended="1:1 ratio (e.g. 800 × 800px)"
                                    file={image}
                                    onChange={setImage}
                                    icon={<ImageIcon className="h-4 w-4" />}
                                />

                                <UploadCard
                                    title="Desktop Banner"
                                    description="Displayed on collection pages for desktop users."
                                    recommended="16:9 wide image (1920 × 800px)"
                                    file={bannerImage}
                                    onChange={setBannerImage}
                                    icon={<ImageIcon className="h-4 w-4" />}
                                />

                                <UploadCard
                                    title="Mobile Banner"
                                    description="Displayed on collection pages for mobile users."
                                    recommended="Portrait image (1080 × 1350px)"
                                    file={bannerMobileImage}
                                    onChange={setBannerMobileImage}
                                    icon={<ImageIcon className="h-4 w-4" />}
                                />
                            </div>
                        </section>

                        {/* ADDITIONAL SETTINGS */}
                        <section>
                            <SectionHeader
                                icon={<Settings2 className="h-4 w-4" />}
                                title="Additional Settings"
                            />

                            <div className="mt-5 grid gap-5 md:grid-cols-3">
                                {/* Parent Category */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        Parent Category
                                    </label>

                                    <div className="relative">
                                        <select
                                            className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                            value={parentId}
                                            onChange={(e) =>
                                                setParentId(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                No Parent
                                            </option>

                                            {categories.map((category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                    disabled={
                                                        category.id ===
                                                        initialData?.id
                                                    }
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>

                                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                            >
                                                <path
                                                    d="M5 7.5L10 12.5L15 7.5"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                    </div>

                                    <p className="mt-1.5 text-[11px] text-slate-400">
                                        Select a parent category if this is a
                                        sub-collection.
                                    </p>
                                </div>

                                {/* Display Order */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        Display Order
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                        value={displayOrder}
                                        onChange={(e) =>
                                            setDisplayOrder(e.target.value)
                                        }
                                        placeholder="0"
                                    />

                                    <p className="mt-1.5 text-[11px] text-slate-400">
                                        Lower numbers appear first.
                                    </p>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        Status
                                    </label>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsActive((value) => !value)
                                        }
                                        className={`flex h-12 w-full items-center justify-between rounded-xl border px-4 text-sm transition ${isActive
                                                ? "border-emerald-200 bg-emerald-50/60"
                                                : "border-slate-200 bg-slate-50"
                                            }`}
                                    >
                                        <span
                                            className={`flex items-center gap-2 font-medium ${isActive
                                                    ? "text-emerald-700"
                                                    : "text-slate-500"
                                                }`}
                                        >
                                            <span
                                                className={`h-2 w-2 rounded-full ${isActive
                                                        ? "bg-emerald-500"
                                                        : "bg-slate-400"
                                                    }`}
                                            />
                                            {isActive ? "Active" : "Inactive"}
                                        </span>

                                        <span
                                            className={`relative h-6 w-11 rounded-full transition ${isActive
                                                    ? "bg-emerald-500"
                                                    : "bg-slate-300"
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${isActive
                                                        ? "left-6"
                                                        : "left-1"
                                                    }`}
                                            />
                                        </span>
                                    </button>

                                    <p className="mt-1.5 text-[11px] text-slate-400">
                                        Inactive categories are hidden from
                                        the store.
                                    </p>
                                </div>
                            </div>

                            {/* ALT TEXT */}
                            <div className="mt-5">
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                                    <FileText className="h-4 w-4 text-slate-400" />
                                    Image Alt Text
                                </label>

                                <input
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                    placeholder="Describe the category image for accessibility and SEO"
                                    value={imageAlt}
                                    onChange={(e) =>
                                        setImageAlt(e.target.value)
                                    }
                                />
                            </div>
                        </section>
                    </div>
                </form>

                {/* FOOTER */}
                <div className="shrink-0 border-t border-slate-100 bg-white px-5 py-4 sm:px-7">
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="hidden text-xs text-slate-400 sm:block">
                            Fields marked with{" "}
                            <span className="text-red-500">*</span> are
                            required.
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
                                form="category-form"
                                disabled={loading || !name.trim()}
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
                                        {title === "Add Category"
                                            ? "Save Category"
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

function SectionHeader({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description?: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                {icon}
            </div>

            <div className="min-w-0">
                <div className="flex items-center gap-3">
                    <h2 className="text-sm font-bold text-violet-600 sm:text-base">
                        {title}
                    </h2>

                    <div className="hidden h-px flex-1 bg-slate-200 sm:block" />
                </div>

                {description && (
                    <p className="mt-1 text-xs text-slate-400">
                        {description}
                    </p>
                )}
            </div>

            {!description && (
                <div className="h-px flex-1 bg-slate-200" />
            )}
        </div>
    );
}