/**
 * Dashboard.tsx
 *
 * Shows real live counts fetched from Supabase:
 * - Total categories (active + inactive)
 * - Total products (all statuses)
 * - active products
 * - Featured products
 *
 * Quick-action shortcuts to Categories and Products pages.
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import AdminLayout from "../layouts/AdminLayout";
import {
  FolderTree,
  Package,
  Star,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface Stats {
  categories: number;
  activeCategories: number;
  products: number;
  activeProducts: number;
  featuredProducts: number;
  draftProducts: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const [catRes, prodRes] = await Promise.all([
          supabase.from("categories").select("is_active"),
          supabase.from("products").select("status, featured, is_active"),
        ]);

        if (catRes.error) throw catRes.error;
        if (prodRes.error) throw prodRes.error;

        const categories = catRes.data ?? [];
        const products = prodRes.data ?? [];

        setStats({
          categories: categories.length,
          activeCategories: categories.filter((c) => c.is_active).length,
          products: products.length,
          activeProducts: products.filter((p) => p.status === "active").length,
          featuredProducts: products.filter((p) => p.featured).length,
          draftProducts: products.filter((p) => p.status === "draft").length,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load stats");
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const statCards = stats
    ? [
        {
          label: "Total Categories",
          value: stats.categories,
          sub: `${stats.activeCategories} active`,
          icon: FolderTree,
          color: "bg-violet-500",
          link: "/admin/categories",
        },
        {
          label: "Total Products",
          value: stats.products,
          sub: `${stats.activeProducts} active`,
          icon: Package,
          color: "bg-blue-500",
          link: "/admin/products",
        },
        {
          label: "active",
          value: stats.activeProducts,
          sub: "live on storefront",
          icon: CheckCircle2,
          color: "bg-emerald-500",
          link: "/admin/products",
        },
        {
          label: "Featured",
          value: stats.featuredProducts,
          sub: "shown on home page",
          icon: Star,
          color: "bg-amber-500",
          link: "/admin/products",
        },
      ]
    : [];

  return (
    <AdminLayout>
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your store's content.
        </p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-white border border-gray-200 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 text-red-700 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <Link
              key={card.label}
              to={card.link}
              className="group rounded-xl bg-white border border-gray-200 p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {card.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">{card.sub}</p>
                </div>
                <div className={`${card.color} rounded-lg p-2.5 text-white`}>
                  <card.icon className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick actions */}
      <div className="mt-10">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/admin/categories"
            className="group flex items-center justify-between gap-4 rounded-xl bg-white border border-gray-200 p-5 hover:shadow-md hover:border-violet-300 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <FolderTree className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Manage Categories</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Create parent &amp; child categories
                </div>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            to="/admin/products"
            className="group flex items-center justify-between gap-4 rounded-xl bg-white border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Manage Products</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Add, edit and publish products
                </div>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>

      {/* Status breakdown */}
      {stats && stats.draftProducts > 0 && (
        <div className="mt-8 flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
          <TrendingUp className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              {stats.draftProducts} product{stats.draftProducts !== 1 ? "s" : ""} in draft
            </p>
            <p className="text-xs text-amber-600 mt-0.5">
              Draft products are not visible on the storefront. Publish them when ready.
            </p>
            <Link
              to="/admin/products"
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-900 transition-colors"
            >
              View Products <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
