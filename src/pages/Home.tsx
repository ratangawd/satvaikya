import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Leaf,
  Sparkles,
  Truck,
  Mail,
  Phone,
  MapPin,
  PencilRuler,
  Clock,
  MessageCircle,
  Instagram,
} from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import { blogs } from "@/data/blogs";
import aboutImg from "@/assets/cat-sacred.jpg";
import { WHATSAPP_NUMBER } from "@/contexts/CartContext";
import { supabase } from "@/lib/supabase";
import emailjs from "@emailjs/browser";

// hero banner images
import banner1Desktop from "@/assets/hero/banner1.png";
import banner1Mobile from "@/assets/hero/banner1-mobile.png";
import banner2Desktop from "@/assets/hero/banner2.png";
import banner2Mobile from "@/assets/hero/banner2-mobile.png";
import banner3Desktop from "@/assets/hero/banner3.png";
import banner3Mobile from "@/assets/hero/banner3-mobile.png";
import banner4Desktop from "@/assets/hero/banner4.png";
import banner4Mobile from "@/assets/hero/banner4-mobile.png";
import banner5Desktop from "@/assets/hero/banner5.png";
import banner5Mobile from "@/assets/hero/banner5-mobile.png";

import { useEffect, useState } from "react";
import PaperTexture from "@/components/decorative/PaperTexture";
import DecorativeLayer from "@/components/decorative/DecorativeLayer";
import { getCategoryImageUrl } from "@/services/category-image.service";
import CraftedPaperTexture from "@/components/decorative/CraftedPaperTexture";
import CraftedDecorativeLayer from "@/components/decorative/CraftedDecorativeLayer";

const testimonials = [
  { name: "Priya Sharma", city: "Bengaluru", text: "The Ashtalakshmi set is stunning — arrived beautifully packaged and looks even better in person than the photos." },
  { name: "Rahul Menon", city: "Kochi", text: "We ordered 120 return gifts for our wedding. The finish was exquisite and the whole team delivered on time." },
  { name: "Anjali Verma", city: "Delhi", text: "The 7-step diya stand became the centerpiece of our Diwali. Absolutely worth every rupee." },
];

const features = [
  { icon: Leaf, title: "Sustainable Wood", desc: "Responsibly sourced, thoughtfully finished." },
  { icon: Award, title: "Handcrafted Quality", desc: "Every piece checked, polished, packed by hand." },
  // { icon: Sparkles, title: "Design-led", desc: "Made by artisans, designed for modern homes." },
  { icon: PencilRuler, title: "Customisation", desc: "Tailored designs crafted to match your unique needs." },
  { icon: Truck, title: "Pan-India Shipping", desc: "Secure delivery to every pincode in India." },
];

const instagramPosts = [
  {
    image: "/images/instagram/instagram1.png",
    link: "https://www.instagram.com/p/Db8qSj8E8_0/?igsh=enViaWE0czJweHBt",
    alt: "SatvAikya Instagram post 1",
  },
  {
    image: "/images/instagram/instagram2.png",
    link: "https://www.instagram.com/p/DbIdPwamIlj/?igsh=Yjc2c2IxcmNwZGEw",
    alt: "SatvAikya Instagram post 2",
  },
  {
    image: "/images/instagram/instagram3.png",
    link: "https://www.instagram.com/reel/Db5_Fk8jhRk/?igsh=ZGk3N3hlYjlnMWdq",
    alt: "SatvAikya Instagram post 3",
  },
  {
    image: "/images/instagram/instagram4.png",
    link: "https://www.instagram.com/p/DbVHwekjvSN/?igsh=MXZ1aGNyOG5yOTI4aQ==",
    alt: "SatvAikya Instagram post 4",
  },
];

export default function Home() {
  const slides = [
    { desktop: banner1Desktop, mobile: banner1Mobile },
    { desktop: banner2Desktop, mobile: banner2Mobile },
    { desktop: banner3Desktop, mobile: banner3Mobile },
    { desktop: banner4Desktop, mobile: banner4Mobile },
    { desktop: banner5Desktop, mobile: banner5Mobile },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [instagramProducts, setInstagramProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("created_at", { ascending: true });



        if (error) throw error;

        if (data?.length) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }

      const { data, error } = await supabase
        .from("products")
        .select(`
    id,
    name,
    slug,
    instagram_url,
    is_active,
    product_images(
      storage_path,
      is_primary
    )
  `)
        .eq("is_active", true);

      if (error) throw error;

      const instagramProducts =
        (data ?? []).filter(
          (p) =>
            p.instagram_url &&
            p.product_images &&
            p.product_images.length > 0
        );

      setInstagramProducts(instagramProducts);
   };

    loadCategories();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryPath = (category: any): string => {
    const parts: string[] = [];
    let current = category;

    const visited = new Set<string>();

    while (current) {
      // Prevent accidental infinite loops
      if (visited.has(current.id)) break;
      visited.add(current.id);

      parts.unshift(current.slug);

      if (!current.parent_id) break;

      current = categories.find(
        (cat) => cat.id === current.parent_id
      );
    }

    return parts.join("/");
  };

  return (
    <PageTransition>
      <SEO
        title="SatvAikya | Premium Handcrafted Wooden Decor & Sacred Art"
        description="Discover premium handcrafted wooden pooja decor, wall art, DIY kits and gifting from SatvAikya. Designed and manufactured in India."
        path="/"
        image={banner1Desktop}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SatvAikya Innovations",
          url: "/",
          logo: "/Favicon.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-98664-10523",
            email: "satvaikya@gmail.com",
            contactType: "customer service",
          },
        }}
      />

      {/* ===================== HERO (full-bleed, no decorative background) ===================== */}

      <section className="relative w-full aspect-[16/6.5] overflow-hidden">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={slides[currentSlide].mobile}
          />

          <img
            src={slides[currentSlide].desktop}
            alt={`Hero Banner ${currentSlide + 1}`}
            className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-700"
            loading="eager"
          />
        </picture>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition"
          aria-label="Previous slide"
        >
          ❮
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition"
          aria-label="Next slide"
        >
          ❯
        </button>

        {/* Hero CTAs */}
        <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-2xl"
          >
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${currentSlide === index
                  ? "bg-white w-7"
                  : "bg-white/50 w-2.5 hover:bg-white"
                }`}
            />
          ))}
        </div>
      </section>

      {/* ===================== MAIN CONTENT ===================== */}
      <main className="relative z-10">
        <div className="relative isolate overflow-hidden">
          <PaperTexture />
          <DecorativeLayer />
          <div className="relative z-10">
            {/* FEATURED CATEGORIES */}
            <section className="py-20 md:py-28">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">
                      Featured Categories
                    </span>
                    <h2 className="mt-2 font-display text-3xl md:text-5xl">The collection</h2>
                  </div>
                  <Link
                    to="/collections"
                    className="text-sm text-brand hover:text-gold transition inline-flex items-center gap-1"
                  >
                    View all collections <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {categories.slice(0, 6).map((c, i) => (
                    <motion.div
                      key={c.slug}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -12, scale: 1.02 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
                    >
                      <Link
                        to={`/collections/${getCategoryPath(c)}`}
                        className="group block overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-xl transition-all duration-500"
                      >
                        <div className="aspect-square bg-transparent flex items-center justify-center overflow-hidden p-0">
                          <img
                            src={
                              c.image_path
                                ? getCategoryImageUrl(c.image_path)
                                : c.image
                            }
                            alt={c.image_alt || c.name}
                            className="block h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            width={800}
                            height={800}
                          />
                        </div>
                        <div className="flex flex-1 items-start justify-between gap-4 px-6 py-5 min-h-[120px] bg-[#F8F4EA] border-t border-[#E6D7B8]">
                          <div className="min-w-0">
                            {c.tagline && (
                              <div className="text-[11px] uppercase tracking-[0.2em] text-[#8A6A3F] font-medium">
                                {c.tagline}
                              </div>
                            )}

                            <h3 className="mt-2 font-display text-lg sm:text-xl leading-snug text-[#24324A] break-words group-hover:text-[#7B9E00] transition-colors">
                              {c.name}
                            </h3>
                          </div>

                          <ArrowRight className="h-5 w-5 shrink-0 mt-1 text-[#7B9E00] group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="relative overflow-hidden py-20 md:py-28 bg-[oklch(0.95_0.01_85)]">
              <CraftedPaperTexture />
              <CraftedDecorativeLayer />
              <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-14">
                  <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">
                    Why SatvAikya
                  </span>
                  <h2 className="mt-2 font-display text-3xl md:text-5xl">
                    Crafted for the way you live
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    We're not a marketplace. Every piece we sell, we design and manufacture ourselves —
                    so every detail is ours to answer for.
                  </p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {features.map((f) => (
                    <div
                      key={f.title}
                      className="bg-card rounded-2xl p-6 border border-border text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand mb-3">
                        <f.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-lg">{f.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* LATEST BLOGS */}
            <section className="py-20 md:py-28">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">
                      Journal
                    </span>
                    <h2 className="mt-2 font-display text-3xl md:text-5xl">Fresh from the studio</h2>
                  </div>
                  <Link
                    to="/blog"
                    className="text-sm text-brand hover:text-gold transition inline-flex items-center gap-1"
                  >
                    All articles <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {blogs.slice(0, 3).map((b) => (
                    <Link
                      key={b.slug}
                      to={`/blog/${b.slug}`}
                      className="group block rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl transition-all"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={b.cover}
                          alt={b.title}
                          loading="lazy"
                          width={800}
                          height={500}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold">
                          {b.category} · {b.readTime}
                        </div>
                        <h3 className="mt-2 font-display text-xl group-hover:text-brand transition">
                          {b.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* TESTIMONIALS */}
            {/* <section className="py-20 md:py-28  bg-[#345E22]  text-white"> */}
           
            <section
              className="py-20 md:py-28 text-white bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/green-texture.png')",
              }}
            >

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                    Kind Words
                  </span>
                  <h2 className="mt-2 font-display text-3xl md:text-5xl">Loved across India</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonials.map((t, i) => (
                    <motion.div
                      key={t.name}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur"
                    >
                      <p className="font-display text-lg leading-relaxed">"{t.text}"</p>
                      <div className="mt-6 text-sm">
                        <div className="font-medium">{t.name}</div>
                        <div className="text-white/60">{t.city}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* INSTAGRAM GALLERY
            <section className="py-20 md:py-28">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">
                    @SatvAikya
                  </span>
                  <h2 className="mt-2 font-display text-3xl md:text-5xl">
                    On Instagram
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {instagramProducts.slice(0, 4).map((product) => {
                    const image =
                      product.product_images.find((i: any) => i.is_primary) ??
                      product.product_images[0];

                    return (
                      <a
                        key={product.id}
                        href={product.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block aspect-[4/5] overflow-hidden rounded-xl relative bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                      >
                        <img
                          src={
                            supabase.storage
                              .from("product-images")
                              .getPublicUrl(image.storage_path).data.publicUrl
                          }
                          alt={product.name}
                          loading="lazy"
                          width={600}
                          height={750}
                          className="h-full w-full object-contain bg-white transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          <Instagram
                            className="h-10 w-10 text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 drop-shadow-lg"
                          />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section> */}

            {/* INSTAGRAM GALLERY */}
            <section className="py-20 md:py-28">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">
                    @SatvAikya
                  </span>

                  <h2 className="mt-2 font-display text-3xl md:text-5xl">
                    On Instagram
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {instagramPosts.map((post) => (
                    <a
                      key={post.image}
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${post.alt} on Instagram`}
                      className="group block aspect-[4/5] overflow-hidden rounded-xl relative bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={post.image}
                        alt={post.alt}
                        loading="lazy"
                        width={600}
                        height={750}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <Instagram
                          className="h-10 w-10 text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 drop-shadow-lg"
                        />
                      </div>
                    </a>
                  ))}
                </div>

              </div>
            </section>

            {/* CONTACT */}
            <section
              id="contact"
              className="relative overflow-hidden py-20 md:py-28 bg-[oklch(0.95_0.01_85)]"
            >
              <CraftedPaperTexture />

              <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
                  <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">
                    Get in touch
                  </span>

                  <h2 className="mt-2 font-display text-3xl md:text-5xl">
                    Contact us
                  </h2>

                  <p className="mt-3 text-sm md:text-base text-muted-foreground">
                    For custom orders, bulk gifting, wholesale collaborations — or just to
                    say hello.
                  </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
                  <div className="lg:col-span-2 space-y-3 md:space-y-4">
                    {[
                      {
                        icon: Phone,
                        label: "Call us",
                        value: "+91 98664 10523",
                      },
                      {
                        icon: Mail,
                        label: "Email",
                        value: "satvaikya@gmail.com",
                      },
                      {
                        icon: MapPin,
                        label: "Studio",
                        value: "Hyderabad, Telangana, India",
                      },
                      {
                        icon: Clock,
                        label: "Working hours",
                        value: "Mon–Sat · 10 AM – 7 PM IST",
                      },
                    ].map((b) => (
                      <div
                        key={b.label}
                        className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-border bg-card"
                      >
                        <div className="inline-flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                          <b.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>

                        <div className="min-w-0">
                          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
                            {b.label}
                          </div>

                          <div className="mt-1 font-medium text-sm sm:text-base break-words">
                            {b.value}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white font-medium transition hover:opacity-90"
                      style={{
                        backgroundImage: "url('/green-texture.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat on WhatsApp
                    </a> */}

                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white font-medium transition hover:opacity-90"
                      style={{
                        backgroundColor: "#97B002",
                      }}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                  </div>

                  <div className="lg:col-span-3 space-y-6">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();

                        setLoading(true);
                        setSent(false);

                        const form = e.currentTarget;
                        const data = new FormData(form);

                        try {
                          await emailjs.send(
                            "service_ezl103e",
                            "template_ps5ii7a",
                            {
                              from_name: data.get("name"),
                              from_email: data.get("email"),
                              phone: data.get("phone"),
                              message: data.get("message"),
                              time: new Date().toLocaleString("en-IN"),
                            },
                            "UAGkPDFZl-fd87LIx"
                          );

                          setSent(true);
                          form.reset();

                          // Optional WhatsApp redirect after email
                          //                           const text = `New enquiry from SatvAikya website

                          // Name: ${data.get("name")}
                          // Phone: ${data.get("phone")}
                          // Email: ${data.get("email")}
                          // Message: ${data.get("message")}`;

                          //                           window.open(
                          //                             `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          //                               text
                          //                             )}`,
                          //                             "_blank"
                          //                           );
                        } catch (error: any) {
                          console.error("EmailJS Error:", error);

                          alert(
                            error?.text ||
                            error?.message ||
                            "Failed to send enquiry. Please try again."
                          );
                        } finally {
                          setLoading(false);
                        }
                      }}
                      className="bg-card rounded-2xl border border-border p-5 sm:p-6 md:p-8 space-y-4"
                    >
                      {sent && (
                        <div className="rounded-lg border border-green-300 bg-green-50 text-green-700 px-4 py-3">
                          ✅ Thank you! Your enquiry has been sent successfully.
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="block">
                          <span className="text-sm font-medium">
                            Full name
                          </span>

                          <input
                            required
                            name="name"
                            className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium">
                            Phone
                          </span>

                          <input
                            required
                            name="phone"
                            className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand"
                          />
                        </label>
                      </div>

                      <label className="block">
                        <span className="text-sm font-medium">
                          Email
                        </span>

                        <input
                          required
                          type="email"
                          name="email"
                          className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand"
                        />
                      </label>

                      <label className="block">
                        <span className="text-sm font-medium">
                          Message
                        </span>

                        <textarea
                          required
                          name="message"
                          rows={4}
                          className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand resize-none"
                        />
                      </label>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-3.5 rounded-full font-medium text-white transition hover:opacity-90 disabled:opacity-70"
                        style={{
                          backgroundColor: "#97B002",
                        }}
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}