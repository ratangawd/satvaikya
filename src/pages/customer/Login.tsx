import AuthLayout from "@/components/customer/auth/AuthLayout";
import PasswordInput from "@/components/customer/auth/PasswordInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useCustomerAuth } from "@/contexts/CustomerAuthContext";

const loginSchema = z.object({
    email: z
        .string()
        .email("Enter a valid email"),

    password: z
        .string()
        .min(1, "Password is required"),

    remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;
export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });
    const navigate = useNavigate();

    const {
        login,
        resendVerificationEmail,
    } = useCustomerAuth();

    const [loading, setLoading] = useState(false);

    const [emailForVerification, setEmailForVerification] =
        useState("");

    const [resendCooldown, setResendCooldown] =
        useState(0);

    useEffect(() => {
        if (resendCooldown <= 0) return;

        const timer = setInterval(() => {
            setResendCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [resendCooldown]);

    const onSubmit = async (data: LoginFormData) => {
        try {
            setLoading(true);

            await login(data.email, data.password);

            toast.success("Login successful.");

            navigate("/profile", { replace: true });
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    };

    const emailField = register("email");

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to your account to access your orders, wishlist, and profile."
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Email Address
                    </label>

                    <input
                        type="email"
                        placeholder="john@example.com"
                        {...emailField}
                        onChange={(e) => {
                            emailField.onChange(e);
                            setEmailForVerification(e.target.value);
                        }}
                        className="w-full rounded-lg border px-4 py-2.5"
                    />

                    {errors.email && (
                        <p className="text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Password
                    </label>

                    <PasswordInput
                        placeholder="Enter your password"
                        {...register("password")}
                        error={errors.password?.message}
                    />
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register("remember")}
                        />
                        Remember me
                    </label>

                    <Link
                        to="/forgot-password"
                        className="text-primary hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <div className="text-right">
                    <button
                        type="button"
                        disabled={resendCooldown > 0}
                        onClick={async () => {
                            if (!emailForVerification) {
                                toast.error(
                                    "Please enter your email first."
                                );
                                return;
                            }

                            try {
                                await resendVerificationEmail(
                                    emailForVerification
                                );

                                toast.success(
                                    "Verification email sent successfully."
                                );
                                setResendCooldown(60);
                            } catch (error: any) {
                                toast.error(
                                    error.message ||
                                    "Unable to send verification email."
                                );
                            }
                        }}
                        className="text-sm text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {resendCooldown > 0
                            ? `Resend verification email (${resendCooldown}s)`
                            : "Resend verification email"}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>

                <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-primary hover:underline"
                    >
                        Create Account
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}