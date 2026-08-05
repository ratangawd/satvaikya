import { useState } from "react";
import { v4 as uuid } from "uuid";

import type { Address } from "@/types/address";
import { useAddresses } from "@/contexts/AddressContext";

export default function AddressForm() {
    const { addAddress } = useAddresses();

    const [form, setForm] = useState<Address>({
        id: "",
        fullName: "",
        phone: "",
        email: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "India",
        postalCode: "",
        landmark: "",
        isDefault: true,
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    }

    function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        addAddress({
            ...form,
            id: uuid(),
        });

        setForm({
            id: "",
            fullName: "",
            phone: "",
            email: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            country: "India",
            postalCode: "",
            landmark: "",
            isDefault: true,
        });

        alert("Address added successfully.");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border bg-white p-6 shadow-sm"
        >
            <div className="grid gap-4 md:grid-cols-2">
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="rounded-lg border p-3"
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="rounded-lg border p-3"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="rounded-lg border p-3 md:col-span-2"
                />

                <input
                    type="text"
                    name="addressLine1"
                    placeholder="Address Line 1"
                    value={form.addressLine1}
                    onChange={handleChange}
                    required
                    className="rounded-lg border p-3 md:col-span-2"
                />

                <input
                    type="text"
                    name="addressLine2"
                    placeholder="Address Line 2 (Optional)"
                    value={form.addressLine2}
                    onChange={handleChange}
                    className="rounded-lg border p-3 md:col-span-2"
                />

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="rounded-lg border p-3"
                />

                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                    required
                    className="rounded-lg border p-3"
                />

                <input
                    type="text"
                    name="postalCode"
                    placeholder="PIN Code"
                    value={form.postalCode}
                    onChange={handleChange}
                    required
                    className="rounded-lg border p-3"
                />

                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={form.country}
                    onChange={handleChange}
                    required
                    className="rounded-lg border p-3"
                />

                <input
                    type="text"
                    name="landmark"
                    placeholder="Landmark (Optional)"
                    value={form.landmark}
                    onChange={handleChange}
                    className="rounded-lg border p-3 md:col-span-2"
                />
            </div>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="isDefault"
                    checked={form.isDefault}
                    onChange={handleChange}
                />
                Set as default address
            </label>

            <button
                type="submit"
                className="rounded-lg bg-black px-6 py-3 text-white transition hover:opacity-90"
            >
                Save Address
            </button>
        </form>
    );
}