import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import { useEffect, useState } from "react";
import { getStoreCategories } from "@/services/store.service";

export default function Collections() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getStoreCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);
  if (loading) {
    return (
      <PageTransition>
        <div className="pt-40 text-center">
          Loading...
        </div>
      </PageTransition>
    );
  }
  return (
    <PageTransition>
      <SEO
        title="Collections | SatvAikya Handcrafted Wooden Decor"
        description="Explore SatvAikya's full collection of handcrafted wooden decor — sacred art, pooja decor, trays, home decor, DIY kits, kids collection, return gifts, wall art, corporate gifts and money banks."
        path="/collections"
      />
      <section className="pt-28 pb-8 md:pt-40 md:pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">The Collections</span>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-6xl">Handcrafted with intent</h1>
          <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Ten thoughtfully curated collections — each one designed, prototyped and manufactured in our own studio.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {categories.map((c, i) => (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.05 }}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <Link to={`/collections/${c.slug}`} className="block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
                <div className="p-3 sm:p-5 md:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gold truncate">{c.tagline}</div>
                      <h2 className="mt-1 font-display text-base sm:text-xl md:text-2xl group-hover:text-brand transition-colors truncate">{c.name}</h2>
                    </div>
                    <span className="hidden sm:inline-flex text-xs bg-brand/10 text-brand rounded-full px-2.5 py-1 whitespace-nowrap shrink-0">
                      {c.products.length}
                    </span>
                  </div>
                  <p className="mt-2 hidden md:block text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                  <div className="mt-3 md:mt-5 inline-flex items-center gap-1 text-xs sm:text-sm text-brand group-hover:text-gold transition font-medium">
                    View <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}