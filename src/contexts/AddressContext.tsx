import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type { Address } from "@/types/address";

interface AddressContextValue {
    addresses: Address[];
    addAddress: (address: Address) => void;
    updateAddress: (address: Address) => void;
    removeAddress: (id: string) => void;
    setDefaultAddress: (id: string) => void;
    defaultAddress?: Address;
}

const AddressContext = createContext<AddressContextValue | null>(null);

const STORAGE_KEY = "guest-addresses-v1";

export function AddressProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [addresses, setAddresses] = useState<Address[]>(() => {
        if (typeof window === "undefined") return [];

        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(addresses)
        );
    }, [addresses]);

    const addAddress = useCallback((address: Address) => {
        setAddresses((prev) => {
            if (address.isDefault) {
                return [
                    ...prev.map((a) => ({
                        ...a,
                        isDefault: false,
                    })),
                    address,
                ];
            }

            return [...prev, address];
        });
    }, []);

    const updateAddress = useCallback((address: Address) => {
        setAddresses((prev) =>
            prev.map((a) =>
                a.id === address.id ? address : a
            )
        );
    }, []);

    const removeAddress = useCallback((id: string) => {
        setAddresses((prev) =>
            prev.filter((a) => a.id !== id)
        );
    }, []);

    const setDefaultAddress = useCallback((id: string) => {
        setAddresses((prev) =>
            prev.map((a) => ({
                ...a,
                isDefault: a.id === id,
            }))
        );
    }, []);

    const value = useMemo(
        () => ({
            addresses,
            addAddress,
            updateAddress,
            removeAddress,
            setDefaultAddress,
            defaultAddress: addresses.find(
                (a) => a.isDefault
            ),
        }),
        [
            addresses,
            addAddress,
            updateAddress,
            removeAddress,
            setDefaultAddress,
        ]
    );

    return (
        <AddressContext.Provider value={value}>
            {children}
        </AddressContext.Provider>
    );
}

export function useAddresses() {
    const context = useContext(AddressContext);

    if (!context) {
        throw new Error(
            "useAddresses must be used inside AddressProvider"
        );
    }

    return context;
}