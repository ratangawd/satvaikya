/**
 * Products.tsx
 *
 * Changes from original:
 * - Wrapped with AdminLayout (was missing — caused the page to render without
 *   any navigation).
 * - Replaced raw checkbox for is_active with a styled toggle switch.
 * - Replaced plain text action buttons with proper styled buttons.
 * - Added a status badge so Draft / active / Archived is visually distinct.
 * - Added empty-state row when no products exist.
 * - Kept all existing CRUD logic unchanged.
 */

import { useEffect, useState } from "react";
import AdminLayout from "@/admin/layouts/AdminLayout";
import ProductModal from "@/admin/components/ProductModal";
import ProductImagesModal from "@/admin/components/ProductImagesModal";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
} from "@/services/product.service";
import type { Product, ProductFormData } from "@/types/product";
import { Image, Pencil, Trash2, Plus } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  draft: "bg-amber-100 text-amber-700",
  archived: "bg-gray-100 text-gray-600",
};

/** Accessible toggle switch */
function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
        checked ? "bg-emerald-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [imagesOpen, setImagesOpen] = useState(false);

  const [selectedProductForImages, setSelectedProductForImages] =
    useState<Product | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {products.length} product{products.length !== 1 ? "s" : ""} total
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
          onClick={() => {
            setSelectedProduct(null);
            setOpenModal(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Loading products…</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-600">Product</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Category</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Status</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Active</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Amazon</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Featured</th>
                  <th className="p-4 text-right font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-gray-400">
                      No products yet. Click "Add Product" to create one.
                    </td>
                  </tr>
                ) : (
                  products.map((product: Product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{product.slug}</div>
                      </td>

                      <td className="p-4 text-gray-600">
                        {product.categories?.name ?? (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                            STATUS_STYLES[product.status] ?? "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <Toggle
                          checked={product.is_active}
                          label={`Toggle active for ${product.name}`}
                          onChange={async (value) => {
                            await toggleProductStatus(product.id, value);
                            const data = await getProducts();
                            setProducts(data);
                          }}
                        />
                      </td>

                      <td className="p-4 text-center">
                        {product.amazon_enabled ? (
                          <span className="text-emerald-600 font-bold">✓</span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        {product.featured ? (
                          <span className="text-amber-500">★</span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            title="Edit product"
                            onClick={() => {
                              setSelectedProduct(product);
                              setOpenModal(true);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>

                          <button
                            title="Manage images"
                            onClick={() => {
                              setSelectedProductForImages(product);
                              setImagesOpen(true);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Image className="h-3.5 w-3.5" />
                            Images
                          </button>

                          <button
                            title="Delete product"
                            onClick={async () => {
                              if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
                              await deleteProduct(product.id);
                              const data = await getProducts();
                              setProducts(data);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProductModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedProduct(null);
        }}
        initialData={selectedProduct}
        title={selectedProduct ? "Edit Product" : "Add Product"}
        onSubmit={async (data: ProductFormData) => {
          if (selectedProduct) {
            await updateProduct(selectedProduct.id, data);
          } else {
            await createProduct(data);
          }

          const updated = await getProducts();
          setProducts(updated);
          setOpenModal(false);
          setSelectedProduct(null);
        }}
      />

      {selectedProductForImages && (
        <ProductImagesModal
          open={imagesOpen}
          onClose={() => {
            setImagesOpen(false);
            setSelectedProductForImages(null);
          }}
          productId={selectedProductForImages.id}
          productName={selectedProductForImages.name}
        />
      )}
    </AdminLayout>
  );
}
