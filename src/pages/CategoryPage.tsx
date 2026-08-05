//Folder 2 - CategoryPage.tsx
/**
 * CategoryPage.tsx
 *
 * Supports three content states for any category at any depth:
 *   1. Children only   → show child-category cards
 *   2. Products only   → show product grid / list
 *   3. Both            → child-category cards first, then products
 *   4. Neither         → "Products Coming Soon" message
 *
 * Breadcrumbs now use the `ancestors` array returned by getStoreCategory
 * so the full path is always shown, e.g. Home › Collections › Furniture › Office Chairs.
 */

import { useEffect, useMemo, useState } from "react";
import { getStoreCategory, getCategoryUrl, getProductUrl } from "@/services/store.service";
import type { StoreCategory } from "@/services/store.service";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, LayoutGrid, List } from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import WishlistButton from "@/components/WishlistButton";
import NotFound from "./NotFound";
import { formatINR } from "@/contexts/CartContext";

type Sort = "featured" | "priceAsc" | "priceDesc" | "name";

interface CategoryPageProps {
  /**
   * Resolved category, passed down by CategoryOrProductResolver (the
   * normal path — resolution happens once, centrally, via
   * resolveStorePath()). If omitted, this component falls back to
   * resolving its own slug from the URL, so it still works if ever
   * mounted directly.
   */
  category?: StoreCategory;
}

export default function CategoryPage({ category: categoryProp }: CategoryPageProps) {
  const params = useParams();
  // Fallback slug: last non-empty segment of the current path, used only
  // when no `category` prop was supplied.
  const fallbackSlug = (params["*"] ?? params.categorySlug ?? "")
    .split("/")
    .filter(Boolean)
    .pop() ?? "";

  const [category, setCategory] = useState<StoreCategory | null>(categoryProp ?? null);
  const [loading, setLoading] = useState(!categoryProp);
  const [sort, setSort] = useState<Sort>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (categoryProp) {
      setCategory(categoryProp);
      setLoading(false);
      return;
    }

    setLoading(true);
    setCategory(null);

    async function loadCategory() {
      try {
        const data = await getStoreCategory(fallbackSlug);
        setCategory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCategory();
  }, [categoryProp, fallbackSlug]);

  const products = useMemo(() => {
    if (!category) return [];
    const arr = [...category.products];
    if (sort === "priceAsc") arr.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") arr.sort((a, b) => b.price - a.price);
    if (sort === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [category, sort]);

  const children = category?.children ?? [];
  const hasChildren = children.length > 0;
  const hasProducts = products.length > 0;

  if (loading) {
    return (
      <PageTransition>
        <div className="pt-40 text-center text-muted-foreground">Loading…</div>
      </PageTransition>
    );
  }

  if (!category) {
    return <NotFound />;
  }

  // Build breadcrumb JSON-LD items
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Home", item: "/" },
    { "@type": "ListItem", position: 2, name: "Collections", item: "/collections" },
    ...category.ancestors.map((a, idx) => ({
      "@type": "ListItem",
      position: 3 + idx,
      name: a.name,
      item: `/collections/${category.ancestors
        .slice(0, idx + 1)
        .map((s) => s.slug)
        .join("/")}`,
    })),
    {
      "@type": "ListItem",
      position: 3 + category.ancestors.length,
      name: category.name,
      item: getCategoryUrl(category),
    },
  ];

  return (
    <PageTransition>
      <SEO
        title={`${category.name} | SatvAikya`}
        description={category.description}
        path={`/collections/${category.slug}`}
        image={category.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems,
        }}
      />

      {/* BANNER */}
      <section className="relative pt-24 h-[52vh] min-h-[400px] flex items-end overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-10 md:pb-16 text-white">
          {/* ── Breadcrumbs: full ancestor path ── */}
          <nav className="text-xs text-white/70 flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link to="/collections" className="hover:text-gold transition-colors">Collections</Link>

            {category.ancestors.map((ancestor, idx) => {
              const ancestorPath = `/collections/${category.ancestors
                .slice(0, idx + 1)
                .map((a) => a.slug)
                .join("/")}`;
              return (
                <>
                  <ChevronRight key={`sep-${ancestor.slug}`} className="h-3 w-3 shrink-0" />
                  <Link
                    key={ancestor.slug}
                    to={ancestorPath}
                    className="hover:text-gold transition-colors"
                  >
                    {ancestor.name}
                  </Link>
                </>
              );
            })}

            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-white">{category.name}</span>
          </nav>

          <span className="mt-4 inline-block text-xs uppercase tracking-[0.25em] text-gold">
            {category.tagline}
          </span>
          <h1 className="mt-2 font-display text-4xl md:text-6xl">{category.name}</h1>
          <p className="mt-3 text-white/85 max-w-2xl">{category.description}</p>
        </div>
      </section>

      {/* ── CHILD CATEGORIES (if any) ── */}
      {hasChildren && (
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl md:text-3xl mb-6">
              {hasProducts ? "Sub-Collections" : "Collections"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
              {children.map((child, i) => (
                <motion.article
                  key={child.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  <Link
                    to={`${getCategoryUrl(category)}/${child.slug}`}
                    className="block"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={child.image}
                        alt={child.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        width={800}
                        height={600}
                      />
                    </div>
                    <div className="p-3 sm:p-5 md:p-6">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gold truncate">
                            {child.tagline}
                          </div>
                          <h3 className="mt-1 font-display text-base sm:text-xl md:text-2xl group-hover:text-brand transition-colors truncate">
                            {child.name}
                          </h3>
                        </div>
                        {child.products.length > 0 && (
                          <span className="hidden sm:inline-flex text-xs bg-brand/10 text-brand rounded-full px-2.5 py-1 whitespace-nowrap shrink-0">
                            {child.products.length}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 hidden md:block text-sm text-muted-foreground line-clamp-2">
                        {child.description}
                      </p>
                      <div className="mt-3 md:mt-5 inline-flex items-center gap-1 text-xs sm:text-sm text-brand group-hover:text-gold transition font-medium">
                        View <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRODUCTS TOOLBAR (only when there are products) ── */}
      {hasProducts && (
        <>
          <section className="border-b border-border bg-background sticky top-16 md:top-20 z-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center">
              <div className="text-sm text-muted-foreground min-w-0 truncate">
                {hasChildren && (
                  <span className="mr-2 font-medium text-foreground">{category.name} Products</span>
                )}
                <span className="text-foreground font-medium">{products.length}</span> product{products.length !== 1 ? "s" : ""}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <label className="hidden sm:block text-xs text-muted-foreground">Sort</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="px-3 py-2 rounded-full border border-border bg-card text-sm focus:outline-none focus:border-brand"
                >
                  <option value="featured">Featured</option>
                  <option value="priceAsc">Price: Low → High</option>
                  <option value="priceDesc">Price: High → Low</option>
                  <option value="name">Alphabetical</option>
                </select>
                <div className="hidden md:inline-flex rounded-full border border-border overflow-hidden">
                  <button
                    aria-label="Grid view"
                    onClick={() => setView("grid")}
                    className={`p-2 ${view === "grid" ? "bg-brand text-white" : "text-muted-foreground hover:bg-muted"}`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    aria-label="List view"
                    onClick={() => setView("list")}
                    className={`p-2 ${view === "list" ? "bg-brand text-white" : "text-muted-foreground hover:bg-muted"}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── PRODUCTS GRID / LIST ── */}
          <section className={hasChildren ? "py-10 md:py-14 border-t border-border" : "py-12 md:py-16"}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {hasChildren && (
                <h2 className="font-display text-2xl md:text-3xl mb-6">Products in {category.name}</h2>
              )}
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6"
                    : "space-y-4"
                }
              >
                {products.map((p, i) => (
                  <motion.article
                    key={p.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className={
                      view === "grid"
                        ? "group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl transition-all relative flex flex-col"
                        : "group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr]"
                    }
                  >
                    <WishlistButton
                      className="absolute top-2 right-2 z-10"
                      item={{
                        id: `${category.slug}/${p.slug}`,
                        code: p.code,
                        name: p.name,
                        price: p.price,
                        image: p.image,
                        categorySlug: category.slug,
                        productSlug: p.slug,
                        url: getProductUrl(category, p),
                      }}
                    />
                    <Link
                      to={getProductUrl(category, p)}
                      className={view === "grid" ? "block flex-1 flex flex-col" : "contents"}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          width={800}
                          height={800}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
                        <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gold">
                          Code {p.code}
                        </div>
                        <h3 className="mt-1 font-display text-sm sm:text-base md:text-lg group-hover:text-brand transition line-clamp-2">
                          {p.name}
                        </h3>
                        <p className="mt-1 hidden md:block text-sm text-muted-foreground line-clamp-2">
                          {p.short}
                        </p>
                        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
                          <span className="font-display text-base sm:text-lg md:text-xl text-brand">
                            {formatINR(p.price)}
                          </span>
                          <span className="hidden sm:inline text-xs text-brand group-hover:text-gold transition">
                            View →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── COMING SOON (neither children nor products) ── */}
      {!hasChildren && !hasProducts && (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-5xl mb-6">🪵</div>
            <h2 className="font-display text-3xl md:text-4xl">Products Coming Soon</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We're crafting something beautiful for this collection. Check back soon or explore our
              other collections in the meantime.
            </p>
            <Link
              to="/collections"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white font-medium hover:bg-brand-hover transition"
            >
              Explore Collections <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}
    </PageTransition>
  );
}