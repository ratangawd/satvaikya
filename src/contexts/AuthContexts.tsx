import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase"; 
import * as authService from "@/services/auth.service";
import { AdminProfile, AuthContextType } from "@/types/auth";
import { getAdminProfile } from "@/services/admin.service";

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [admin, setAdmin] = useState<AdminProfile | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initialize() {
            try {
                const session = await authService.getCurrentSession();

                const currentUser = session?.user ?? null;

                setUser(currentUser);

                if (currentUser) {
                    const adminProfile = await getAdminProfile(currentUser.id);

                    setAdmin(adminProfile);
                    setIsAdmin(!!adminProfile);
                }
            } finally {
                setLoading(false);
            }
        }

        initialize();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            const currentUser = session?.user ?? null;

            setUser(currentUser);

            if (currentUser) {
                const adminProfile = await getAdminProfile(currentUser.id);

                setAdmin(adminProfile);
                setIsAdmin(!!adminProfile);
            } else {
                setAdmin(null);
                setIsAdmin(false);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    async function login(email: string, password: string) {
        const data = await authService.login(email, password);

        setUser(data.user);

        const adminProfile = await getAdminProfile(data.user.id);

        setAdmin(adminProfile);
        setIsAdmin(!!adminProfile);
    }

    async function logout() {
        await authService.logout();

        setUser(null);
        setAdmin(null);
        setIsAdmin(false);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                admin,
                isAdmin,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}    