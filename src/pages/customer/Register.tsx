import AuthLayout from "@/components/customer/auth/AuthLayout";
import PasswordInput from "@/components/customer/auth/PasswordInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { toast } from "sonner";

import { useCustomerAuth } from "@/contexts/CustomerAuthContext";
import PasswordStrength from "@/components/customer/auth/PasswordStrength";

import {
    registerSchema,
    RegisterFormData,
} from "@/schemas/register.schema";

export default function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });
    const password = watch("password");
    const onSubmit = async (data: RegisterFormData) => {
        try {
            setLoading(true);

            await registerCustomer(
                data.firstName,
                data.lastName ?? "",
                data.phone,
                data.email,
                data.password
            );

            toast.success(
                "Account created successfully. Please verify your email."
            );

            navigate("/login");
        } catch (error: any) {
            toast.error(error.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();

    const { register: registerCustomer } = useCustomerAuth();

    const [loading, setLoading] = useState(false);
    return (
        <AuthLayout
            title="Create Account"
            subtitle="Create your account to track orders, manage your wishlist, and enjoy a personalized shopping experience."
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            First Name
                        </label>
                        <input
                            type="text"
                            placeholder="John"
                            {...register("firstName")}
                            className="w-full rounded-lg border px-4 py-2.5"
                        />
                        {errors.firstName && (
                            <p className="text-sm text-red-500">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Last Name
                        </label>
                        <input
                            type="text"
                            placeholder="Doe"
                            {...register("lastName")}
                            className="w-full rounded-lg border px-4 py-2.5"
                        />
                        {errors.lastName && (
                            <p className="text-sm text-red-500">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        placeholder="9876543210"
                        {...register("phone")}
                        className="w-full rounded-lg border px-4 py-2.5"
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-500">
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        {...register("email")}
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
                    <PasswordStrength password={password ?? ""} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Confirm Password
                    </label>

                    <PasswordInput
                        placeholder="Confirm your password"
                        {...register("confirmPassword")}
                        error={errors.confirmPassword?.message}
                    />
                </div>  

                <div className="space-y-1">
                    <label className="flex items-start gap-2 text-sm">
                        <input
                            type="checkbox"
                            {...register("acceptTerms")}
                            className="mt-1"
                        />

                        <span>
                            I agree to the{" "}
                            <span className="font-medium text-primary">
                                Terms & Conditions
                            </span>
                        </span>
                    </label>

                    {errors.acceptTerms && (
                        <p className="text-sm text-red-500">
                            {errors.acceptTerms.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-primary hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}