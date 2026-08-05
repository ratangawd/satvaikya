import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ShoppingBag,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Search,
  Heart,
  MessageCircle,
  User,
  LogOut
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import SearchOverlay from "./SearchOverlay";
// import { categories } from "@/data/products";
import { getCategories } from "@/services/category.service";
import type { Category } from "@/types/category";
import logo from "@/assets/logo.png";
import AnnouncementBar from "./AnnouncementBar";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";

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
  const { user, logout } = useCustomerAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeParent, setActiveParent] = useState<Category | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [mobileCollectionsParent, setMobileCollectionsParent] =
    useState<Category | null>(null);

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
    setMobileCollectionsParent(null);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!profileOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [profileOpen]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data ?? []);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  const solid = true;
  const parentCategories = categories.filter(
    (category) => !category.parent_id && category.is_active
  );

  const childCategories = categories.filter(
    (category) => category.parent_id && category.is_active
  );

  return (
    <>
      <AnnouncementBar />
      <header
        className={`fixed top-10 inset-x-0 z-40 transition-all duration-500 ${solid
          ? "bg-background/95 backdrop-blur border-b border-border shadow-sm"
          : "bg-transparent"
          }`}
      >

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="SatvAikya"
              className="h-14 w-40 object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) =>
              n.mega ? (
                // <div
                //   key={n.to}
                //   className="relative"
                //   onMouseEnter={() => setMegaOpen(true)}
                //   onMouseLeave={() => setMegaOpen(false)}
                // >
                <div
                  key={n.to}
                  className="relative"
                  onMouseEnter={() => {
                    setMegaOpen(true);

                    if (!activeParent && parentCategories.length > 0) {
                      setActiveParent(parentCategories[0]);
                    }
                  }}
                  onMouseLeave={() => {
                    setMegaOpen(false);
                    setActiveParent(null);
                  }}
                >
                  <NavLink
                    to={n.to}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors ${solid
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
                        initial={{ opacity: 0, y: 7 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 7 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full pt-2.5 flex items-start gap-3"
                      >
                        {/* Left panel: parent categories */}
                        <div className="w-[260px] bg-white rounded-2xl border border-border shadow-lg py-2 px-1.5">
                          {parentCategories.map((parent) => {
                            const hasChildren = childCategories.some(
                              (child) => child.parent_id === parent.id
                            );
                            const isActive = activeParent?.id === parent.id;

                            return (
                              <Link
                                key={parent.id}
                                to={`/collections/${parent.slug}`}
                                onMouseEnter={() => setActiveParent(parent)}
                                className={`flex items-center justify-between gap-2 rounded-lg pl-3 pr-2.5 py-2 text-[14px] font-medium transition-colors border-l-[3px] ${isActive
                                  ? "border-brand bg-[#f6f3ea] font-semibold text-foreground"
                                  : "border-transparent text-foreground hover:bg-[#f6f3ea]"
                                  }`}
                              >
                                <span className="truncate">{parent.name}</span>
                                {hasChildren && (
                                  <ChevronRight
                                    className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-brand" : "text-muted-foreground"
                                      }`}
                                  />
                                )}
                              </Link>
                            );
                          })}
                        </div>

                        {/* Right panel: subcategories of the hovered parent */}
                        {activeParent &&
                          childCategories.some(
                            (child) => child.parent_id === activeParent.id
                          ) && (
                            <motion.div
                              key={activeParent.id}
                              initial={{ opacity: 0, x: 5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.16 }}
                              className="w-[240px] bg-white rounded-2xl border border-border shadow-lg py-2 px-1.5"
                            >
                              {childCategories
                                .filter(
                                  (child) => child.parent_id === activeParent.id
                                )
                                .map((child) => (
                                  <Link
                                    key={child.id}
                                    to={`/collections/${activeParent.slug}/${child.slug}`}
                                    className="block rounded-lg px-3 py-2 text-[13px] font-normal text-foreground hover:bg-[#f6f3ea] hover:text-brand transition-colors"
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                            </motion.div>
                          )}
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
                    `text-sm font-medium tracking-wide uppercase transition-colors ${solid
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

          {/* <a
          href="https://wa.me/919866410523?text=Hi%20SatvAikya,%20I%20need%20a%20custom%20design."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden xl:inline-flex items-center gap-2 rounded-lg border border-[#25D366] px-5 py-2 text-sm font-semibold text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300"
        >
          <MessageCircle className="h-5 w-5" />
          Need a Custom Design?
        </a> */}

          <div className="flex items-center gap-0.5 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition ${solid
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10"
                }`}
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/wishlist"
              className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full transition ${solid
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

            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((v) => !v)}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition cursor-pointer ${solid
                    ? "text-foreground hover:bg-muted"
                    : "text-white hover:bg-white/10"
                    }`}
                  aria-label="Customer Profile"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                >
                  <User className="h-5 w-5" />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, scale: 0.95, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -6 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-2 w-[260px] origin-top-right rounded-2xl border border-border bg-white shadow-xl py-2 z-50"
                    >
                      <Link
                        to="/profile"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground rounded-lg mx-1.5 cursor-pointer transition-colors hover:bg-muted"
                      >
                        <User className="h-4 w-4 text-muted-foreground" />
                        My Profile
                      </Link>
                      <Link
                        to="/profile/enquiries"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground rounded-lg mx-1.5 cursor-pointer transition-colors hover:bg-muted"
                      >
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        My Enquiries
                      </Link>
                      <Link
                        to="/wishlist"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground rounded-lg mx-1.5 cursor-pointer transition-colors hover:bg-muted"
                      >
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        Wishlist
                      </Link>

                      <div className="my-1.5 border-t border-border" />

                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setProfileOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 rounded-lg mx-1.5 cursor-pointer transition-colors hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition ${solid
                  ? "text-foreground hover:bg-muted"
                  : "text-white hover:bg-white/10"
                  }`}
                aria-label="Customer Profile"
              >
                <User className="h-5 w-5" />
              </Link>
            )}
            
            <button
              onClick={openCart}
              className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full transition ${solid
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
              onClick={() => {
                setMobileOpen((v) => !v);
                setMobileCollectionsParent(null);
              }}
              className={`lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full transition ${solid
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
                      `block px-3 py-3 rounded-lg text-base font-medium ${isActive
                        ? "bg-brand/10 text-brand"
                        : "text-foreground hover:bg-muted"
                      }`
                    }
                  >
                    {n.label}
                  </NavLink>
                ))}
                <div className="pt-2 mt-2 border-t border-border overflow-hidden">
                  {!mobileCollectionsParent && (
                    <div className="text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">
                      Collections
                    </div>
                  )}
                  <AnimatePresence mode="wait" initial={false}>
                    {!mobileCollectionsParent ? (
                      <motion.div
                        key="mobile-collections-level-1"
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col"
                      >
                        {parentCategories.map((parent) => {
                          const hasChildren = childCategories.some(
                            (child) => child.parent_id === parent.id
                          );

                          return hasChildren ? (
                            <button
                              key={parent.id}
                              type="button"
                              onClick={() => setMobileCollectionsParent(parent)}
                              className="flex items-center justify-between px-3 py-3 text-sm rounded-lg text-foreground hover:bg-muted text-left"
                              aria-expanded={false}
                            >
                              <span>{parent.name}</span>
                              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                            </button>
                          ) : (
                            <Link
                              key={parent.id}
                              to={`/collections/${parent.slug}`}
                              className="px-3 py-3 text-sm rounded-lg text-foreground hover:bg-muted"
                            >
                              {parent.name}
                            </Link>
                          );
                        })}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="mobile-collections-level-2"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col"
                      >
                        <button
                          type="button"
                          onClick={() => setMobileCollectionsParent(null)}
                          className="flex items-center gap-2 px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted rounded-lg"
                          aria-label={`Back to Collections`}
                        >
                          <ChevronLeft className="h-4 w-4 shrink-0" />
                          <span className="truncate">
                            {mobileCollectionsParent.name}
                          </span>
                        </button>

                        <Link
                          to={`/collections/${mobileCollectionsParent.slug}`}
                          className="px-3 py-3 text-sm font-medium rounded-lg text-brand hover:bg-muted"
                        >
                          All {mobileCollectionsParent.name}
                        </Link>

                        {childCategories
                          .filter(
                            (child) =>
                              child.parent_id === mobileCollectionsParent.id
                          )
                          .map((child) => (
                            <Link
                              key={child.id}
                              to={`/collections/${mobileCollectionsParent.slug}/${child.slug}`}
                              className="px-3 py-3 text-sm rounded-lg text-foreground hover:bg-muted"
                            >
                              {child.name}
                            </Link>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      </header>
    </>
  );
}