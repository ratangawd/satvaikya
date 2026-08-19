/**
 * ProductPage.tsx
 *
 * Breadcrumb uses category.ancestors to show the full path.
 *
 * Gallery:
 * - Large main product image
 * - Maximum 4 thumbnails visible at a time
 * - Previous / next arrows
 * - Mobile swipe support
 * - Supports any number of product images
 */

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  resolveStorePath,
  getCategoryUrl,
  getProductUrl,
} from "@/services/store.service";
import type { StoreCategory, StoreProduct } from "@/services/store.service";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  MessageCircle,
  Heart,
  Instagram,
  Youtube,
} from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import NotFound from "./NotFound";
import {
  formatINR,
  useCart,
  WHATSAPP_NUMBER,
} from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import PaperTexture from "@/components/decorative/PaperTexture";
import DecorativeLayer from "@/components/decorative/DecorativeLayer";
import EnquiryModal from "@/components/enquiry/EnquiryModal";

const reviews = [
  {
    name: "Meera K.",
    rating: 5,
    text: "Beautiful piece, arrived carefully packed. The finish exceeded my expectations.",
  },
  {
    name: "Arun R.",
    rating: 5,
    text: "Exactly as pictured. It's clear a lot of care went into this.",
  },
  {
    name: "Neha S.",
    rating: 4,
    text: "Lovely craftsmanship. Delivery was a couple of days later than expected but worth the wait.",
  },
];

const faqs = [
  {
    q: "Is this piece handmade?",
    a: "Yes — every product from SatvAikya is designed and finished by hand in our own studio.",
  },
  {
    q: "How long does shipping take?",
    a: "We dispatch within 3–5 business days. Pan-India delivery typically takes 5–8 business days after dispatch.",
  },
  {
    q: "Can I return the item?",
    a: "We accept returns within 7 days of delivery for unused items in original packaging. Please contact us before returning.",
  },
  {
    q: "Can I customise it?",
    a: "For quantities of 25+, we offer custom finishes and personalisation. Please reach out on WhatsApp with your requirements.",
  },
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

  const fallbackSegments = (params["*"] ?? "")
    .split("/")
    .filter(Boolean);

  const [category, setCategory] = useState<StoreCategory | null>(
    categoryProp ?? null
  );

  const [product, setProduct] = useState<StoreProduct | null>(
    productProp ?? null
  );

  const [loading, setLoading] = useState(
    !(categoryProp && productProp)
  );

  const [qty, setQty] = useState(5);

  // Main image currently selected
  const [activeImg, setActiveImg] = useState(0);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);

  // First thumbnail displayed in the 4-thumbnail window
  const [thumbnailStart, setThumbnailStart] = useState(0);

  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const { addItem } = useCart();
  const { has: wishHas, toggle: wishToggle } = useWishlist();

  /**
   * Product gallery images.
   *
   * Uses product.images when available.
   * Falls back to product.image when images array is empty.
   */
  const images = useMemo(() => {
    if (!product) return [];

    const gallery =
      product.images && product.images.length > 0
        ? product.images
        : [];

    if (!product.image) {
      return gallery;
    }

    return [
      product.image,
      ...gallery.filter(
        (img) => img !== product.image
      ),
    ];
  }, [product]);

  const related = useMemo(
    () =>
      (category?.products ?? []).filter(
        (p) => p.slug !== product?.slug
      ),
    [category, product]
  );

  /**
   * Reset gallery position when product changes.
   */
  useEffect(() => {
    setActiveImg(0);
    setThumbnailStart(0);
  }, [product?.slug]);

  useEffect(() => {
    if (!imageViewerOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setImageViewerOpen(false);
      }

      if (event.key === "ArrowLeft") {
        goToPreviousImage();
      }

      if (event.key === "ArrowRight") {
        goToNextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [imageViewerOpen]);


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
  }, [
    categoryProp,
    productProp,
    fallbackSegments.join("/"),
  ]);

  if (loading) {
    return (
      <PageTransition>
        <div className="pt-40 text-center text-muted-foreground">
          Loading…
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
    url: getProductUrl(category, product),
  };

  const inWishlist = wishHas(wishItem.id);

  const productCodeText = product.code?.trim()
    ? ` (${product.code.trim()})`
    : "";

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi SatvAikya, I'm interested in ${product.name}${productCodeText}.`
  )}`;

  /**
   * Move to previous image.
   */
  const goToPreviousImage = () => {
    if (images.length <= 1) return;

    setActiveImg((current) => {
      const nextIndex =
        current === 0
          ? images.length - 1
          : current - 1;

      // Keep selected image visible in thumbnail window
      if (images.length > 4) {
        if (nextIndex === images.length - 1) {
          setThumbnailStart(images.length - 4);
        } else if (nextIndex < thumbnailStart) {
          setThumbnailStart(nextIndex);
        }
      }

      return nextIndex;
    });
  };

  /**
   * Go to Next Image
   */

  const goToNextImage = () => {
    if (images.length <= 1) return;

    setActiveImg((current) => {
      const nextIndex =
        current === images.length - 1
          ? 0
          : current + 1;

      // Keep selected image visible in thumbnail window
      if (images.length > 4) {
        if (nextIndex === 0) {
          setThumbnailStart(0);
        } else if (nextIndex >= thumbnailStart + 4) {
          setThumbnailStart(
            Math.min(nextIndex - 3, images.length - 4)
          );
        }
      }

      return nextIndex;
    });
  };

  /**
   * Thumbnail navigation.
   */
  const goToPreviousThumbnails = () => {
    setThumbnailStart((current) =>
      Math.max(0, current - 1)
    );
  };

  const goToNextThumbnails = () => {
    const maxStart = Math.max(0, images.length - 4);

    setThumbnailStart((current) =>
      Math.min(maxStart, current + 1)
    );
  };

  /**
   * Select a thumbnail.
   */
  const selectImage = (index: number) => {
    setActiveImg(index);
  };

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
            brand: {
              "@type": "Brand",
              name: "SatvAikya",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price,
              availability:
                "https://schema.org/InStock",
            },
          }}
        />

        {/* =========================================================
            BREADCRUMB
        ========================================================== */}
        <section className="pt-4 md:pt-6 pb-4 md:pb-6 relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-muted-foreground flex items-center gap-1 flex-wrap">
              <Link
                to="/"
                className="hover:text-brand transition-colors"
              >
                Home
              </Link>

              <ChevronRight className="h-3 w-3 shrink-0" />

              <Link
                to="/collections"
                className="hover:text-brand transition-colors"
              >
                Collections
              </Link>

              {category.ancestors.map((ancestor, idx) => {
                const ancestorPath = `/collections/${category.ancestors
                  .slice(0, idx + 1)
                  .map((a) => a.slug)
                  .join("/")}`;

                return (
                  <div
                    key={ancestor.slug}
                    className="flex items-center gap-1"
                  >
                    <ChevronRight className="h-3 w-3 shrink-0" />

                    <Link
                      to={ancestorPath}
                      className="hover:text-brand transition-colors"
                    >
                      {ancestor.name}
                    </Link>
                  </div>
                );
              })}

              <ChevronRight className="h-3 w-3 shrink-0" />

              <Link
                to={getCategoryUrl(category)}
                className="hover:text-brand transition-colors"
              >
                {category.name}
              </Link>

              <ChevronRight className="h-3 w-3 shrink-0" />

              <span className="text-foreground truncate">
                {product.name}
              </span>
            </nav>
          </div>
        </section>

        {/* =========================================================
            PRODUCT SECTION
        ========================================================== */}
        <section className="pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">

            {/* =====================================================
                GALLERY
            ====================================================== */}
            <div>
              <div
                className="relative touch-pan-y"
                onTouchStart={(e) => {
                  (
                    e.currentTarget as HTMLDivElement
                  ).dataset.touchStartX = String(
                    e.touches[0].clientX
                  );
                }}
                onTouchEnd={(e) => {
                  const startX = Number(
                    (
                      e.currentTarget as HTMLDivElement
                    ).dataset.touchStartX
                  );

                  const endX =
                    e.changedTouches[0].clientX;

                  const diff = startX - endX;

                  // Swipe threshold
                  if (
                    Math.abs(diff) > 50 &&
                    images.length > 1
                  ) {
                    if (diff > 0) {
                      goToNextImage();
                    } else {
                      goToPreviousImage();
                    }
                  }
                }}
              >
                {/* =================================================
                    MAIN IMAGE
                ================================================== */}
                <motion.div
                  key={activeImg}
                  initial={{
                    opacity: 0,
                    x: 12,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-transparent flex items-center justify-center p-0"
                >
                  <button
                    type="button"
                    onClick={() => setImageViewerOpen(true)}
                    aria-label="Open product image fullscreen"
                    className="absolute inset-0 w-full h-full cursor-zoom-in"
                  >
                    <img
                      src={images[activeImg]}
                      alt={product.name}
                      className="block h-full w-full object-contain select-none"
                      loading="eager"
                      decoding="async"
                      draggable={false}
                      width={1600}
                      height={1600}
                    />
                  </button>


                  {/* =============================================
                      WISHLIST
                  ============================================== */}
                  <button
                    type="button"
                    onClick={() =>
                      wishToggle(wishItem)
                    }
                    aria-pressed={inWishlist}
                    aria-label={
                      inWishlist
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    className={`absolute top-3 right-3 z-10 h-10 w-10 inline-flex items-center justify-center rounded-full backdrop-blur-md shadow-sm transition-all active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${inWishlist
                        ? "bg-brand text-white"
                        : "bg-white/80 text-foreground hover:bg-white"
                      }`}
                  >
                    <Heart
                      className={`h-4.5 w-4.5 ${inWishlist
                          ? "fill-white"
                          : ""
                        }`}
                    />
                  </button>
                </motion.div>
              </div>

              {/* ===================================================
                  THUMBNAIL GALLERY
              ==================================================== */}
              {images.length > 0 && (
                <div className="mt-4 relative">

                  {/* THUMBNAILS + ARROWS */}
                  <div className="flex items-center gap-2">

                    {/* LEFT THUMBNAIL ARROW */}
                    {images.length > 4 && (
                      <button
                        type="button"
                        onClick={
                          goToPreviousThumbnails
                        }
                        disabled={
                          thumbnailStart === 0
                        }
                        aria-label="Previous thumbnails"
                        className="
                          shrink-0
                          h-9
                          w-9
                          rounded-full
                          border
                          border-border
                          bg-white/90
                          inline-flex
                          items-center
                          justify-center
                          shadow-sm
                          transition-all
                          hover:bg-white
                          active:scale-90
                          disabled:opacity-30
                          disabled:cursor-not-allowed
                        "
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                    )}

                    {/* ===========================================
                        EXACTLY 4 THUMBNAILS VISIBLE
                    ============================================ */}
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="grid grid-cols-4 gap-2.5">
                        {images
                          .slice(
                            thumbnailStart,
                            thumbnailStart + 4
                          )
                          .map((img, visibleIndex) => {
                            const actualIndex =
                              thumbnailStart +
                              visibleIndex;

                            return (
                              <button
                                key={`${img}-${actualIndex}`}
                                type="button"
                                onClick={() =>
                                  selectImage(
                                    actualIndex
                                  )
                                }
                                aria-label={`View product image ${actualIndex + 1
                                  }`}
                                aria-current={
                                  activeImg ===
                                  actualIndex
                                }
                                className={`
                                  relative
                                  aspect-square
                                  rounded-lg
                                  overflow-hidden
                                  border-2
                                  bg-transparent
                                  transition-all
                                  duration-200
                                  focus-visible:outline-none
                                  focus-visible:ring-2
                                  focus-visible:ring-brand
                                  focus-visible:ring-offset-2
                                  ${activeImg ===
                                    actualIndex
                                    ? "border-brand shadow-sm"
                                    : "border-border hover:border-gold"
                                  }
                                `}
                              >
                                <img
                                  src={img}
                                  alt={`${product.name} view ${actualIndex + 1
                                    }`}
                                  loading="lazy"
                                  decoding="async"
                                  draggable={false}
                                  width={300}
                                  height={300}
                                  className="h-full w-full object-contain bg-transparent select-none"
                                />

                                {/* ACTIVE INDICATOR */}
                                {activeImg ===
                                  actualIndex && (
                                    <span
                                      className="
                                      absolute
                                      inset-x-0
                                      bottom-0
                                      h-0.5
                                      bg-brand
                                    "
                                    />
                                  )}
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    {/* RIGHT THUMBNAIL ARROW */}
                    {images.length > 4 && (
                      <button
                        type="button"
                        onClick={
                          goToNextThumbnails
                        }
                        disabled={
                          thumbnailStart >=
                          images.length - 4
                        }
                        aria-label="Next thumbnails"
                        className="
                          shrink-0
                          h-9
                          w-9
                          rounded-full
                          border
                          border-border
                          bg-white/90
                          inline-flex
                          items-center
                          justify-center
                          shadow-sm
                          transition-all
                          hover:bg-white
                          active:scale-90
                          disabled:opacity-30
                          disabled:cursor-not-allowed
                        "
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* IMAGE COUNT */}
                  {images.length > 1 && (
                    <div className="mt-2 text-center text-[11px] text-muted-foreground">
                      {activeImg + 1} / {images.length}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* =====================================================
                DETAILS
            ====================================================== */}
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-gold">
                {category.name} · Code {product.code}
              </div>

              <h1 className="mt-2 font-display text-3xl md:text-5xl">
                {product.name}
              </h1>

              <div className="mt-3 flex items-center gap-2">
                {/* Reviews intentionally disabled */}
              </div>

              <div className="mt-5 font-display text-4xl text-brand">
                {formatINR(product.price)}
              </div>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                {product.short}
              </p>

              {/* =================================================
                  ACTION BUTTONS
              ================================================== */}
              <div className="mt-8 space-y-3">

                {/* QUANTITY */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Quantity
                  </span>

                  <div className="inline-flex items-center border border-border rounded-full h-11 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setQty((q) =>
                          Math.max(5, q - 5)
                        )
                      }
                      disabled={qty <= 5}
                      className="h-11 w-11 inline-flex items-center justify-center rounded-l-full hover:bg-muted active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="w-10 text-center text-sm font-medium tabular-nums">
                      {qty}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setQty((q) => q + 5)
                      }
                      className="h-11 w-11 inline-flex items-center justify-center rounded-r-full hover:bg-muted active:scale-95 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* =================================================
                    ADD TO CART / AMAZON
                ================================================== */}
                <div
                  className={`grid gap-3 ${product.amazonEnabled &&
                      product.amazonUrl
                      ? "grid-cols-2"
                      : "grid-cols-1"
                    }`}
                >
                  <button
                    type="button"
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
                          url: getProductUrl(
                            category,
                            product
                          ),
                        },
                        qty
                      )
                    }
                    className="h-13 sm:h-14 inline-flex items-center justify-center gap-2 px-3 sm:px-6 rounded-full bg-[#97B002] text-white font-medium text-xs sm:text-base shadow-sm hover:bg-[#869C02] hover:shadow-md active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#97B002] focus-visible:ring-offset-2"
                  >
                    <ShoppingBag className="h-4.5 w-4.5 shrink-0" />

                    <span className="truncate">
                      Add to Cart
                    </span>
                  </button>

                  {product.amazonEnabled &&
                    product.amazonUrl && (
                      <a
                        href={product.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-13 sm:h-14 inline-flex items-center justify-center gap-2 px-3 sm:px-6 rounded-full bg-[#FF9900] text-white font-medium text-xs sm:text-base hover:bg-[#E68A00] active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] focus-visible:ring-offset-2"
                      >
                        <ShoppingBag className="h-4 w-4 shrink-0" />

                        <span className="truncate">
                          Buy on Amazon
                        </span>
                      </a>
                    )}
                </div>

                {/* =================================================
                    ENQUIRY + WHATSAPP
                ================================================== */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setEnquiryOpen(true)
                    }
                    className="h-12 inline-flex items-center justify-center gap-2 px-3 sm:px-5 rounded-full bg-[#97B002] text-white font-medium text-xs sm:text-sm hover:bg-[#869C02] active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#97B002] focus-visible:ring-offset-2"
                  >
                    <span className="truncate">
                      Send Enquiry
                    </span>
                  </button>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 inline-flex items-center justify-center gap-2 px-3 sm:px-5 rounded-full border border-border font-medium text-xs sm:text-sm hover:bg-muted active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" />

                    <span className="truncate">
                      WhatsApp
                    </span>
                  </a>
                </div>

                {/* =================================================
                    SOCIAL SECTION
                ================================================== */}
                {(product.instagramUrl ||
                  product.youtubeUrl) && (
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

                            <span className="truncate">
                              Instagram
                            </span>
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

                            <span className="truncate">
                              YouTube
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
              </div>

              {/* ===================================================
                  SHIPPING / QUALITY
              ==================================================== */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                  <Truck className="h-4 w-4 mt-0.5 text-brand shrink-0" />

                  <div>
                    <div className="font-medium">
                      Pan-India shipping
                    </div>

                    <div className="text-muted-foreground text-xs">
                      Ships in 3–5 business days.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                  <ShieldCheck className="h-4 w-4 mt-0.5 text-brand shrink-0" />

                  <div>
                    <div className="font-medium">
                      Made with love
                    </div>

                    <div className="text-muted-foreground text-xs">
                      Quality checked, hand packed.
                    </div>
                  </div>
                </div>
              </div>

              {/* ===================================================
                  LONG DESCRIPTION
              ==================================================== */}
              <div className="mt-10">
                <h2 className="font-display text-2xl">
                  About this piece
                </h2>

                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {product.long}
                </p>

                {/* Specifications intentionally disabled */}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FAQ
        ========================================================== */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl md:text-4xl text-center">
              Frequently asked
            </h2>

            <div className="mt-8 space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-border bg-card p-5 open:shadow-md transition"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between font-medium">
                    {f.q}

                    <ChevronRight className="h-4 w-4 group-open:rotate-90 transition" />
                  </summary>

                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            RELATED PRODUCTS
        ========================================================== */}
        {related.length > 0 && (
          <section className="py-16 bg-[oklch(0.95_0.01_85)]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-3xl md:text-4xl">
                You may also love
              </h2>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={getProductUrl(category, p)}
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all flex flex-col"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        width={600}
                        height={600}
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

                      <div className="mt-auto pt-2 font-display text-base sm:text-lg text-brand">
                        {formatINR(p.price)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {imageViewerOpen &&
          createPortal(
            <div
              className="
        fixed
        inset-0
        z-[99999]
        w-screen
        h-[100dvh]
        bg-black
        flex
        items-center
        justify-center
        overflow-hidden
      "
              role="dialog"
              aria-modal="true"
              aria-label="Product image viewer"
              onClick={() => setImageViewerOpen(false)}
            >
              {/* ============================================
          CLOSE BUTTON
      ============================================= */}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setImageViewerOpen(false);
                }}
                aria-label="Close image viewer"
                className="
          absolute
          top-4
          right-4
          sm:top-6
          sm:right-6
          z-[100]
          h-11
          w-11
          sm:h-12
          sm:w-12
          rounded-full
          bg-white/10
          text-white
          backdrop-blur-md
          border
          border-white/20
          inline-flex
          items-center
          justify-center
          hover:bg-white/20
          active:scale-90
          transition-all
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
        "
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {/* ============================================
          IMAGE COUNTER
      ============================================= */}
              {images.length > 1 && (
                <div
                  className="
            absolute
            top-5
            left-1/2
            -translate-x-1/2
            z-[100]
            px-3
            py-1.5
            rounded-full
            bg-white/10
            text-white
            text-xs
            backdrop-blur-md
            border
            border-white/10
          "
                >
                  {activeImg + 1} / {images.length}
                </div>
              )}

              {/* ============================================
          PREVIOUS IMAGE
      ============================================= */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goToPreviousImage();
                  }}
                  aria-label="Previous image"
                  className="
            absolute
            left-3
            sm:left-6
            top-1/2
            -translate-y-1/2
            z-[100]
            h-11
            w-11
            sm:h-12
            sm:w-12
            rounded-full
            bg-white/10
            text-white
            backdrop-blur-md
            border
            border-white/20
            inline-flex
            items-center
            justify-center
            hover:bg-white/20
            active:scale-90
            transition-all
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
          "
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {/* ============================================
          IMAGE CONTAINER
      ============================================= */}
              <motion.div
                key={activeImg}
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="
          relative
          w-screen
          h-[100dvh]
          flex
          items-center
          justify-center
          px-16
          py-12
          sm:px-20
          sm:py-16
          md:px-24
          md:py-20
        "
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={images[activeImg]}
                  alt={`${product.name} fullscreen`}
                  draggable={false}
                  className="
            block
            max-w-full
            max-h-full
            w-auto
            h-auto
            object-contain
            select-none
          "
                />
              </motion.div>

              {/* ============================================
          NEXT IMAGE
      ============================================= */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goToNextImage();
                  }}
                  aria-label="Next image"
                  className="
            absolute
            right-3
            sm:right-6
            top-1/2
            -translate-y-1/2
            z-[100]
            h-11
            w-11
            sm:h-12
            sm:w-12
            rounded-full
            bg-white/10
            text-white
            backdrop-blur-md
            border
            border-white/20
            inline-flex
            items-center
            justify-center
            hover:bg-white/20
            active:scale-90
            transition-all
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
          "
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}

              {/* ============================================
          MOBILE SWIPE HINT
      ============================================= */}
              {images.length > 1 && (
                <div
                  className="
            absolute
            bottom-5
            left-1/2
            -translate-x-1/2
            z-[100]
            text-white/50
            text-[11px]
            sm:hidden
            whitespace-nowrap
          "
                >
                  Swipe to view more
                </div>
              )}
            </div>,
            document.body
          )}
        {/* =========================================================
            ENQUIRY MODAL
        ========================================================== */}
        <EnquiryModal
          open={enquiryOpen}
          onClose={() => setEnquiryOpen(false)}
          product={product}
        />
      </PageTransition>
    </div>
  );
}