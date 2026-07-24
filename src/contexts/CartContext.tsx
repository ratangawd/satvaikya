import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface CartItem {
  id: string; // categorySlug/productSlug
  code: string;
  name: string;
  price: number;
  image: string;
  categorySlug: string;
  productSlug: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "satvaikya-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota */
    }
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + qty } : p));
      }
      return [...prev, { ...item, quantity: qty }];
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: Math.max(0, qty) } : p))
        .filter((p) => p.quantity > 0),
    );
  }, []);

  const removeItem = useCallback(
    (id: string) => setItems((prev) => prev.filter((p) => p.id !== id)),
    [],
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.quantity * i.price, 0);
    return {
      items,
      count,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateQty,
      removeItem,
      clear,
    };
  }, [items, isOpen, addItem, updateQty, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const WHATSAPP_NUMBER = "919866410523";
export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;