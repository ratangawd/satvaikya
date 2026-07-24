import { useEffect, useState } from "react";
import {
    getProductImages,
    uploadProductImage,
    deleteProductImage,
    setPrimaryImage,
    getImageUrl,
} from "@/services/product-image.service";
import type { ProductImage } from "@/types/product-image";

interface ProductImagesModalProps {
    open: boolean;
    onClose: () => void;
    productId: string;
    productName: string;
}

export default function ProductImagesModal({
    open,
    onClose,
    productId,
    productName,
}: ProductImagesModalProps) {
    const [images, setImages] = useState<ProductImage[]>([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!open) return;

        loadImages();
    }, [open, productId]);

    async function loadImages() {
        const data = await getProductImages(productId);
        setImages(data);
    }

    async function handleUpload(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const files = e.target.files;

        if (!files || files.length === 0) return;

        try {
            setUploading(true);

            for (const file of Array.from(files)) {
                await uploadProductImage(productId, file);
            }

            await loadImages();
        } finally {
            setUploading(false);

            // Reset input so the same files can be selected again if needed
            e.target.value = "";
        }
    }

    async function handlePrimary(image: ProductImage) {
        await setPrimaryImage(image);
        await loadImages();
    }

    async function handleDelete(image: ProductImage) {
        if (!confirm("Delete image?")) return;

        await deleteProductImage(image);

        await loadImages();
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-5xl rounded-lg bg-white p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Images - {productName}
                    </h2>

                    <button onClick={onClose}>✕</button>
                </div>

                <div className="mt-6">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleUpload}
                    />

                    {uploading && (
                        <p className="mt-2 text-sm text-gray-500">
                            Uploading...
                        </p>
                    )}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="rounded border p-2"
                        >
                            <img
                                src={getImageUrl(image.storage_path)}
                                alt={image.alt_text ?? ""}
                                className="h-40 w-full rounded object-cover"
                            />

                            <div className="mt-3 flex justify-between">
                                {image.is_primary ? (
                                    <span className="text-green-600">
                                        ⭐ Primary
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => handlePrimary(image)}
                                    >
                                        Make Primary
                                    </button>
                                )}
                            </div>

                            <button
                                className="mt-2 text-red-600"
                                onClick={() => handleDelete(image)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}