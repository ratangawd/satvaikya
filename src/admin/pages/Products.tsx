import { useEffect, useState } from "react";
import ProductModal from "@/admin/components/ProductModal";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
} from "@/services/product.service";

import type {
    Product,
    ProductFormData,
} from "@/types/product";
import ProductImagesModal from "../components/ProductImagesModal";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [imagesOpen, setImagesOpen] = useState(false);

    const [selectedProductForImages, setSelectedProductForImages] =
        useState<Product | null>(null);

    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);

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
        <div className="p-6">

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    Products
                </h1>

                <button
                    className="rounded bg-black px-4 py-2 text-white"
                    onClick={() => {
                        setSelectedProduct(null);
                        setOpenModal(true);
                    }}
                >
                    Add Product
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border-collapse">

                    <thead>
                        <tr className="border-b">

                            <th className="p-3 text-left">
                                Product
                            </th>

                            <th className="p-3 text-left">
                                Category
                            </th>

                            <th className="p-3 text-left">
                                Status
                            </th>

                            <th className="p-3 text-left">
                                Amazon
                            </th>

                            <th className="p-3 text-left">
                                Featured
                            </th>

                            <th className="p-3 text-left">
                                Actions
                            </th>
                            

                        </tr>
                    </thead>

                    <tbody>

                        {products.map((product: any) => (

                            <tr
                                key={product.id}
                                className="border-b"
                            >

                                <td className="p-3">
                                    {product.name}
                                </td>

                                <td className="p-3">
                                    {product.categories?.name ?? "-"}
                                </td>

                                <td className="p-3">
                                    <input
                                        type="checkbox"
                                        checked={product.is_active}
                                        onChange={async (e) => {

                                            await toggleProductStatus(
                                                product.id,
                                                e.target.checked
                                            );

                                            const data = await getProducts();

                                            setProducts(data);

                                        }}
                                    />
                                </td>

                                <td className="p-3">
                                    {product.amazon_enabled ? "✅" : "—"}
                                </td>

                                <td className="p-3">
                                    {product.featured ? "⭐" : "—"}
                                </td>

                                <td className="p-3 flex gap-2">

                                    <button
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setOpenModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedProductForImages(product);
                                            setImagesOpen(true);
                                        }}
                                    >
                                        Images
                                    </button>

                                    <button
                                        onClick={async () => {

                                            if (!confirm("Delete this product?")) return;

                                            await deleteProduct(product.id);

                                            const data = await getProducts();

                                            setProducts(data);

                                        }}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>
            )}

            <ProductModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setSelectedProduct(null);
                }}
                initialData={selectedProduct}
                title={
                    selectedProduct
                        ? "Edit Product"
                        : "Add Product"
                }
                onSubmit={async (data: ProductFormData) => {
                    if (selectedProduct) {
                        await updateProduct(selectedProduct.id, data);
                    } else {
                        await createProduct(data);
                    }

                    const products = await getProducts();

                    setProducts(products);

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

        </div>

        
    );

    
}

