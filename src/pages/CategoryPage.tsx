// Folder 2 - CategoryPage.tsx

/**
 * CategoryPage.tsx
 *
 * Supports three content states for any category at any depth:
 *   1. Children only   → show child-category cards
 *   2. Products only   → show product grid / list
 *   3. Both            → child-category cards first, then products
 *   4. Neither         → "Products Coming Soon" message
 *
 * Breadcrumbs use the `ancestors` array returned by getStoreCategory
 * so the full path is always shown.
 */

import { useEffect, useMemo, useState } from "react";
import {
  getStoreCategory,
  getCategoryUrl,
  getProductUrl,
} from "@/services/store.service";
import type { StoreCategory } from "@/services/store.service";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  LayoutGrid,
  List,
} from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import WishlistButton from "@/components/WishlistButton";
import NotFound from "./NotFound";
import { formatINR } from "@/contexts/CartContext";

type Sort =
  | "featured"
  | "priceAsc"
  | "priceDesc"
  | "name";

interface CategoryPageProps {
  /**
   * Resolved category, passed down by CategoryOrProductResolver.
   * If omitted, this component falls back to resolving its own slug
   * from the URL.
   */
  category?: StoreCategory;
}

export default function CategoryPage({
  category: categoryProp,
}: CategoryPageProps) {
  const params = useParams();

  // Fallback slug: last non-empty segment of current path.
  const fallbackSlug =
    (params["*"] ?? params.categorySlug ?? "")
      .split("/")
      .filter(Boolean)
      .pop() ?? "";

  const [category, setCategory] =
    useState<StoreCategory | null>(
      categoryProp ?? null
    );

  const [loading, setLoading] = useState(
    !categoryProp
  );

  const [sort, setSort] =
    useState<Sort>("featured");

  const [view, setView] =
    useState<"grid" | "list">("grid");

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
        const data =
          await getStoreCategory(fallbackSlug);

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

    if (sort === "priceAsc") {
      arr.sort((a, b) => a.price - b.price);
    }

    if (sort === "priceDesc") {
      arr.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      arr.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return arr;
  }, [category, sort]);

  const children = category?.children ?? [];

  const hasChildren =
    children.length > 0;

  const hasProducts =
    products.length > 0;

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <PageTransition>
        <div className="pt-40 text-center text-muted-foreground">
          Loading…
        </div>
      </PageTransition>
    );
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!category) {
    return <NotFound />;
  }

  /* =========================================================
     BREADCRUMB JSON-LD
  ========================================================= */

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Collections",
      item: "/collections",
    },

    ...category.ancestors.map(
      (ancestor, idx) => ({
        "@type": "ListItem",
        position: 3 + idx,
        name: ancestor.name,
        item: `/collections/${category.ancestors
          .slice(0, idx + 1)
          .map((s) => s.slug)
          .join("/")}`,
      })
    ),

    {
      "@type": "ListItem",
      position:
        3 + category.ancestors.length,
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

      {/* =====================================================
          COLLECTION BANNER
          ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-black

          /* MOBILE
             1080 × 1350 = 4:5
             Therefore:
             height = viewport width × 1.25
          */
          h-[125vw]
          min-h-[480px]
          max-h-[700px]

          pt-24

          /* DESKTOP */
          md:h-[52vh]
          md:min-h-[400px]
          md:max-h-none
          md:pt-24
        "
      >
        {/* =================================================
            BANNER IMAGE
            ================================================= */}

        <picture className="absolute inset-0 block h-full w-full">
          {/* MOBILE PORTRAIT IMAGE */}
          <source
            media="(max-width: 767px)"
            srcSet={
              category.bannerMobileImage ||
              category.bannerImage ||
              category.image
            }
          />

          {/* DESKTOP WIDE IMAGE */}
          <img
            src={
              category.bannerImage ||
              category.image
            }
            alt={category.name}
            width={1920}
            height={800}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
            "
          />
        </picture>

        {/* =================================================
            OVERLAY
            ================================================= */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/90
            via-black/35
            to-black/10

            md:bg-gradient-to-t
            md:from-black/85
            md:via-black/40
            md:to-transparent
          "
        />

        {/* =================================================
            BANNER CONTENT
            ================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            h-full
            w-full
            max-w-7xl
            flex-col
            justify-end

            px-4
            pb-7

            sm:px-6
            sm:pb-9

            md:px-8
            md:pb-16
          "
        >
          {/* =================================================
              BREADCRUMBS
              ================================================= */}

          <nav
            className="
              flex
              flex-wrap
              items-center
              gap-1

              text-[11px]
              leading-5
              text-white/75

              sm:text-xs
            "
          >
            <Link
              to="/"
              className="transition-colors hover:text-gold"
            >
              Home
            </Link>

            <ChevronRight className="h-3 w-3 shrink-0" />

            <Link
              to="/collections"
              className="transition-colors hover:text-gold"
            >
              Collections
            </Link>

            {category.ancestors.map(
              (ancestor, idx) => {
                const ancestorPath =
                  `/collections/${category.ancestors
                    .slice(0, idx + 1)
                    .map((a) => a.slug)
                    .join("/")}`;

                return (
                  <span
                    key={ancestor.slug}
                    className="
                      flex
                      items-center
                      gap-1
                    "
                  >
                    <ChevronRight className="h-3 w-3 shrink-0" />

                    <Link
                      to={ancestorPath}
                      className="transition-colors hover:text-gold"
                    >
                      {ancestor.name}
                    </Link>
                  </span>
                );
              }
            )}

            <ChevronRight className="h-3 w-3 shrink-0" />

            <span className="text-white">
              {category.name}
            </span>
          </nav>

          {/* =================================================
              TAGLINE
              ================================================= */}

          <span
            className="
              mt-3
              inline-block

              text-[10px]
              uppercase
              tracking-[0.20em]
              text-gold

              sm:mt-4
              sm:text-xs
              sm:tracking-[0.25em]
            "
          >
            {category.tagline}
          </span>

          {/* =================================================
              CATEGORY NAME
              ================================================= */}

          <h1
            className="
              mt-1
              font-display
              text-4xl

              sm:text-5xl

              md:mt-2
              md:text-6xl
            "
          >
            {category.name}
          </h1>

          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <p
            className="
              mt-2
              max-w-2xl

              text-sm
              leading-relaxed
              text-white/85

              sm:text-base

              md:mt-3
            "
          >
            {category.description}
          </p>
        </div>
      </section>

      {/* =====================================================
          CHILD CATEGORIES
          ===================================================== */}

      {hasChildren && (
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 font-display text-2xl md:text-3xl">
              {hasProducts
                ? "Sub-Collections"
                : "Collections"}
            </h2>

            <div
              className="
                grid
                grid-cols-2
                gap-3

                sm:gap-5

                md:grid-cols-3
                md:gap-6

                lg:grid-cols-4
              "
            >
              {children.map((child, i) => (
                <motion.article
                  key={child.slug}
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-60px",
                  }}
                  transition={{
                    duration: 0.5,
                    delay: (i % 4) * 0.05,
                  }}
                  className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    transition-all
                    duration-500
                    hover:shadow-2xl
                  "
                >
                  <Link
                    to={`${getCategoryUrl(
                      category
                    )}/${child.slug}`}
                    className="block"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={child.image}
                        alt={child.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-110
                        "
                        loading="lazy"
                        width={800}
                        height={600}
                      />
                    </div>

                    <div className="p-3 sm:p-5 md:p-6">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div
                            className="
                              truncate
                              text-[10px]
                              uppercase
                              tracking-widest
                              text-gold

                              sm:text-[11px]
                            "
                          >
                            {child.tagline}
                          </div>

                          <h3
                            className="
                              mt-1
                              truncate
                              font-display
                              text-base
                              transition-colors
                              group-hover:text-brand

                              sm:text-xl

                              md:text-2xl
                            "
                          >
                            {child.name}
                          </h3>
                        </div>

                        {child.products.length > 0 && (
                          <span
                            className="
                              hidden
                              shrink-0
                              whitespace-nowrap
                              rounded-full
                              bg-brand/10
                              px-2.5
                              py-1
                              text-xs
                              text-brand

                              sm:inline-flex
                            "
                          >
                            {child.products.length}
                          </span>
                        )}
                      </div>

                      <p
                        className="
                          mt-2
                          hidden
                          line-clamp-2
                          text-sm
                          text-muted-foreground

                          md:block
                        "
                      >
                        {child.description}
                      </p>

                      <div
                        className="
                          mt-3
                          inline-flex
                          items-center
                          gap-1
                          text-xs
                          font-medium
                          text-brand
                          transition

                          group-hover:text-gold

                          sm:text-sm

                          md:mt-5
                        "
                      >
                        View

                        <ArrowRight
                          className="
                            h-3.5
                            w-3.5
                            transition
                            group-hover:translate-x-1

                            sm:h-4
                            sm:w-4
                          "
                        />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          PRODUCTS TOOLBAR
          ===================================================== */}

      {hasProducts && (
        <>
          <section
            className="
              sticky
              top-16
              z-20
              border-b
              border-border
              bg-background

              md:top-20
            "
          >
            <div
              className="
                mx-auto
                grid
                max-w-7xl
                grid-cols-[minmax(0,1fr)_auto]
                items-center
                gap-3
                px-4
                py-4

                sm:px-6

                lg:px-8
              "
            >
              <div
                className="
                  min-w-0
                  truncate
                  text-sm
                  text-muted-foreground
                "
              >
                {hasChildren && (
                  <span className="mr-2 font-medium text-foreground">
                    {category.name} Products
                  </span>
                )}

                <span className="font-medium text-foreground">
                  {products.length}
                </span>{" "}
                product
                {products.length !== 1
                  ? "s"
                  : ""}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <label className="hidden text-xs text-muted-foreground sm:block">
                  Sort
                </label>

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(
                      e.target.value as Sort
                    )
                  }
                  className="
                    rounded-full
                    border
                    border-border
                    bg-card
                    px-3
                    py-2
                    text-sm
                    focus:border-brand
                    focus:outline-none
                  "
                >
                  <option value="featured">
                    Featured
                  </option>

                  <option value="priceAsc">
                    Price: Low → High
                  </option>

                  <option value="priceDesc">
                    Price: High → Low
                  </option>

                  <option value="name">
                    Alphabetical
                  </option>
                </select>

                <div
                  className="
                    hidden
                    overflow-hidden
                    rounded-full
                    border
                    border-border

                    md:inline-flex
                  "
                >
                  <button
                    aria-label="Grid view"
                    onClick={() =>
                      setView("grid")
                    }
                    className={`p-2 ${view === "grid"
                        ? "bg-brand text-white"
                        : "text-muted-foreground hover:bg-muted"
                      }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>

                  <button
                    aria-label="List view"
                    onClick={() =>
                      setView("list")
                    }
                    className={`p-2 ${view === "list"
                        ? "bg-brand text-white"
                        : "text-muted-foreground hover:bg-muted"
                      }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              PRODUCTS GRID / LIST
              ================================================= */}

          <section
            className={
              hasChildren
                ? "border-t border-border py-10 md:py-14"
                : "py-12 md:py-16"
            }
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {hasChildren && (
                <h2 className="mb-6 font-display text-2xl md:text-3xl">
                  Products in {category.name}
                </h2>
              )}

              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
                    : "space-y-4"
                }
              >
                {products.map((p, i) => (
                  <motion.article
                    key={p.slug}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.06,
                    }}
                    className={
                      view === "grid"
                        ? "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-2xl"
                        : "group grid grid-cols-[140px_1fr] overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg sm:grid-cols-[200px_1fr]"
                    }
                  >
                    <WishlistButton
                      className="absolute right-2 top-2 z-10"
                      item={{
                        id: `${category.slug}/${p.slug}`,
                        code: p.code,
                        name: p.name,
                        price: p.price,
                        image: p.image,
                        categorySlug:
                          category.slug,
                        productSlug: p.slug,
                        url: getProductUrl(
                          category,
                          p
                        ),
                      }}
                    />

                    <Link
                      to={getProductUrl(
                        category,
                        p
                      )}
                      className={
                        view === "grid"
                          ? "flex flex-1 flex-col"
                          : "contents"
                      }
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          width={800}
                          height={800}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-110
                          "
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-3 sm:p-4 md:p-5">
                        <div className="text-[10px] uppercase tracking-widest text-gold sm:text-[11px]">
                          Code {p.code}
                        </div>

                        <h3
                          className="
                            mt-1
                            line-clamp-2
                            font-display
                            text-sm
                            transition
                            group-hover:text-brand

                            sm:text-base

                            md:text-lg
                          "
                        >
                          {p.name}
                        </h3>

                        <p
                          className="
                            mt-1
                            hidden
                            line-clamp-2
                            text-sm
                            text-muted-foreground

                            md:block
                          "
                        >
                          {p.short}
                        </p>

                        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                          <span className="font-display text-base text-brand sm:text-lg md:text-xl">
                            {formatINR(p.price)}
                          </span>

                          <span className="hidden text-xs text-brand transition group-hover:text-gold sm:inline">
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

      {/* =====================================================
          COMING SOON
          ===================================================== */}

      {!hasChildren && !hasProducts && (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-6 text-5xl">
              🪵
            </div>

            <h2 className="font-display text-3xl md:text-4xl">
              Products Coming Soon
            </h2>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              We're crafting something
              beautiful for this collection.
              Check back soon or explore our
              other collections in the
              meantime.
            </p>

            <Link
              to="/collections"
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-brand
                px-6
                py-3
                font-medium
                text-white
                transition
                hover:bg-brand-hover
              "
            >
              Explore Collections

              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}
    </PageTransition>
  );
}