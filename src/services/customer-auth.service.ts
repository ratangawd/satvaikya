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
    const { data, error } =
        await supabase.auth.signUp({
            email,
            password,

            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    phone,
                },
            },
        });

    if (error) throw error;

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