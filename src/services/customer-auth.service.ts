import { supabase } from "@/lib/supabase";

export async function login(email: string, password: string) {
    const { data, error } =
        await supabase.auth.signInWithPassword({
            email,
            password,
        });

    if (error) throw error;

    return data;
}

export async function register(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string
) {
    // Check duplicate email
    const { data: existingEmail, error: emailCheckError } =
        await supabase
            .from("customer_profiles")
            .select("id")
            .eq("email", email.trim().toLowerCase())
            .maybeSingle();

    if (emailCheckError) {
        throw emailCheckError;
    }

    if (existingEmail) {
        throw new Error("This email is already registered.");
    }

    // Check duplicate phone
    const { data: existingPhone, error: phoneCheckError } =
        await supabase
            .from("customer_profiles")
            .select("id")
            .eq("phone", phone.trim())
            .maybeSingle();

    if (phoneCheckError) {
        throw phoneCheckError;
    }

    if (existingPhone) {
        throw new Error("This phone number is already registered.");
    }

    // Create Auth account
    const { data, error } =
        await supabase.auth.signUp({
            email: email.trim().toLowerCase(),
            password,
            options: {
                data: {
                    first_name: firstName.trim(),
                    last_name: lastName.trim(),
                    phone: phone.trim(),
                },
            },
        });

    if (error) {
        throw error;
    }

    // Supabase may return an empty identities array
    // when the email already exists.
    if (
        data.user &&
        data.user.identities &&
        data.user.identities.length === 0
    ) {
        throw new Error("This email is already registered.");
    }

    return data;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
}

export async function forgotPassword(email: string) {
    const { error } =
        await supabase.auth.resetPasswordForEmail(email, {
            redirectTo:
                window.location.origin + "/reset-password",
        });

    if (error) throw error;
}

export async function resendVerificationEmail(
    email: string
) {
    const { error } = await supabase.auth.resend({
        type: "signup",
        email,
    });

    if (error) throw error;
}

export async function updatePassword(password: string) {
    const { error } =
        await supabase.auth.updateUser({
            password,
        });

    if (error) throw error;
}

export async function getCurrentSession() {
    const { data } = await supabase.auth.getSession();

    return data.session;
}