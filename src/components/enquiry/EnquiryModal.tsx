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
}

export default function EnquiryModal({
    open,
    onClose,
    product,
}: EnquiryModalProps) {
    const { user, customer } = useCustomerAuth();

    const [quantity, setQuantity] = useState(5);
    const [submitting, setSubmitting] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [message, setMessage] = useState("");

    

    useEffect(() => {

        
        if (!open) return;

        setQuantity(5);

        setName(
            `${customer?.first_name ?? ""} ${customer?.last_name ?? ""}`.trim()
        );

        setPhone(customer?.phone ?? "");
        setEmail(user?.email ?? "");
        setCity("");
        setMessage("");
    }, [open, customer, user]);

    async function handleSubmit() {
        if (!name.trim()) {
            alert("Please enter your name.");
            return;
        }

        if (!phone.trim()) {
            alert("Please enter your phone number.");
            return;
        }

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

            toast.success("Enquiry submitted successfully.");

            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit enquiry.");
        } finally {
            setSubmitting(false);
        }
    }
    if (!open) return null;

    return (
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

                    <button onClick={onClose}>
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
                                onClick={() => setQuantity((q) => q + 5)}
                                className="p-3"
                            >
                                <Plus className="h-4 w-4" />
                            </button>

                        </div>
                    </div>

                    <input
                        className="w-full rounded-lg border p-3"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className="w-full rounded-lg border p-3"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <input
                        className="w-full rounded-lg border p-3"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="w-full rounded-lg border p-3"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <textarea
                        rows={5}
                        className="w-full rounded-lg border p-3"
                        placeholder="Tell us your requirement..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                </div>

                <div className="flex justify-end gap-3 border-t px-6 py-5">

                    <button
                        onClick={onClose}
                        className="rounded-lg border px-6 py-3"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="rounded-lg bg-brand px-6 py-3 text-white disabled:opacity-50"
                    >
                        {submitting ? "Submitting..." : "Send Enquiry"}
                    </button>

                </div>

            </div>

        </div>
    );
}