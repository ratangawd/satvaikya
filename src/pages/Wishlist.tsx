import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import { useWishlist, type WishlistItem } from "@/contexts/WishlistContext";
import { formatINR, useCart } from "@/contexts/CartContext";

/**
 * Prefer the pre-computed `url` (correct at any depth). Only falls back to
 * the old 2-segment reconstruction for items saved before `url` existed —
 * those may still 404 for subcategory products until re-saved.
 */
function itemHref(p: WishlistItem) {
  return p.url ?? `/collections/${p.categorySlug}/${p.productSlug}`;
}

export default function Wishlist() {
  const { items, remove, clear } = useWishlist();
  const { addItem } = useCart();

  return (
    <PageTransition>
      <SEO
        title="Your Wishlist | SatvAikya"
        description="Your saved SatvAikya pieces — return anytime to add them to your cart."
        path="/wishlist"
      />

      <section className="pt-28 md:pt-36 pb-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">Saved for later</span>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-6xl">Your wishlist</h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            {items.length > 0
              ? "Your favorite SatvAikya pieces, in one place."
              : "You haven't saved anything yet — start exploring the collections."}
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#97B002]/10 text-[#97B002] mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <Link
                  to="/collections"
                  className="btn-luxury inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium"
                >
                  Browse Collections <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">{items.length}</span> item{items.length === 1 ? "" : "s"}
                </div>
                <button
                  onClick={clear}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-[#97B002] inline-flex items-center gap-1"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Clear all
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
                {items.map((p, i) => (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all"
                  >
                    <Link to={itemHref(p)} className="block">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          width={600}
                          height={600}
                        />
                      </div>
                    </Link>
                    <div className="p-3 sm:p-4">
                      <div className="text-[10px] uppercase tracking-widest text-gold">Code {p.code}</div>
                      <Link
                        to={itemHref(p)}
                        className="mt-1 block font-display text-sm sm:text-base line-clamp-2 group-hover:text-brand transition"
                      >
                        {p.name}
                      </Link>
                      <div className="mt-2 font-display text-base sm:text-lg text-brand">
                        {formatINR(p.price)}
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() =>
                            addItem({
                              id: p.id,
                              code: p.code,
                              name: p.name,
                              price: p.price,
                              image: p.image,
                              categorySlug: p.categorySlug,
                              productSlug: p.productSlug,
                              url: p.url,
                            })
                          }
                          className="flex-1 inline-flex items-center justify-center gap-1 px-2 sm:px-3 py-2 rounded-full bg-[#97B002] text-white text-xs sm:text-sm font-medium hover:opacity-90 transition"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Add</span>
                        </button>
                        <button
                          onClick={() => remove(p.id)}
                          aria-label="Remove from wishlist"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-[#97B002] hover:border-[#97B002] transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </PageTransition>
  );
}