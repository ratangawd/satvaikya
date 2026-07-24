import { User } from "@supabase/supabase-js";

export interface AdminProfile {
    id: string;
    email: string;
    full_name: string;
    is_active: boolean;
}

export interface AuthContextType {
    user: User | null;
    admin: AdminProfile | null;
    isAdmin: boolean;
    loading: boolean;

    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}