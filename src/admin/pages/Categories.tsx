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

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Categories</h1>

                <button
                    onClick={() => {
                        setSelectedCategory(null);
                        setOpenModal(true);
                    }}
                    className="rounded-lg bg-black px-4 py-2 text-white"
                >
                    + Add Category
                </button>
            </div>

            <div className="rounded-xl bg-white shadow">
                {loading ? (
                    <div className="p-6">Loading...</div>
                ) : (
                    <table className="w-full">
                        <thead className="border-b bg-gray-50">
                            <tr>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Slug</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="p-6 text-center text-gray-500"
                                    >
                                        No categories found.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category) => (
                                    <tr
                                        key={category.id}
                                        className="border-b last:border-none"
                                    >
                                        <td className="p-4">{category.name}</td>
                                        <td className="p-4">{category.slug}</td>
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={category.is_active}
                                                onChange={async (e) => {
                                                    await toggleCategoryStatus(category.id, e.target.checked);

                                                    const data = await getCategories();
                                                    setCategories(data);
                                                }}
                                            />
                                        </td>

                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedCategory(category);
                                                        setOpenModal(true);
                                                    }}
                                                    className="rounded border px-3 py-1 text-sm"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={async () => {
                                                        if (!confirm("Delete this category?")) return;

                                                        await deleteCategory(category.id);

                                                        const data = await getCategories();

                                                        setCategories(data);
                                                    }}
                                                    className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
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