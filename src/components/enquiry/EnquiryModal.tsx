import { useEffect, useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";
import { createEnquiry } from "@/services/enquiry.service";
import { toast } from "sonner";

interface EnquiryModalProps {
    open: boolean;
    onClose: () => void;
    product: {
        id: string;
        name: string;
    };
    initialQuantity: number;
}

export default function EnquiryModal({
    open,
    onClose,
    product,
    initialQuantity,
}: EnquiryModalProps) {
    const { user, customer } = useCustomerAuth();

    const [quantity, setQuantity] = useState(initialQuantity);
    const [submitting, setSubmitting] = useState(false);
    const [messageManuallyEdited, setMessageManuallyEdited] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);



    useEffect(() => {


        if (!open) return;

        const selectedQuantity = Math.max(5, initialQuantity || 5);

        setQuantity(selectedQuantity);

        setName(
            `${customer?.first_name ?? ""} ${customer?.last_name ?? ""}`.trim()
        );

        setPhone(customer?.phone ?? "");
        setEmail(user?.email ?? "");
        setCity("");
        setMessage(
            `Hi, I'm interested in ${product.name} and would like to enquire about ${selectedQuantity} pcs. Please share the details, pricing, and delivery information.`
        );
        setMessageManuallyEdited(false);
    }, [open, customer, user, initialQuantity, product.name]);

    useEffect(() => {
        if (!open || messageManuallyEdited) return;

        setMessage(
            `Hi, I'm interested in ${product.name} and would like to enquire about ${quantity} pcs. Please share the details, pricing, and delivery information.`
        );
    }, [quantity, open, product.name, messageManuallyEdited]);

    async function handleSubmit() {
        if (!name.trim()) {
            alert("Please enter your name.");
            return;
        }

        if (!phone.trim()) {
            alert("Please enter your phone number.");
            return;
        }

        // if (!email.trim()) {
        //     alert("Please enter your email address.");
        //     return;
        // }

        // const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        // if (!emailIsValid) {
        //     alert("Please enter a valid email address.");
        //     return;
        // }

        try {
            setSubmitting(true);

            await createEnquiry({
                product_id: product.id,
                customer_id: user?.id,
                customer_name: name,
                phone,
                email,
                city,
                quantity,
                message,
            });

            setSuccess(true);

            setTimeout(() => {
                onClose();
                setSuccess(false);
            }, 2000);
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit enquiry.");
        } finally {
            setSubmitting(false);
        }
    }
    if (!open) return null;

    return (
        success ? (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
                <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
                    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <svg
                                className="h-8 w-8 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>

                        <h3 className="mt-5 text-xl font-semibold text-gray-900">
                            Enquiry sent successfully!
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Thank you for your enquiry. We will get back to you shortly.
                        </p>
                    </div>
                </div>
            </div>
        ) : (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
                <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">

                    <div className="flex items-center justify-between border-b px-6 py-5">
                        <div>
                            <h2 className="text-2xl font-bold">
                                Product Enquiry
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {product.name}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close enquiry modal"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="space-y-5 p-6">

                        <div>
                            <label className="text-sm font-medium">
                                Quantity
                            </label>

                            <div className="mt-2 inline-flex items-center rounded-full border">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setQuantity((q) => Math.max(5, q - 5))
                                    }
                                    className="p-3"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>

                                <span className="w-12 text-center">
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setQuantity((q) => q + 5)}
                                    className="p-3"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <input
                            className="w-full rounded-lg border p-3"
                            required
                            placeholder="Name *"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            className="w-full rounded-lg border p-3"
                            type="tel"
                            required
                            placeholder="Phone *"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <input
                            className="w-full rounded-lg border p-3"
                            type="email"
                            placeholder="Email (Optional)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            className="w-full rounded-lg border p-3"
                            placeholder="City (Optional)"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <textarea
                            rows={5}
                            className="w-full rounded-lg border p-3"
                            placeholder="Tell us your requirement..."
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                                setMessageManuallyEdited(true);
                            }}
                        />
                    </div>

                    <div className="flex justify-end gap-3 border-t px-6 py-5">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-6 py-3"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="rounded-lg bg-brand px-6 py-3 text-white disabled:opacity-50"
                        >
                            {submitting ? "Submitting..." : "Send Enquiry"}
                        </button>

                    </div>
                </div>
            </div>
        )
    );
}