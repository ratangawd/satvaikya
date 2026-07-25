import { useEffect, useMemo, useState } from "react";
import { getStoreCategory } from "@/services/store.service";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, LayoutGrid, List } from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import WishlistButton from "@/components/WishlistButton";
import NotFound from "./NotFound";
import { formatINR } from "@/contexts/CartContext";

type Sort = "featured" | "priceAsc" | "priceDesc" | "name";

export default function CategoryPage() {
  const { categorySlug = "" } = useParams();

  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<Sort>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    async function loadCategory() {
      try {
        const data = await getStoreCategory(categorySlug);

        setCategory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCategory();
  }, [categorySlug]);

  const products = useMemo(() => {
    if (!category) return [];
    const arr = [...category.products];
    if (sort === "priceAsc") arr.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") arr.sort((a, b) => b.price - a.price);
    if (sort === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [category, sort]);

  const children = category?.children ?? [];

  if (loading) {
    return (
      <PageTransition>
        <div className="pt-40 text-center">
          Loading...
        </div>
      </PageTransition>
    );
  }

  if (!category) {
    return <NotFound />;
  }
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
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Collections", item: "/collections" },
            { "@type": "ListItem", position: 3, name: category.name, item: `/collections/${category.slug}` },
          ],
        }}
      />

      {/* BANNER */}
      <section className="relative pt-24 h-[52vh] min-h-[400px] flex items-end overflow-hidden">
        <img src={category.image} alt={category.name} className="absolute inset-0 h-full w-full object-cover" width={1920} height={800} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-10 md:pb-16 text-white">
          <nav className="text-xs text-white/70 flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/collections" className="hover:text-gold">Collections</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{category.name}</span>
          </nav>
          <span className="mt-4 inline-block text-xs uppercase tracking-[0.25em] text-gold">{category.tagline}</span>
          <h1 className="mt-2 font-display text-4xl md:text-6xl">{category.name}</h1>
          <p className="mt-3 text-white/85 max-w-2xl">{category.description}</p>
        </div>
      </section>

      {/* SUB CATEGORIES */}
      {children.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 font-display text-3xl">Browse Categories</h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {children.map((child: any) => (
                <Link
                  key={child.id}
                  to={`/collections/${child.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-xl"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={child.image}
                      alt={child.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-lg">{child.name}</h3>

                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {child.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {products.length > 0 && (
        <>
          {/* TOOLBAR */}
          <section className="border-b border-border bg-background sticky top-16 md:top-20 z-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center">
              <div className="text-sm text-muted-foreground min-w-0 truncate">
                <span className="text-foreground font-medium">{products.length}</span> products
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
                  <button aria-label="Grid view" onClick={() => setView("grid")} className={`p-2 ${view === "grid" ? "bg-brand text-white" : "text-muted-foreground hover:bg-muted"}`}>
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button aria-label="List view" onClick={() => setView("list")} className={`p-2 ${view === "list" ? "bg-brand text-white" : "text-muted-foreground hover:bg-muted"}`}>
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {products.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={view === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6" : "space-y-4"}>
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
                    }}
                  />
                  <Link to={`/collections/${category.slug}/${p.slug}`} className={view === "grid" ? "block flex-1 flex flex-col" : "contents"}>
                    <div className="aspect-square overflow-hidden">
                      <img src={p.image} alt={p.name} loading="lazy" width={800} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
                      <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gold">Code {p.code}</div>
                      <h3 className="mt-1 font-display text-sm sm:text-base md:text-lg group-hover:text-brand transition line-clamp-2">{p.name}</h3>
                      <p className="mt-1 hidden md:block text-sm text-muted-foreground line-clamp-2">{p.short}</p>
                      <div className="mt-auto pt-3 flex items-center justify-between gap-2">
                        <span className="font-display text-base sm:text-lg md:text-xl text-brand">{formatINR(p.price)}</span>
                        <span className="hidden sm:inline text-xs text-brand group-hover:text-gold transition">View →</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {children.length === 0 && products.length === 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="font-display text-3xl">Products Coming Soon</h2>

            <p className="mt-3 text-muted-foreground">
              Products for this category will be available soon.
            </p>
          </div>
        </section>
      )}
    </PageTransition>
  );
}