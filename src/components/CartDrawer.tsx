import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart, formatINR, WHATSAPP_NUMBER } from "@/contexts/CartContext";

export default function CartDrawer() {
  const { isOpen, closeCart, items, updateQty, removeItem, subtotal } = useCart();

  const whatsappHref = () => {
    const lines = [
      "Hello SatvAikya, I would like to order:",
      "",
      ...items.map((i) => {
        const codeText = i.code?.trim() ? ` (${i.code.trim()})` : "";
        return `• ${i.name}${codeText} — Qty ${i.quantity} × ${formatINR(i.price)} = ${formatINR(i.price * i.quantity)}`;
      }),
      "",
      `Subtotal: ${formatINR(subtotal)}`,
    ];
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-border">
              <h2 className="font-display text-xl">Your Cart</h2>
              <button onClick={closeCart} aria-label="Close cart" className="h-9 w-9 rounded-full hover:bg-muted inline-flex items-center justify-center">
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-3">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                <p className="font-display text-lg">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">Discover our collections and add your first piece.</p>
                <Link to="/collections" onClick={closeCart} className="mt-2 btn-luxury px-6 py-3 rounded-full text-sm font-medium">
                  Browse Collections
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-start">
                      <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg object-cover shrink-0" loading="lazy" width={80} height={80} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <div className="min-w-0">
                            <Link to={`/collections/${item.categorySlug}/${item.productSlug}`} onClick={closeCart} className="font-medium text-sm text-foreground hover:text-brand line-clamp-2">
                              {item.name}
                            </Link>
                            <p className="text-xs text-muted-foreground mt-0.5">Code: {item.code}</p>
                          </div>
                          <button onClick={() => removeItem(item.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive shrink-0">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center border border-border rounded-full">
                            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="h-8 w-8 inline-flex items-center justify-center hover:bg-muted rounded-l-full" aria-label="Decrease">
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, item.quantity + 1)} className="h-8 w-8 inline-flex items-center justify-center hover:bg-muted rounded-r-full" aria-label="Increase">
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="text-sm font-medium">{formatINR(item.price * item.quantity)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border px-5 py-4 space-y-3 bg-muted/30">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-display text-xl">{formatINR(subtotal)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Shipping calculated at checkout. Orders placed via WhatsApp.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button onClick={closeCart} className="px-5 py-3 rounded-full border border-border text-sm font-medium hover:bg-muted transition">
                      Continue Shopping
                    </button>
                    <Link to="/checkout" onClick={closeCart} className="btn-luxury px-5 py-3 rounded-full text-sm font-medium text-center">
                      Checkout
                    </Link>
                  </div>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener"
                    className="block text-center px-5 py-3 rounded-full bg-[#25D366] text-white text-sm font-medium hover:opacity-90 transition"
                  >
                    Order on WhatsApp
                  </a>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}