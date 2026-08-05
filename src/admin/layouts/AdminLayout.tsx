import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContexts";
import {
  LayoutDashboard,
  FolderTree,
  Package,
  LogOut,
  ShieldCheck,
} from "lucide-react";

interface Props {
  children: ReactNode;
}

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Categories", to: "/admin/categories", icon: FolderTree },
  { label: "Products", to: "/admin/products", icon: Package },
];

export default function AdminLayout({ children }: Props) {
  const { admin, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/admin/login");
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* ── SIDEBAR ── */}
      <aside className="w-64 shrink-0 bg-gray-900 text-white flex flex-col shadow-xl">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-gray-900 shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold leading-tight truncate">Satvaikya</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">Admin Panel</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="px-2 pt-1 pb-2 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
            Menu
          </p>
          {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
            const active = pathname === to || pathname.startsWith(to + "/");
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-amber-500 text-gray-900 shadow"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-white/10 p-4 space-y-2">
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-gray-900 text-xs font-bold shrink-0">
              {admin?.full_name?.charAt(0)?.toUpperCase() ?? "A"}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{admin?.full_name ?? "Admin"}</div>
              <div className="text-[10px] text-gray-400 truncate">{admin?.email ?? ""}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── CONTENT AREA ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 shrink-0 bg-white border-b border-gray-200 flex items-center px-6 gap-3 shadow-sm">
          <div className="flex-1 min-w-0">
            {/* Page title injected by page heading — this bar is intentionally minimal */}
            <span className="text-sm text-gray-400">
              {NAV_ITEMS.find((n) => pathname.startsWith(n.to))?.label ?? "Admin"}
            </span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-amber-600 transition-colors"
          >
            View Storefront →
          </a>
        </header>

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
