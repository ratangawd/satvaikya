// Email

// Password

// ↓

// Sign In

import { useAuth } from "@/contexts/AuthContexts";
import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Login() {
    const { login, user } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    if (user) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            await login(email, password);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold mb-6">
                    Admin Login
                </h1>

                {error && (
                    <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
                        {error}
                    </div>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded p-3 mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border rounded p-3 mb-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    disabled={loading}
                    className="w-full bg-black text-white p-3 rounded"
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}