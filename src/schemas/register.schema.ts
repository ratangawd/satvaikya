import { z } from "zod";

export const registerSchema = z
    .object({
        firstName: z
            .string()
            .min(2, "First name must be at least 2 characters"),

        lastName: z.string().optional(),

        phone: z
            .string()
            .regex(
                /^[6-9]\d{9}$/,
                "Enter a valid 10-digit mobile number"
            ),

        email: z
            .string()
            .email("Enter a valid email"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain one uppercase letter")
            .regex(/[a-z]/, "Must contain one lowercase letter")
            .regex(/[0-9]/, "Must contain one number"),

        confirmPassword: z.string(),

        acceptTerms: z.literal(true, {
            errorMap: () => ({
                message: "You must accept the Terms & Conditions",
            }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type RegisterFormData = z.infer<typeof registerSchema>;