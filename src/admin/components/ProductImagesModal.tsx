import { useEffect, useRef, useState } from "react";
import {
    getProductImages,
    uploadProductImage,
    deleteProductImage,
    setPrimaryImage,
    getImageUrl,
} from "@/services/product-image.service";
import type { ProductImage } from "@/types/product-image";
import {
    Check,
    CheckCircle2,
    Image as ImageIcon,
    Loader2,
    Star,
    Trash2,
    UploadCloud,
    X,
} from "lucide-react";

interface ProductImagesModalProps {
    open: boolean;
    onClose: () => void;
    productId: string;
    productName: string;
}

type ToastType = "success" | "error";

interface ToastState {
    type: ToastType;
    message: string;
}

export default function ProductImagesModal({
    open,
    onClose,
    productId,
    productName,
}: ProductImagesModalProps) {
    const [images, setImages] = useState<ProductImage[]>([]);
    const [uploading, setUploading] = useState(false);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [toast, setToast] = useState<ToastState | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!open) return;

        loadImages();
    }, [open, productId]);

    useEffect(() => {
        if (!toast) return;

        const timer = window.setTimeout(() => {
            setToast(null);
        }, 3000);

        return () => window.clearTimeout(timer);
    }, [toast]);

    useEffect(() => {
        if (!open) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [open]);

    async function loadImages() {
        try {
            const data = await getProductImages(productId);
            setImages(data);
        } catch (error) {
            console.error("Failed to load product images:", error);

            setToast({
                type: "error",
                message: "Failed to load product images.",
            });
        }
    }

    async function handleUpload(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const files = e.target.files;

        if (!files || files.length === 0) return;

        try {
            setUploading(true);

            for (const file of Array.from(files)) {
                if (!file.type.startsWith("image/")) {
                    continue;
                }

                await uploadProductImage(productId, file);
            }

            await loadImages();

            setToast({
                type: "success",
                message:
                    files.length === 1
                        ? "Product image uploaded successfully!"
                        : `${files.length} product images uploaded successfully!`,
            });
        } catch (error) {
            console.error("Failed to upload product image:", error);

            setToast({
                type: "error",
                message: "Failed to upload product image.",
            });
        } finally {
            setUploading(false);

            // Reset input so the same files can be selected again.
            e.target.value = "";
        }
    }

    async function handlePrimary(image: ProductImage) {
        if (processingId) return;

        try {
            setProcessingId(image.id);

            await setPrimaryImage(image);
            await loadImages();

            setToast({
                type: "success",
                message: "Primary image updated successfully!",
            });
        } catch (error) {
            console.error("Failed to set primary image:", error);

            setToast({
                type: "error",
                message: "Failed to update primary image.",
            });
        } finally {
            setProcessingId(null);
        }
    }

    async function handleDelete(image: ProductImage) {
        if (processingId) return;

        const confirmed = window.confirm(
            "Are you sure you want to delete this image?"
        );

        if (!confirmed) return;

        try {
            setProcessingId(image.id);

            await deleteProductImage(image);
            await loadImages();

            setToast({
                type: "success",
                message: "Product image deleted successfully!",
            });
        } catch (error) {
            console.error("Failed to delete product image:", error);

            setToast({
                type: "error",
                message: "Failed to delete product image.",
            });
        } finally {
            setProcessingId(null);
        }
    }

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5"
            onMouseDown={(e) => {
                if (
                    e.target === e.currentTarget &&
                    !uploading &&
                    !processingId
                ) {
                    onClose();
                }
            }}
        >
            {/* SUCCESS / ERROR TOAST */}
            {toast && (
                <div className="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm sm:right-6 sm:top-6">
                    <div
                        className={`flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-2xl ${toast.type === "success"
                                ? "border-emerald-200"
                                : "border-red-200"
                            }`}
                    >
                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${toast.type === "success"
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-red-100 text-red-600"
                                }`}
                        >
                            {toast.type === "success" ? (
                                <CheckCircle2 className="h-5 w-5" />
                            ) : (
                                <X className="h-5 w-5" />
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-slate-900">
                                {toast.type === "success"
                                    ? "Success"
                                    : "Something went wrong"}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                {toast.message}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setToast(null)}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            aria-label="Close notification"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div
                        className={`mt-1 h-1 overflow-hidden rounded-full ${toast.type === "success"
                                ? "bg-emerald-100"
                                : "bg-red-100"
                            }`}
                    >
                        <div
                            className={`h-full w-full origin-left animate-[productImageToastProgress_3s_linear_forwards] ${toast.type === "success"
                                    ? "bg-emerald-500"
                                    : "bg-red-500"
                                }`}
                        />
                    </div>
                </div>
            )}

            {/* MODAL */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-images-modal-title"
                className="flex max-h-[calc(100vh-24px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100vh-40px)] sm:rounded-3xl"
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <div className="shrink-0 border-b border-slate-100 bg-white px-5 py-4 sm:px-7 sm:py-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 sm:h-12 sm:w-12">
                                <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>

                            <div className="min-w-0">
                                <h2
                                    id="product-images-modal-title"
                                    className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
                                >
                                    Product Images
                                </h2>

                                <p className="mt-0.5 truncate text-xs text-slate-500 sm:text-sm">
                                    Manage images for {productName}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={uploading || !!processingId}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Close modal"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* SCROLLABLE CONTENT */}
                <div className="min-h-0 flex-1 overflow-y-auto">
                    <div className="space-y-7 px-5 py-6 sm:px-7 sm:py-7">
                        {/* UPLOAD SECTION */}
                        <section>
                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                                    <UploadCloud className="h-4 w-4" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-sm font-bold text-violet-600 sm:text-base">
                                            Upload Images
                                        </h2>

                                        <div className="hidden h-px flex-1 bg-slate-200 sm:block" />
                                    </div>

                                    <p className="mt-1 text-xs leading-5 text-slate-400">
                                        Upload one or multiple product images.
                                        The first primary image will be used
                                        as the main product image.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                disabled={uploading}
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                className="group mt-5 flex min-h-[180px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-5 py-8 text-center transition-all hover:border-violet-300 hover:bg-violet-50/40 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {uploading ? (
                                    <>
                                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                            <Loader2 className="h-6 w-6 animate-spin" />
                                        </div>

                                        <p className="text-sm font-semibold text-violet-600">
                                            Uploading images...
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Please wait while your images are
                                            being uploaded.
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition-transform group-hover:scale-105">
                                            <UploadCloud className="h-6 w-6" />
                                        </div>

                                        <p className="text-sm font-semibold text-violet-600">
                                            Click to upload images
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Select one or multiple images
                                        </p>

                                        <p className="mt-3 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                                            PNG, JPG, WEBP
                                        </p>
                                    </>
                                )}
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleUpload}
                                className="hidden"
                            />
                        </section>

                        {/* IMAGE GALLERY */}
                        <section>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                                        <ImageIcon className="h-4 w-4" />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-sm font-bold text-violet-600 sm:text-base">
                                                Product Gallery
                                            </h2>

                                            <div className="hidden h-px w-16 bg-slate-200 sm:block" />
                                        </div>

                                        <p className="mt-1 text-xs text-slate-400">
                                            {images.length === 0
                                                ? "No images uploaded yet."
                                                : `${images.length} ${images.length === 1
                                                    ? "image"
                                                    : "images"
                                                } uploaded`}
                                        </p>
                                    </div>
                                </div>

                                {images.length > 0 && (
                                    <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                        {images.length} Images
                                    </div>
                                )}
                            </div>

                            {images.length === 0 ? (
                                <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-5 py-12 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                        <ImageIcon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-4 text-sm font-semibold text-slate-700">
                                        No product images yet
                                    </h3>

                                    <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                                        Upload product images using the upload
                                        area above. You can upload multiple
                                        images at once.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white transition hover:bg-violet-700"
                                    >
                                        <UploadCloud className="h-4 w-4" />
                                        Upload Images
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {images.map((image) => {
                                        const isProcessing =
                                            processingId === image.id;

                                        return (
                                            <div
                                                key={image.id}
                                                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-violet-200 hover:shadow-md"
                                            >
                                                {/* IMAGE */}
                                                <div className="relative aspect-square overflow-hidden bg-slate-100">
                                                    <img
                                                        src={getImageUrl(
                                                            image.storage_path
                                                        )}
                                                        alt={
                                                            image.alt_text ??
                                                            ""
                                                        }
                                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                    />

                                                    {/* Overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

                                                    {/* Primary badge */}
                                                    {image.is_primary && (
                                                        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-bold text-white shadow-lg">
                                                            <Star className="h-3 w-3 fill-current" />
                                                            Primary
                                                        </div>
                                                    )}

                                                    {/* Processing */}
                                                    {isProcessing && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-violet-600 shadow-lg">
                                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* DETAILS */}
                                                <div className="p-3">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="truncate text-xs font-medium text-slate-500">
                                                            {image.alt_text ||
                                                                "Product image"}
                                                        </span>

                                                        {image.is_primary && (
                                                            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                                                                Main
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="mt-3 flex gap-2">
                                                        {image.is_primary ? (
                                                            <div className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-50 text-xs font-semibold text-emerald-600">
                                                                <Check className="h-3.5 w-3.5" />
                                                                Primary Image
                                                            </div>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    !!processingId
                                                                }
                                                                onClick={() =>
                                                                    handlePrimary(
                                                                        image
                                                                    )
                                                                }
                                                                className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-violet-50 text-xs font-semibold text-violet-600 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                            >
                                                                <Star className="h-3.5 w-3.5" />
                                                                Make Primary
                                                            </button>
                                                        )}

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                !!processingId
                                                            }
                                                            onClick={() =>
                                                                handleDelete(
                                                                    image
                                                                )
                                                            }
                                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                            aria-label="Delete image"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="shrink-0 border-t border-slate-100 bg-white px-5 py-4 sm:px-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-slate-400">
                            {images.length > 0
                                ? "Set one image as the primary product image."
                                : "Upload images to build your product gallery."}
                        </p>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={uploading || !!processingId}
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>

            <style>
                {`
                    @keyframes productImageToastProgress {
                        from {
                            transform: scaleX(1);
                        }

                        to {
                            transform: scaleX(0);
                        }
                    }
                `}
            </style>
        </div>
    );
}