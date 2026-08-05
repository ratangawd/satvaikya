import { useCustomerAuth } from "@/contexts/CustomerAuthContext";
import { Link } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    Heart,
    MessageCircle,
    Edit3,
    LogOut,
    ChevronRight,
    type LucideIcon,
} from "lucide-react";

// ----------------------------------------------------------------------------
// Reusable pieces
// ----------------------------------------------------------------------------

interface ProfileFieldProps {
    icon: LucideIcon;
    label: string;
    value: string;
}

function ProfileField({ icon: Icon, label, value }: ProfileFieldProps) {
    return (
        <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-700 transition-colors duration-300 group-hover:bg-emerald-50 group-hover:text-emerald-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        {label}
                    </p>
                    <p className="mt-1 truncate text-base font-semibold text-slate-900">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}

interface ActionCardProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    to?: string;
    onClick?: () => void;
    tone?: "default" | "danger";
}

function ActionCard({
    icon: Icon,
    title,
    subtitle,
    to,
    onClick,
    tone = "default",
}: ActionCardProps) {
    const isDanger = tone === "danger";

    const content = (
        <div
            className={[
                "group flex w-full items-center gap-4 rounded-2xl border p-4 text-left shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                isDanger
                    ? "border-red-200 bg-white hover:bg-red-50 focus-visible:ring-red-500"
                    : "border-gray-200 bg-white hover:bg-gray-50 focus-visible:ring-slate-900",
            ].join(" ")}
        >
            <div
                className={[
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                    isDanger
                        ? "bg-red-50 text-red-600"
                        : "bg-slate-50 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-600",
                ].join(" ")}
            >
                <Icon className="h-5 w-5" aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
                <p
                    className={[
                        "text-sm font-semibold",
                        isDanger ? "text-red-600" : "text-slate-900",
                    ].join(" ")}
                >
                    {title}
                </p>
                <p className="text-xs text-gray-500">{subtitle}</p>
            </div>

            <ChevronRight
                className={[
                    "h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5",
                    isDanger ? "text-red-400" : "text-gray-400",
                ].join(" ")}
                aria-hidden="true"
            />
        </div>
    );

    if (to) {
        return (
            <Link to={to} className="block">
                {content}
            </Link>
        );
    }

    return (
        <button type="button" onClick={onClick} className="w-full">
            {content}
        </button>
    );
}

interface HeaderSectionProps {
    firstName?: string | null;
    lastName?: string | null;
}

function HeaderSection({ firstName, lastName }: HeaderSectionProps) {
    const initial = firstName?.charAt(0)?.toUpperCase() || "U";
    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-lg sm:p-10 animate-[fadeIn_0.5s_ease-out]">
            <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl font-bold text-white ring-1 ring-white/20 backdrop-blur">
                    {initial}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white sm:text-3xl">
                        Hello, {firstName || "there"} 👋
                    </h1>
                    <p className="mt-1 text-sm text-slate-300">
                        {fullName || "Customer Account"}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                        Manage your account settings
                    </p>
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------------
// Page
// ----------------------------------------------------------------------------

export default function Profile() {
    const { user, customer, logout } = useCustomerAuth();

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-4xl space-y-8">
                <HeaderSection
                    firstName={customer?.first_name}
                    lastName={customer?.last_name}
                />

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Profile information */}
                    <section aria-labelledby="profile-information-heading">
                        <h2
                            id="profile-information-heading"
                            className="mb-4 text-lg font-semibold text-slate-900"
                        >
                            Profile Information
                        </h2>
                        <div className="space-y-4">
                            <ProfileField
                                icon={User}
                                label="First Name"
                                value={customer?.first_name ?? "-"}
                            />
                            <ProfileField
                                icon={User}
                                label="Last Name"
                                value={customer?.last_name ?? "-"}
                            />
                            <ProfileField
                                icon={Mail}
                                label="Email"
                                value={user?.email ?? "-"}
                            />
                            <ProfileField
                                icon={Phone}
                                label="Phone"
                                value={customer?.phone ?? "-"}
                            />
                        </div>
                    </section>

                    {/* Quick actions */}
                    <section aria-labelledby="quick-actions-heading">
                        <h2
                            id="quick-actions-heading"
                            className="mb-4 text-lg font-semibold text-slate-900"
                        >
                            Quick Actions
                        </h2>
                        <div className="space-y-4">
                            <ActionCard
                                icon={MessageCircle}
                                title="My Enquiries"
                                subtitle="Track all your enquiries"
                                to="/profile/enquiries"
                            />
                            <ActionCard
                                icon={Heart}
                                title="Wishlist"
                                subtitle="View your saved products"
                                to="/wishlist"
                            />
                            {/* <ActionCard
                                icon={Edit3}
                                title="Edit Profile"
                                subtitle="Update personal information"
                                to="/profile/edit"
                            /> */}
                            <ActionCard
                                icon={LogOut}
                                title="Logout"
                                subtitle="Securely sign out"
                                onClick={logout}
                                tone="danger"
                            />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}