import { User } from "@supabase/supabase-js";

export interface CustomerProfile {
    id: string;
    first_name: string;
    last_name: string | null;
    phone: string | null;
    avatar_path: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CustomerAuthContextType {
    user: User | null;
    customer: CustomerProfile | null;

    loading: boolean;

    login(email: string, password: string): Promise<void>;

    register(
        firstName: string,
        lastName: string,
        phone: string,
        email: string,
        password: string
    ): Promise<void>;

    logout(): Promise<void>;

    forgotPassword(email: string): Promise<void>;

    resendVerificationEmail(
        email: string
    ): Promise<void>;

    updatePassword(password: string): Promise<void>;

    refreshProfile(): Promise<void>;
}