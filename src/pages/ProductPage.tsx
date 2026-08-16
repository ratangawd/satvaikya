/**
 * ProductPage.tsx
 *
 * Breadcrumb now uses category.ancestors to show the full path, e.g.:
 *   Home › Collections › Furniture › Office Chairs › Executive Chair
 *
 * No other logic changed.
 */
import { useEffect, useMemo, useState } from "react";
import { resolveStorePath, getCategoryUrl, getProductUrl } from "@/services/store.service";
import type { StoreCategory, StoreProduct } from "@/services/store.service";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight, Minus, Plus, ShoppingBag, Star, Truck, ShieldCheck, MessageCircle, Heart, Instagram,
  Youtube,
} from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import NotFound from "./NotFound";
import { formatINR, useCart, WHATSAPP_NUMBER } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import PaperTexture from "@/components/decorative/PaperTexture";
import DecorativeLayer from "@/components/decorative/DecorativeLayer";
import EnquiryModal from "@/components/enquiry/EnquiryModal";

const reviews = [
  { name: "Meera K.", rating: 5, text: "Beautiful piece, arrived carefully packed. The finish exceeded my expectations." },
  { name: "Arun R.", rating: 5, text: "Exactly as pictured. It's clear a lot of care went into this." },
  { name: "Neha S.", rating: 4, text: "Lovely craftsmanship. Delivery was a couple of days later than expected but worth the wait." },
];

const faqs = [
  { q: "Is this piece handmade?", a: "Yes — every product from SatvAikya is designed and finished by hand in our own studio." },
  { q: "How long does shipping take?", a: "We dispatch within 3–5 business days. Pan-India delivery typically takes 5–8 business days after dispatch." },
  { q: "Can I return the item?", a: "We accept returns within 7 days of delivery for unused items in original packaging. Please contact us before returning." },
  { q: "Can I customise it?", a: "For quantities of 25+, we offer custom finishes and personalisation. Please reach out on WhatsApp with your requirements." },
];

interface ProductPageProps {
  /**
   * Resolved category/product, passed down by CategoryOrProductResolver
   * (the normal path). If omitted, this component falls back to resolving
   * the current URL itself via the same resolveStorePath() used by the
   * resolver, so it still works if ever mounted directly.
   */
  category?: StoreCategory;
  product?: StoreProduct;
}

export default function ProductPage({
  category: categoryProp,
  product: productProp,
}: ProductPageProps) {
  const params = useParams();
  const fallbackSegments = (params["*"] ?? "").split("/").filter(Boolean);

  const [category, setCategory] = useState<StoreCategory | null>(categoryProp ?? null);
  const [product, setProduct] = useState<StoreProduct | null>(productProp ?? null);
  const [loading, setLoading] = useState(!(categoryProp && productProp));

  const [qty, setQty] = useState(5);
  const [activeImg, setActiveImg] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const { addItem } = useCart();
  const { has: wishHas, toggle: wishToggle } = useWishlist();

  const images = useMemo(
    () =>
      product
        ? product.images.length > 0
          ? product.images
          : [product.image]
        : [],
    [product]
  );
  const related = useMemo(
    () =>
      (category?.products ?? []).filter(
        (p) => p.slug !== product?.slug
      ),
    [category, product]
  );

  useEffect(() => {
    if (categoryProp && productProp) {
      setCategory(categoryProp);
      setProduct(productProp);
      setLoading(false);
      return;
    }

    setLoading(true);

    async function loadProduct() {
      try {
        const resolved = await resolveStorePath(fallbackSegments);
        if (resolved?.type === "product") {
          setCategory(resolved.category);
          setProduct(resolved.product);
        } else {
          setCategory(null);
          setProduct(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [categoryProp, productProp, fallbackSegments.join("/")]);

  if (loading) {
    return (
      <PageTransition>
        <div className="pt-40 text-center text-muted-foreground">Loading…</div>
      </PageTransition>
    );
  }

  if (!category || !product) {
    return <NotFound />;
  }

  const wishItem = {
    id: `${category.slug}/${product.slug}`,
    code: product.code,
    name: product.name,
    price: product.price,
    image: product.image,
    categorySlug: category.slug,
    productSlug: product.slug,
    url: getProductUrl(category, product),
  };
  const inWishlist = wishHas(wishItem.id);

  const productCodeText = product.code?.trim() ? ` (${product.code.trim()})` : "";
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi SatvAikya, I'm interested in ${product.name}${productCodeText}.`,
  )}`;

  return (
    <div className="relative isolate overflow-hidden">
      <PaperTexture />
      <PageTransition>
        <SEO
          title={`${product.name} | SatvAikya`}
        description={product.short}
        path={`/collections/${category.slug}/${product.slug}`}
        image={product.image}
        type="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          sku: product.code,
          description: product.long,
          image: product.image,
          brand: { "@type": "Brand", name: "SatvAikya" },
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: product.price,
            availability: "https://schema.org/InStock",
          },
        }}
      />

      <section className="pt-4 md:pt-6 pb-4 md:pb-6 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── Breadcrumb: full ancestor path ── */}
          <nav className="text-xs text-muted-foreground flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-brand transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link to="/collections" className="hover:text-brand transition-colors">Collections</Link>

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
                    className="hover:text-brand transition-colors"
                  >
                    {ancestor.name}
                  </Link>
                </>
              );
            })}

            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link to={getCategoryUrl(category)} className="hover:text-brand transition-colors">
              {category.name}
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-foreground truncate">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="pb-16">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
    {/* GALLERY */}
    <div>
      <div className="relative">
        <motion.div
          key={activeImg}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="aspect-square rounded-2xl border border-border bg-white flex items-center justify-center p-4"
        >
          <img
            src={images[activeImg]}
            alt={product.name}
            className="block max-h-full max-w-full object-contain"
            loading="eager"
            decoding="async"
            draggable={false}
            width={1600}
            height={1600}
          />
        </motion.div>


              <button
                onClick={() => wishToggle(wishItem)}
                aria-pressed={inWishlist}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                className={`absolute top-3 right-3 z-10 h-10 w-10 inline-flex items-center justify-center rounded-full backdrop-blur-md shadow-sm transition-all active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                  inWishlist
                    ? "bg-brand text-white"
                    : "bg-white/80 text-foreground hover:bg-white"
                }`}
              >
                <Heart className={`h-4.5 w-4.5 ${inWishlist ? "fill-white" : ""}`} />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition ${activeImg === i ? "border-brand" : "border-border hover:border-gold"}`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} loading="lazy" width={300} height={300} className="h-full w-full object-contain bg-white" />
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-gold">{category.name} · Code {product.code}</div>
            <h1 className="mt-2 font-display text-3xl md:text-5xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2">
              {/* {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))} */}
              {/* <span className="text-sm text-muted-foreground">4.9 · 128 reviews</span> */}
            </div>
            <div className="mt-5 font-display text-4xl text-brand">{formatINR(product.price)}</div>
            <p className="mt-4 text-muted-foreground leading-relaxed">{product.short}</p>

{/* ACTION BUTTONS */}
<div className="mt-8 space-y-3">
  {/* Quantity selector */}
  <div className="flex items-center justify-between gap-3">
    <span className="text-sm font-medium text-muted-foreground">Quantity</span>
    <div className="inline-flex items-center border border-border rounded-full h-11 shrink-0">
      <button
        onClick={() => setQty((q) => Math.max(5, q - 5))}
        disabled={qty <= 5}
        className="h-11 w-11 inline-flex items-center justify-center rounded-l-full hover:bg-muted active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-10 text-center text-sm font-medium tabular-nums">{qty}</span>
      <button
        onClick={() => setQty((q) => q + 5)}
        className="h-11 w-11 inline-flex items-center justify-center rounded-r-full hover:bg-muted active:scale-95 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  </div>

              {/* PRIMARY CTA — Add to Cart (+ Amazon side-by-side when available) */}
              <div className={`grid gap-3 ${product.amazonEnabled && product.amazonUrl ? "grid-cols-2" : "grid-cols-1"}`}>
                <button
                  onClick={() =>
                    addItem(
                      {
                        id: `${category.slug}/${product.slug}`,
                        code: product.code,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        categorySlug: category.slug,
                        productSlug: product.slug,
                        url: getProductUrl(category, product),
                      },
                      qty,
                    )
                  }
                  className="btn-luxury h-13 sm:h-14 inline-flex items-center justify-center gap-2 px-3 sm:px-6 rounded-full font-medium text-xs sm:text-base shadow-sm hover:shadow-md active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <ShoppingBag className="h-4.5 w-4.5 shrink-0" />
                  <span className="truncate">Add to Cart</span>
                </button>

                {product.amazonEnabled && product.amazonUrl && (
                  <a
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-13 sm:h-14 inline-flex items-center justify-center gap-2 px-3 sm:px-6 rounded-full bg-[#FF9900] text-white font-medium text-xs sm:text-base hover:bg-[#E68A00] active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] focus-visible:ring-offset-2"
                  >
                    <ShoppingBag className="h-4 w-4 shrink-0" />
                    <span className="truncate">Buy on Amazon</span>
                  </a>
                )}
            </div>

  {/* COMMUNICATION — Enquiry + WhatsApp (equal 2-col) */}
  <div className="grid grid-cols-2 gap-3 pt-1">
    <button
      onClick={() => setEnquiryOpen(true)}
      className="h-12 inline-flex items-center justify-center gap-2 px-3 sm:px-5 rounded-full bg-brand text-white font-medium text-xs sm:text-sm hover:bg-brand-hover active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      <span className="truncate">Send Enquiry</span>
    </button>

    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="h-12 inline-flex items-center justify-center gap-2 px-3 sm:px-5 rounded-full border border-border font-medium text-xs sm:text-sm hover:bg-muted active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-4 w-4 shrink-0" />
      <span className="truncate">WhatsApp</span>
    </a>
  </div>

  {/* SOCIAL SECTION — supporting actions, visually separated */}
  {(product.instagramUrl || product.youtubeUrl) && (
    <div className="pt-5 mt-1 border-t border-border">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
        See this product in action
      </div>
      <div className="flex gap-3">
        {product.instagramUrl && (
          <a
            href={product.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 flex-1 inline-flex items-center justify-center gap-2 px-4 rounded-full border border-transparent bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <Instagram className="h-4 w-4 shrink-0" />
            <span className="truncate">Instagram</span>
          </a>
        )}
        {product.youtubeUrl && (
          <a
            href={product.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 flex-1 inline-flex items-center justify-center gap-2 px-4 rounded-full border border-transparent bg-[#FF0033] text-white text-sm font-medium hover:bg-[#e6002d] active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0033] focus-visible:ring-offset-2"
          >
            <Youtube className="h-4 w-4 shrink-0" />
            <span className="truncate">YouTube</span>
          </a>
        )}
      </div>
    </div>
  )}
</div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                <Truck className="h-4 w-4 mt-0.5 text-brand shrink-0" />
                <div>
                  <div className="font-medium">Pan-India shipping</div>
                  <div className="text-muted-foreground text-xs">Ships in 3–5 business days.</div>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                <ShieldCheck className="h-4 w-4 mt-0.5 text-brand shrink-0" />
                <div>
                  <div className="font-medium">Made with love</div>
                  <div className="text-muted-foreground text-xs">Quality checked, hand packed.</div>
                </div>
              </div>
            </div>

            {/* Long description + Specs */}
            <div className="mt-10">
              <h2 className="font-display text-2xl">About this piece</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{product.long}</p>
              {/* <h3 className="mt-8 font-display text-xl">Specifications</h3>
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex justify-between border-b border-border py-2 gap-3">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="text-foreground font-medium text-right">{s.value}</dd>
                  </div>
                ))}
              </dl> */}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS
      <section className="py-16 bg-[oklch(0.95_0.01_85)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl">Customer reviews</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-3 text-muted-foreground leading-relaxed">"{r.text}"</p>
                <div className="mt-4 font-medium">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-center">Frequently asked</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-border bg-card p-5 open:shadow-md transition">
                <summary className="cursor-pointer list-none flex items-center justify-between font-medium">
                  {f.q}
                  <ChevronRight className="h-4 w-4 group-open:rotate-90 transition" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="py-16 bg-[oklch(0.95_0.01_85)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl md:text-4xl">You may also love</h2>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
              {related.map((p) => (
                <Link key={p.slug} to={getProductUrl(category, p)} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all flex flex-col">
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} loading="lazy" width={600} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gold">Code {p.code}</div>
                    <h3 className="mt-1 font-display text-sm sm:text-base md:text-lg group-hover:text-brand transition line-clamp-2">{p.name}</h3>
                    <div className="mt-auto pt-2 font-display text-base sm:text-lg text-brand">{formatINR(p.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

        <EnquiryModal
          open={enquiryOpen}
          onClose={() => setEnquiryOpen(false)}
          product={product}
        />
      </PageTransition>
    </div>
  );
}