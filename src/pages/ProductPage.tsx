import { useEffect, useMemo, useState } from "react";
import { getStoreProduct } from "@/services/store.service"; import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Minus, Plus, ShoppingBag, Star, Truck, ShieldCheck, MessageCircle, Heart } from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import NotFound from "./NotFound";
import { formatINR, useCart, WHATSAPP_NUMBER } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

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

export default function ProductPage() {
  const { categorySlug = "", productSlug = "" } = useParams();

  const [category, setCategory] = useState<any>(null);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const { addItem } = useCart();
  const { has: wishHas, toggle: wishToggle } = useWishlist();

  const images = useMemo(() => (product ? [product.image, product.image, product.image] : []), [product]);
  const related = useMemo(
    () =>
      (category?.products ?? []).filter(
        (p: (typeof category.products)[number]) => p.slug !== product?.slug
      ),
    [category, product]
  );

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getStoreProduct(
          categorySlug,
          productSlug
        );

        if (data) {
          setCategory(data.category);
          setProduct(data.product);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [categorySlug, productSlug]);

  if (loading) {
    return (
      <PageTransition>
        <div className="pt-40 text-center">
          Loading...
        </div>
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
  };
  const inWishlist = wishHas(wishItem.id);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi SatvAikya, I'm interested in ${product.name} (${product.code}).`,
  )}`;

  return (
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

      <section className="pt-24 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-muted-foreground flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/collections" className="hover:text-brand">Collections</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={`/collections/${category.slug}`} className="hover:text-brand">{category.name}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground truncate">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          {/* GALLERY */}
          <div>
            <motion.div
              key={activeImg}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="aspect-square rounded-2xl overflow-hidden bg-card border border-border"
            >
              <img src={images[activeImg]} alt={product.name} className="h-full w-full object-cover" width={1024} height={1024} />
            </motion.div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition ${activeImg === i ? "border-brand" : "border-border hover:border-gold"}`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} loading="lazy" width={300} height={300} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-gold">{category.name} · Code {product.code}</div>
            <h1 className="mt-2 font-display text-3xl md:text-5xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
              <span className="text-sm text-muted-foreground">4.9 · 128 reviews</span>
            </div>
            <div className="mt-5 font-display text-4xl text-brand">{formatINR(product.price)}</div>
            <p className="mt-4 text-muted-foreground leading-relaxed">{product.short}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center border border-border rounded-full">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 inline-flex items-center justify-center hover:bg-muted rounded-l-full" aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="h-11 w-11 inline-flex items-center justify-center hover:bg-muted rounded-r-full" aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
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
                    },
                    qty,
                  )
                }
                className="btn-luxury inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
              <a href={whatsappHref} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border font-medium hover:bg-muted transition">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <button
                onClick={() => wishToggle(wishItem)}
                aria-pressed={inWishlist}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border font-medium transition ${
                  inWishlist
                    ? "border-brand text-brand bg-brand/5"
                    : "border-border hover:bg-muted"
                }`}
              >
                <Heart className={`h-4 w-4 ${inWishlist ? "fill-brand" : ""}`} />
                {inWishlist ? "Saved" : "Wishlist"}
              </button>
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
              <h3 className="mt-8 font-display text-xl">Specifications</h3>
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {product.specs.map((s: any) => (
                  <div key={s.label} className="flex justify-between border-b border-border py-2 gap-3">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="text-foreground font-medium text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
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
      </section>

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
              {related.map((p: any) => (
                <Link key={p.slug} to={`/collections/${category.slug}/${p.slug}`} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all flex flex-col">
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
    </PageTransition>
  );
}