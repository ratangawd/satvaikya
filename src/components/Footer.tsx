import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { categories } from "@/data/products";

export default function Footer() {
  return (
    <footer className="mt-24 bg-[oklch(0.22_0.02_150)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold text-[oklch(0.22_0.02_150)] font-display text-lg">
              S
            </span>
            <span className="font-display text-2xl">SatvAikya</span>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            We design and manufacture premium handcrafted wooden decor,
            sacred art, DIY kits and thoughtful gifting for the modern Indian home.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="https://instagram.com" aria-label="Instagram" className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold transition inline-flex items-center justify-center">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold transition inline-flex items-center justify-center">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/" className="hover:text-gold transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-gold transition">About Us</Link></li>
            <li><Link to="/collections" className="hover:text-gold transition">Collections</Link></li>
            <li><Link to="/blog" className="hover:text-gold transition">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">Collections</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link to={`/collections/${c.slug}`} className="hover:text-gold transition">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">Get in touch</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-gold" /> +91 98664 10523</li>
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-gold" /> +91 70328 71423</li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-gold" /> satvaikya@gmail.com</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold" /> Hyderabad, India</li>
          </ul>
          <form
            onSubmit={(e) => { e.preventDefault(); (e.currentTarget as HTMLFormElement).reset(); }}
            className="mt-6"
          >
            <label className="text-xs uppercase tracking-widest text-white/60">Newsletter</label>
            <div className="mt-2 flex gap-2">
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/10 text-white placeholder:text-white/50 border border-white/10 focus:border-gold focus:outline-none text-sm"
              />
              <button type="submit" className="px-4 py-2 rounded-lg bg-gold text-[oklch(0.22_0.02_150)] font-medium text-sm hover:bg-white transition">
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <p>© {new Date().getFullYear()} SatvAikya Innovations. All rights reserved.</p>
          <p>Re-imagine Creativity. Handcrafted in India.</p>
        </div>
      </div>
    </footer>
  );
}