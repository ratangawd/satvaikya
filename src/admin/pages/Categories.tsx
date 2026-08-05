/**
 * Categories.tsx
 *
 * Changes from original:
 * - Replaced raw checkbox toggle with a styled toggle switch.
 * - Added "Parent" column showing the parent category name.
 * - Added "Order" column for display_order.
 * - Styled action buttons (Edit / Delete) consistently.
 * - Added empty state row when no categories exist.
 * - All existing CRUD logic is unchanged.
 */

import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import CategoryModal from "../components/CategoryModal";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} from "@/services/category.service";
import type { Category } from "@/types/category";
import { FolderTree, Pencil, Trash2, Plus } from "lucide-react";

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

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  /** Build a name-lookup map so we can display the parent category name. */
  const nameById = new Map(categories.map((c) => [c.id, c.name]));

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {categories.length} categor{categories.length !== 1 ? "ies" : "y"} total
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setOpenModal(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Loading categories…</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-600">Name</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Slug</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Parent</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Order</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Active</th>
                  <th className="p-4 text-right font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-gray-400">
                      <FolderTree className="h-8 w-8 mx-auto mb-3 text-gray-300" />
                      No categories yet. Click "Add Category" to create one.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {category.parent_id && (
                            <span className="text-gray-300 text-xs">└</span>
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{category.name}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-gray-500 font-mono text-xs">
                        {category.slug}
                      </td>

                      <td className="p-4 text-gray-500">
                        {category.parent_id ? (
                          <span className="inline-flex items-center gap-1 text-xs bg-violet-50 text-violet-700 rounded-full px-2.5 py-1">
                            {nameById.get(category.parent_id) ?? "—"}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-300">Root</span>
                        )}
                      </td>

                      <td className="p-4 text-gray-500 text-center">
                        {category.display_order}
                      </td>

                      <td className="p-4">
                        <Toggle
                          checked={category.is_active}
                          label={`Toggle active for ${category.name}`}
                          onChange={async (value) => {
                            await toggleCategoryStatus(category.id, value);
                            const data = await getCategories();
                            setCategories(data);
                          }}
                        />
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedCategory(category);
                              setOpenModal(true);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>

                          <button
                            onClick={async () => {
                              if (!confirm(`Delete "${category.name}"? This cannot be undone.`)) return;
                              await deleteCategory(category.id);
                              const data = await getCategories();
                              setCategories(data);
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

      <CategoryModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedCategory(null);
        }}
        initialData={selectedCategory}
        title={selectedCategory ? "Edit Category" : "Add Category"}
        onSubmit={async (values) => {
          if (selectedCategory) {
            await updateCategory(selectedCategory.id, values);
          } else {
            await createCategory(values);
          }

          const data = await getCategories();
          setCategories(data ?? []);
          setSelectedCategory(null);
        }}
      />
    </AdminLayout>
  );
}
