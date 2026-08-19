import { motion } from "framer-motion";
import { Heart, Leaf, Target, Eye, Award } from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import hero from "@/assets/hero-lifestyle.jpg";
import heroo from "@/assets/about-us.png";

const values = [
  { icon: Heart, title: "Made with love", text: "Every piece leaves our workshop only when it feels ready — never before." },
  { icon: Leaf, title: "Kind to the earth", text: "Responsibly sourced wood, low-VOC finishes, and packaging we're proud of." },
  { icon: Award, title: "Design that lasts", text: "We build for decades, not seasons — pieces that grow into your family's story." },
];

const timeline = [
  { year: "2019", title: "The workshop begins", text: "SatvAikya starts as a small studio designing wooden decor and gifting for close family and friends." },
  { year: "2021", title: "Our first collection", text: "We launch the Sacred Decor and Pooja Decor lines — designed around the daily rituals of Indian homes." },
  { year: "2023", title: "Nationwide shipping", text: "Pan-India delivery, and our first collaborations with wedding planners and corporate gifting teams." },
  { year: "2025", title: "The DIY story", text: "A new focus on DIY kits for kids and creative adults — screen-free evenings, meaningfully made." },
  { year: "2026", title: "The next chapter", text: "Expanding into painting stands, wall art and customised wooden crates for interior designers." },
];

export default function About() {
  return (
    <PageTransition>
      <SEO
        title="About SatvAikya — Our Story, Mission & Craft"
        description="SatvAikya is a design-led wooden decor studio committed to sustainable materials, thoughtful design and heritage craftsmanship for the modern Indian home."
        path="/about"
        image={heroo}
      />

      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">About Us</span>
          <h1 className="mt-4 font-display text-4xl md:text-6xl leading-tight">
            A studio devoted to <em className="text-gradient-gold not-italic">re-imagining</em> creativity.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            SatvAikya Innovations is a design-and-manufacturing studio that makes sustainable wooden decor for the modern Indian home — from sacred art and gifting to DIY kits, wall art and considered everyday objects.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
          <img src={heroo} alt="SatvAikya studio interior" className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={1920} height={900} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">Our Story</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Beautiful, functional, sustainable.</h2>
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              We started SatvAikya to be a one-stop studio for wooden decor that is beautiful, functional and kind to the earth in equal measure. Every piece is the outcome of a stubborn belief — that mass production and meaning don't have to be opposites.
            </p>
            <p>
              We design, produce and supply creative wooden pieces for kids, interior decor, sacred spaces and gifting. Our sacred and return-gift collections are handmade from natural wood and inspired by traditional Hindu spirituality — thoughtful heirlooms that bring blessings, beauty and lasting memories to celebrations.
            </p>
            <p>
              We're also proud to work directly with wedding planners, interior designers and corporate teams for customised wooden crates, boxes, trays, racks and one-of-a-kind commissions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[oklch(0.95_0.01_85)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {[
            { icon: Target, title: "Our Mission", text: "To bring the warmth and craft of wood into every Indian home — through pieces that hold meaning long after the trend has passed." },
            { icon: Eye, title: "Our Vision", text: "To become the most-loved wooden decor studio in India, celebrated for sustainability, design integrity and generosity of craft." },
          ].map((b) => (
            <div key={b.title} className="bg-card rounded-2xl p-8 border border-border">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand mb-4">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl">{b.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">Our Values</span>
            <h2 className="mt-2 font-display text-3xl md:text-5xl">What we believe in</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border p-8 bg-card text-center">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold mb-4">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl">{v.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 md:py-24 text-white"
        style={{
          backgroundImage: "url('/green-texture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Manufacturing</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Craftsmanship you can feel.</h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              We manufacture in our own workshop, so quality control is not a checkpoint — it's the whole culture. From sourcing to sanding, every stage happens under one roof.
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Quality Commitment</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Nothing leaves without check.</h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              Every piece is inspected by hand before it's boxed. We stand behind our craftsmanship with a promise: if anything ever isn't right, we make it right.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">Journey</span>
            <h2 className="mt-2 font-display text-3xl md:text-5xl">A short history</h2>
          </div>
          <ol className="relative border-l-2 border-gold/40 pl-6 md:pl-10 space-y-10">
            {timeline.map((t, i) => (
              <motion.li
                key={t.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative"
              >
                <span className="absolute -left-[33px] md:-left-[49px] h-6 w-6 rounded-full bg-gold border-4 border-background" />
                <div className="font-display text-3xl text-brand">{t.year}</div>
                <h3 className="mt-1 font-display text-xl">{t.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{t.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </PageTransition>
  );
}