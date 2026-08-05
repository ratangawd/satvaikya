import { Navigate } from "react-router-dom";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";

interface Props {
    children: React.ReactNode;
}

export default function CustomerProtectedRoute({
    children,
}: Props) {
    const { user, loading } = useCustomerAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}