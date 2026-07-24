import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Award, Leaf, Sparkles, Truck, Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import { categories } from "@/data/products";
import { blogs } from "@/data/blogs";
import hero from "@/assets/hero-lifestyle.jpg";
import aboutImg from "@/assets/cat-sacred.jpg";
import { WHATSAPP_NUMBER } from "@/contexts/CartContext";

const testimonials = [
  { name: "Priya Sharma", city: "Bengaluru", text: "The Ashtalakshmi set is stunning — arrived beautifully packaged and looks even better in person than the photos." },
  { name: "Rahul Menon", city: "Kochi", text: "We ordered 120 return gifts for our wedding. The finish was exquisite and the whole team delivered on time." },
  { name: "Anjali Verma", city: "Delhi", text: "The 7-step diya stand became the centerpiece of our Diwali. Absolutely worth every rupee." },
];

const features = [
  { icon: Leaf, title: "Sustainable Wood", desc: "Responsibly sourced, thoughtfully finished." },
  { icon: Award, title: "Handcrafted Quality", desc: "Every piece checked, polished, packed by hand." },
  { icon: Sparkles, title: "Design-led", desc: "Made by artisans, designed for modern homes." },
  { icon: Truck, title: "Pan-India Shipping", desc: "Secure delivery to every pincode in India." },
];

export default function Home() {
  return (
    <PageTransition>
      <SEO
        title="SatvAikya | Premium Handcrafted Wooden Decor & Sacred Art"
        description="Discover premium handcrafted wooden pooja decor, wall art, DIY kits and gifting from SatvAikya. Designed and manufactured in India."
        path="/"
        image={hero}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SatvAikya Innovations",
          url: "/",
          logo: "/favicon.ico",
          contactPoint: { "@type": "ContactPoint", telephone: "+91-98664-10523", email: "satvaikya@gmail.com", contactType: "customer service" },
        }}
      />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img
          src={hero}
          alt="Handcrafted wooden pooja mandir with brass diyas in a luxury Indian home"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-20 md:pb-32 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-medium">
              <span className="h-px w-8 bg-gold" /> Re-imagine Creativity
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05]">
              Timeless wooden decor,
              <br />
              <span className="text-gradient-gold italic">handcrafted with love.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/85 max-w-xl leading-relaxed">
              A studio devoted to sacred art, meaningful gifting and design that lingers.
              Every piece designed and manufactured by our own artisans.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/collections" className="btn-luxury inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium">
                Shop Collections <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium bg-white/10 text-white border border-white/30 backdrop-blur hover:bg-white hover:text-brand transition">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 md:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={aboutImg}
                alt="Artisan hand-finishing a SatvAikya wooden piece"
                loading="lazy"
                width={800}
                height={1000}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden md:block absolute -bottom-6 -right-6 bg-gold text-brand rounded-2xl px-6 py-4 shadow-xl">
              <div className="font-display text-3xl">10+</div>
              <div className="text-xs uppercase tracking-widest">Years crafting</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">About SatvAikya</span>
            <h2 className="mt-2 font-display text-3xl md:text-5xl leading-tight">
              A studio devoted to <span className="italic text-brand">meaningful craft.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              SatvAikya was born from a simple belief — that everyday objects should carry story,
              intention and soul. From sacred art for the pooja room to modern decor for the living
              wall, every piece is designed, prototyped and hand-finished in our own studio.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We work only with responsibly sourced wood, natural finishes and small-batch runs —
              because we'd rather make fewer things beautifully than many things quickly.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <div className="font-display text-2xl md:text-3xl text-brand">500+</div>
                <div className="text-xs text-muted-foreground mt-1">Handmade designs</div>
              </div>
              <div>
                <div className="font-display text-2xl md:text-3xl text-brand">12k+</div>
                <div className="text-xs text-muted-foreground mt-1">Happy homes</div>
              </div>
              <div>
                <div className="font-display text-2xl md:text-3xl text-brand">100%</div>
                <div className="text-xs text-muted-foreground mt-1">Made in India</div>
              </div>
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm text-brand hover:text-gold transition font-medium"
            >
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">Featured Categories</span>
              <h2 className="mt-2 font-display text-3xl md:text-5xl">The collection</h2>
            </div>
            <Link to="/collections" className="text-sm text-brand hover:text-gold transition inline-flex items-center gap-1">
              View all collections <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
              >
                <Link
                  to={`/collections/${c.slug}`}
                  className="group block overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      width={800}
                      height={1000}
                    />
                  </div>
                  <div className="p-5 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-widest text-gold">{c.tagline}</div>
                      <h3 className="mt-1 font-display text-xl group-hover:text-brand transition-colors">{c.name}</h3>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-brand group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 md:py-28 bg-[oklch(0.95_0.01_85)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">Why SatvAikya</span>
            <h2 className="mt-2 font-display text-3xl md:text-5xl">Crafted for the way you live</h2>
            <p className="mt-4 text-muted-foreground">
              We're not a marketplace. Every piece we sell, we design and manufacture ourselves — so every detail is ours to answer for.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-card rounded-2xl p-6 border border-border text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
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
              <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">Journal</span>
              <h2 className="mt-2 font-display text-3xl md:text-5xl">Fresh from the studio</h2>
            </div>
            <Link to="/blog" className="text-sm text-brand hover:text-gold transition inline-flex items-center gap-1">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((b) => (
              <Link key={b.slug} to={`/blog/${b.slug}`} className="group block rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl transition-all">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={b.cover} alt={b.title} loading="lazy" width={800} height={500} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold">
                    {b.category} · {b.readTime}
                  </div>
                  <h3 className="mt-2 font-display text-xl group-hover:text-brand transition">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-brand text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Kind Words</span>
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

      {/* INSTAGRAM GALLERY */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">@SatvAikya</span>
            <h2 className="mt-2 font-display text-3xl md:text-5xl">On Instagram</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
            {categories.slice(0, 6).map((c) => (
              <a
                key={c.slug}
                href="https://instagram.com"
                className="group block aspect-square overflow-hidden rounded-lg relative"
              >
                <img src={c.image} alt="" loading="lazy" width={400} height={400} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/50 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 md:py-28 bg-[oklch(0.95_0.01_85)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">Get in touch</span>
            <h2 className="mt-2 font-display text-3xl md:text-5xl">Contact us</h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              For custom orders, bulk gifting, wholesale collaborations — or just to say hello.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-3 md:space-y-4">
              {[
                { icon: Phone, label: "Call us", value: "+91 98664 10523" },
                { icon: Mail, label: "Email", value: "satvaikya@gmail.com" },
                { icon: MapPin, label: "Studio", value: "Hyderabad, Telangana, India" },
                { icon: Clock, label: "Working hours", value: "Mon–Sat · 10 AM – 7 PM IST" },
              ].map((b) => (
                <div key={b.label} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-border bg-card">
                  <div className="inline-flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <b.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">{b.label}</div>
                    <div className="mt-1 font-medium text-sm sm:text-base break-words">{b.value}</div>
                  </div>
                </div>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-medium hover:opacity-90 transition"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const f = new FormData(e.currentTarget);
                  const text = `New enquiry from SatvAikya website%0A%0AName: ${f.get("name")}%0APhone: ${f.get("phone")}%0AEmail: ${f.get("email")}%0AMessage: ${f.get("message")}`;
                  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
                  (e.currentTarget as HTMLFormElement).reset();
                }}
                className="bg-card rounded-2xl border border-border p-5 sm:p-6 md:p-8 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium">Full name</span>
                    <input required name="name" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium">Phone</span>
                    <input required name="phone" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand" />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm font-medium">Email</span>
                  <input required type="email" name="email" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Message</span>
                  <textarea required name="message" rows={4} className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand resize-none" />
                </label>
                <button type="submit" className="w-full btn-luxury px-6 py-3.5 rounded-full font-medium">Send Message</button>
              </form>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-card">
                <iframe
                  title="SatvAikya location"
                  src="https://www.google.com/maps?q=Hyderabad&output=embed"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-brand to-[oklch(0.32_0.07_148)] text-white p-8 md:p-14 text-center">
            <h2 className="font-display text-3xl md:text-4xl">Join the SatvAikya circle</h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              New collections, limited releases and quiet studio notes — never more than twice a month.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); (e.currentTarget as HTMLFormElement).reset(); }}
              className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                className="flex-1 min-w-0 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-gold"
              />
              <button type="submit" className="px-6 py-3.5 rounded-full bg-gold text-brand font-medium hover:bg-white transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}