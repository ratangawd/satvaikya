import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export default function AuthLayout({
    title,
    subtitle,
    children,
}: AuthLayoutProps) {

    const { user, loading } = useCustomerAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (user) {
        return <Navigate to="/profile" replace />;
    }
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-background">
            {/* Left Side */}
            <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
                {/* Background circles */}
                <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10 max-w-md px-10 text-white"
                >
                    <ShieldCheck className="mb-6 h-14 w-14" />

                    <h1 className="text-5xl font-bold leading-tight">
                        Welcome Back
                    </h1>

                    <p className="mt-6 text-lg text-white/80 leading-8">
                        Securely manage your account, track orders, save your wishlist,
                        and enjoy a personalized shopping experience.
                    </p>

                    <div className="mt-10 rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                        <p className="text-sm">
                            ✓ Secure Authentication
                        </p>

                        <p className="mt-2 text-sm">
                            ✓ Encrypted Customer Data
                        </p>

                        <p className="mt-2 text-sm">
                            ✓ Fast & Secure Checkout
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Right Side */}
            <div className="flex items-center justify-center px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-xl"
                >
                    <h2 className="text-3xl font-bold">
                        {title}
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        {subtitle}
                    </p>

                    <div className="mt-8">
                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}