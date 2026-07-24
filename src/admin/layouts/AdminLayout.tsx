import { useAuth } from "@/contexts/AuthContexts";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
    const { admin, logout } = useAuth();

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="h-16 bg-white border-b flex items-center justify-between px-6">
                <h1 className="text-xl font-bold">
                    Forest Gold Admin
                </h1>

                <div className="flex items-center gap-4">
                    <span className="text-sm">
                        {admin?.full_name}
                    </span>

                    <button
                        onClick={logout}
                        className="px-4 py-2 rounded bg-red-600 text-white"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="p-6">
                {children}
            </main>
        </div>
    );
}