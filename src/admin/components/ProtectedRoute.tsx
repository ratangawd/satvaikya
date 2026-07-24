import { useAuth } from "@/contexts/AuthContexts";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}   

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {
    const { loading, isAdmin } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
}