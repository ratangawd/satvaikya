import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, X, ChevronDown, Search, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import SearchOverlay from "./SearchOverlay";
import { categories } from "@/data/products";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/collections", label: "Collections", mega: true },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { count, openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const solid = scrolled || !isHome || mobileOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        solid
          ? "bg-background/95 backdrop-blur border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <span
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-lg ${
              solid ? "bg-brand text-white" : "bg-white/90 text-brand"
            }`}
          >
            S
          </span>
          <span
            className={`font-display text-xl md:text-2xl tracking-tight truncate ${
              solid ? "text-foreground" : "text-white drop-shadow"
            }`}
          >
            SatvAikya
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) =>
            n.mega ? (
              <div
                key={n.to}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors ${
                      solid
                        ? isActive
                          ? "text-brand"
                          : "text-foreground hover:text-brand"
                        : "text-white/90 hover:text-white"
                    }`
                  }
                >
                  {n.label} <ChevronDown className="h-3.5 w-3.5" />
                </NavLink>
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[720px]"
                    >
                      <div className="bg-card rounded-2xl border border-border shadow-2xl p-6 grid grid-cols-2 gap-x-8 gap-y-3">
                        {categories.map((c) => (
                          <Link
                            key={c.slug}
                            to={`/collections/${c.slug}`}
                            className="group flex items-start gap-3 rounded-xl p-2 hover:bg-muted transition"
                          >
                            <img
                              src={c.image}
                              alt=""
                              className="h-12 w-12 rounded-lg object-cover shrink-0"
                              loading="lazy"
                              width={48}
                              height={48}
                            />
                            <div className="min-w-0">
                              <div className="font-display text-base text-foreground group-hover:text-brand transition">
                                {c.name}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {c.tagline}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide uppercase transition-colors ${
                    solid
                      ? isActive
                        ? "text-brand"
                        : "text-foreground hover:text-brand"
                      : "text-white/90 hover:text-white"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition ${
              solid
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Open search"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            to="/wishlist"
            className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full transition ${
              solid
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="View wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-brand text-[11px] font-semibold text-white flex items-center justify-center">
                {wishCount}
              </span>
            )}
          </Link>
          <button
            onClick={openCart}
            className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full transition ${
              solid
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gold text-[11px] font-semibold text-white flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={`lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full transition ${
              solid
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === "/"}
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-lg text-base font-medium ${
                      isActive
                        ? "bg-brand/10 text-brand"
                        : "text-foreground hover:bg-muted"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <div className="pt-2 mt-2 border-t border-border">
                <div className="text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">
                  Collections
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/collections/${c.slug}`}
                      className="px-3 py-2 text-sm rounded-lg text-foreground hover:bg-muted"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}