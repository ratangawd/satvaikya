import { useEffect, useState } from "react";

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

    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");

    const [status, setStatus] = useState<
        "draft" | "active" | "archived"
    >("draft");

    const [featured, setFeatured] = useState(false);

    const [isActive, setIsActive] = useState(true);

    const [displayOrder, setDisplayOrder] = useState(0);

    const [amazonEnabled, setAmazonEnabled] = useState(false);

    const [amazonUrl, setAmazonUrl] = useState("");

    const [seoTitle, setSeoTitle] = useState("");

    const [seoDescription, setSeoDescription] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) return;

        async function loadCategories() {
            const data = await getCategories();

            setCategories(
                data.filter((category) => category.is_active)
            );
        }

        loadCategories();

        setName(initialData?.name ?? "");
        setSlug(initialData?.slug ?? "");

        setCategoryId(initialData?.category_id ?? "");

        setShortDescription(
            initialData?.short_description ?? ""
        );

        setDescription(
            initialData?.description ?? ""
        );

        setStatus(
            initialData?.status ?? "draft"
        );

        setFeatured(
            initialData?.featured ?? false
        );

        setIsActive(
            initialData?.is_active ?? true
        );

        setDisplayOrder(
            initialData?.display_order ?? 0
        );

        setAmazonEnabled(
            initialData?.amazon_enabled ?? false
        );

        setAmazonUrl(
            initialData?.amazon_url ?? ""
        );

        setSeoTitle(
            initialData?.seo_title ?? ""
        );

        setSeoDescription(
            initialData?.seo_description ?? ""
        );

    }, [initialData, open]);

    if (!open) return null;

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        try {
            setLoading(true);

            await onSubmit({
                category_id: categoryId,

                name,
                slug,

                short_description: shortDescription,

                description,

                status,

                featured,

                amazon_enabled: amazonEnabled,

                amazon_url: amazonEnabled
                    ? amazonUrl
                    : null,

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-4xl rounded-xl bg-white p-6 shadow-xl">

                <h2 className="mb-6 text-2xl font-bold">
                    {title}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div className="grid grid-cols-2 gap-4">

  {/* Product Name */}
  <input
    className="rounded border p-3"
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

  {/* Slug */}
  <input
    className="rounded border p-3"
    placeholder="Slug"
    value={slug}
    onChange={(e) => setSlug(e.target.value)}
    required
  />

  {/* Category */}
  <select
    className="rounded border p-3"
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

  {/* Status */}
  <select
    className="rounded border p-3"
    value={status}
    onChange={(e) =>
      setStatus(
        e.target.value as
          | "draft"
          | "active"
          | "archived"
      )
    }
  >
    <option value="draft">Draft</option>
    <option value="active">Active</option>
    <option value="archived">Archived</option>
  </select>

  {/* Display Order */}
  <input
    type="number"
    className="rounded border p-3"
    placeholder="Display Order"
    value={displayOrder}
    onChange={(e) =>
      setDisplayOrder(Number(e.target.value))
    }
  />

</div>

{/* Short Description */}

<textarea
  className="w-full rounded border p-3"
  rows={3}
  placeholder="Short Description"
  value={shortDescription}
  onChange={(e) =>
    setShortDescription(e.target.value)
  }
  required
/>

{/* Description */}

<textarea
  className="w-full rounded border p-3"
  rows={5}
  placeholder="Description"
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
/>

{/* Featured */}

<label className="flex items-center gap-2">

  <input
    type="checkbox"
    checked={featured}
    onChange={(e) =>
      setFeatured(e.target.checked)
    }
  />

  Featured Product

</label>

{/* Active */}

<label className="flex items-center gap-2">

  <input
    type="checkbox"
    checked={isActive}
    onChange={(e) =>
      setIsActive(e.target.checked)
    }
  />

  Active Product

</label>

<hr />

<h3 className="font-semibold text-lg">
  Marketplace
</h3>

<label className="flex items-center gap-2">

  <input
    type="checkbox"
    checked={amazonEnabled}
    onChange={(e) =>
      setAmazonEnabled(e.target.checked)
    }
  />

  Available on Amazon

</label>

{amazonEnabled && (

  <input
    className="w-full rounded border p-3"
    placeholder="Amazon Product URL"
    value={amazonUrl}
    onChange={(e) =>
      setAmazonUrl(e.target.value)
    }
    required
  />

)}

<hr />

<h3 className="font-semibold text-lg">
  SEO
</h3>

<input
  className="w-full rounded border p-3"
  placeholder="SEO Title"
  value={seoTitle}
  onChange={(e) =>
    setSeoTitle(e.target.value)
  }
/>

<textarea
  className="w-full rounded border p-3"
  rows={3}
  placeholder="SEO Description"
  value={seoDescription}
  onChange={(e) =>
    setSeoDescription(e.target.value)
  }
/>

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
    {loading ? "Saving..." : "Save Product"}
  </button>

</div>

                </form>

            </div>

        </div>
    );
}