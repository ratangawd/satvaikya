import { useEffect, useState } from "react";
import type { Category, CategoryFormData } from "@/types/category";
import { getCategories } from "@/services/category.service";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CategoryFormData) => Promise<void>;
    initialData?: Category | null;
    title?: string;
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
    const [description, setDescription] = useState(initialData?.description ?? "");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [parentId, setParentId] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [imageAlt, setImageAlt] = useState("");

    useEffect(() => {
        if (!open) return;

        setName(initialData?.name ?? "");
        setSlug(initialData?.slug ?? "");
        setDescription(initialData?.description ?? "");
        setParentId(initialData?.parent_id ?? "");

        async function loadCategories() {
            const data = await getCategories();
            setCategories(data);
        }

        loadCategories();
    }, [initialData, open]);

    if (!open) return null;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);

            await onSubmit({
                name,
                slug,
                description,
                parent_id: parentId || null,
                image,
                bannerImage,
                image_alt: imageAlt,
            });

            onClose();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                <h2 className="mb-6 text-2xl font-bold">
                    {title}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full rounded border p-3"
                        placeholder="Category Name"
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

                    <input
                        className="w-full rounded border p-3"
                        placeholder="Slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                    />

                    <textarea
                        className="w-full rounded border p-3"
                        placeholder="Description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Category Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImage(e.target.files?.[0] ?? null)
                            }
                        />
                    </div>

                    <input
                        className="w-full rounded border p-3"
                        placeholder="Image Alt Text"
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                    />
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Collection Banner Image
                        </label>

                        <p className="mb-2 text-xs text-gray-500">
                            Used on the individual collection page. Recommended: wide
                            high-resolution image.
                        </p>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setBannerImage(e.target.files?.[0] ?? null)
                            }
                        />
                    </div>

                    <select
                        className="w-full rounded border p-3"
                        value={parentId}
                        onChange={(e) => setParentId(e.target.value)}
                    >
                        <option value="">No Parent</option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                                disabled={category.id === initialData?.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <div className="flex justify-end gap-3">
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
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}