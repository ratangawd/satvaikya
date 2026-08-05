import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import { User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";

import * as customerAuthService from "@/services/customer-auth.service";

import { getCustomerProfile } from "@/services/customer.service";

import {
    CustomerAuthContextType,
    CustomerProfile,
} from "@/types/customer-auth";

const CustomerAuthContext =
    createContext<CustomerAuthContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export function CustomerAuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);

    const [customer, setCustomer] =
        useState<CustomerProfile | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initialize();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                const currentUser = session?.user ?? null;

                setUser(currentUser);

                if (currentUser) {
                    const profile =
                        await getCustomerProfile(currentUser.id);

                    setCustomer(profile);
                } else {
                    setCustomer(null);
                }

                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    async function initialize() {
        try {
            const session =
                await customerAuthService.getCurrentSession();

            const currentUser = session?.user ?? null;

            setUser(currentUser);

            if (currentUser) {
                const profile =
                    await getCustomerProfile(currentUser.id);

                setCustomer(profile);
            }
        } finally {
            setLoading(false);
        }
    }

    async function login(email: string, password: string) {
        const data =
            await customerAuthService.login(email, password);

        setUser(data.user);

        const profile =
            await getCustomerProfile(data.user.id);

        setCustomer(profile);
    }

    async function register(
        firstName: string,
        lastName: string,
        phone: string,
        email: string,
        password: string
    ) {
        await customerAuthService.register(
            firstName,
            lastName,
            phone,
            email,
            password
        );
    }

    async function logout() {
        await customerAuthService.logout();

        setUser(null);
        setCustomer(null);
    }

    async function forgotPassword(email: string) {
        await customerAuthService.forgotPassword(email);
    }

    async function resendVerificationEmail(
        email: string
    ) {
        await customerAuthService.resendVerificationEmail(
            email
        );
    }

    async function updatePassword(password: string) {
        await customerAuthService.updatePassword(password);
    }

    async function refreshProfile() {
        if (!user) return;

        const profile =
            await getCustomerProfile(user.id);

        setCustomer(profile);
    }

    return (
        <CustomerAuthContext.Provider
            value={{
                user,
                customer,

                loading,

                login,

                register,

                logout,

                forgotPassword,

                resendVerificationEmail,

                updatePassword,

                refreshProfile,
            }}
        >
            {children}
        </CustomerAuthContext.Provider>
    );
}

export function useCustomerAuth() {
    const context = useContext(CustomerAuthContext);

    if (!context) {
        throw new Error(
            "useCustomerAuth must be used inside CustomerAuthProvider"
        );
    }

    return context;
}