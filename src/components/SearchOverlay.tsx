import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { allProducts } from "@/data/products";
import { formatINR } from "@/contexts/CartContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: Props) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return allProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.code.toLowerCase().includes(term) ||
          p.categoryName.toLowerCase().includes(term) ||
          p.categorySlug.toLowerCase().includes(term),
      )
      .slice(0, 24);
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto max-w-3xl mt-16 md:mt-24 mx-4 sm:mx-auto bg-background rounded-2xl border border-border shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 sm:px-5 py-3">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, code or category…"
                className="flex-1 min-w-0 bg-transparent outline-none py-2 text-base"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto">
              {q.trim() === "" ? (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  Start typing to search across the SatvAikya catalog.
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  No products found.
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {results.map((p) => (
                    <li key={`${p.categorySlug}/${p.slug}`}>
                      <Link
                        to={`/collections/${p.categorySlug}/${p.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 hover:bg-muted transition"
                      >
                        <img
                          src={p.image}
                          alt=""
                          loading="lazy"
                          className="h-14 w-14 rounded-lg object-cover shrink-0"
                          width={56}
                          height={56}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] uppercase tracking-widest text-gold truncate">
                            {p.categoryName} · {p.code}
                          </div>
                          <div className="font-display text-sm sm:text-base truncate">{p.name}</div>
                        </div>
                        <div className="text-sm font-display text-brand shrink-0">
                          {formatINR(p.price)}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}