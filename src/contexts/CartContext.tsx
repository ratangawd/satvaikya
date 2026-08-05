import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useCustomerAuth } from "./CustomerAuthContext";
import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "@/services/cart.service";

export interface CartItem {
  id: string; // categorySlug/productSlug
  code: string;
  name: string;
  price: number;
  image: string;
  categorySlug: string;
  productSlug: string;
  quantity: number;
  /**
   * Full, ready-to-use product URL, built once via getProductUrl() when the
   * item was added. Prefer this over reconstructing from categorySlug/productSlug,
   * which loses the ancestor chain for subcategory products.
   */
  url?: string;
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

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useCustomerAuth();

  const loadCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }

    try {
      const cart = await getCart(user.id);

      setItems(
        cart.map((item) => ({
          id: item.id,
          code: item.products.code ?? "",
          name: item.products.name,
          price: Number(item.products.price ?? 0),
          image: item.products.image,
          categorySlug: item.products.category_slug,
          productSlug: item.products.slug,
          quantity: item.quantity,
        }))
      );
    } catch (error) {
      console.error("Failed to load cart:", error);
      setItems([]);
    }
  }, [user]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const [items, setItems] = useState<CartItem[]>([]);

  const [isOpen, setIsOpen] = useState(false);

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