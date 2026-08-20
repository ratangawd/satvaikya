import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useCustomerAuth } from "./CustomerAuthContext";

import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "@/services/cart.service";
import { getImageUrl } from "@/services/product-image.service";

export interface CartItem {
  // Supabase cart_items.id
  id: string;

  // Supabase products.id
  productId: string;

  code: string;
  name: string;
  price: number;
  image: string;
  categorySlug: string;
  productSlug: string;
  quantity: number;
  url?: string;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;

  openCart: () => void;
  closeCart: () => void;

  addItem: (
    item: Omit<CartItem, "id" | "productId" | "quantity"> & {
      productId: string;
    },
    qty?: number
  ) => Promise<void>;

  updateQty: (id: string, qty: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clear: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useCustomerAuth();

  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // =========================================================
  // LOAD CART FROM SUPABASE
  // =========================================================

  const loadCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }

    try {
      const cart = await getCart(user.id);

      setItems(
        cart.map((item) => {
          const productImages = item.products.product_images as
            | {
              storage_path: string;
              is_primary: boolean;
            }[]
            | undefined;

          const primaryImage =
            productImages?.find((img) => img.is_primary) ??
            productImages?.[0];

          return {
            id: item.id,
            productId: item.product_id,

            code: item.products.code ?? "",
            name: item.products.name,
            price: Number(item.products.price ?? 0),

            image: primaryImage
              ? getImageUrl(primaryImage.storage_path)
              : "",

            categorySlug: item.products.category_slug,
            productSlug: item.products.slug,

            quantity: item.quantity,
          };
        })
      );
    } catch (error) {
      console.error("Failed to load cart:", error);
      setItems([]);
    }
  }, [user]);
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // =========================================================
  // ADD TO CART
  // =========================================================

  const addItem = useCallback(
    async (
      item: Omit<CartItem, "id" | "productId" | "quantity"> & {
        productId: string;
      },
      qty = 1
    ) => {
      if (!user) {
        console.warn("User must be logged in to add items to cart.");
        return;
      }

      try {
        // Save to Supabase
        await addToCart(user.id, item.productId, qty);

        // Reload from Supabase
        await loadCart();

        // Open cart drawer
        setIsOpen(true);
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    },
    [user, loadCart]
  );

  // =========================================================
  // UPDATE QUANTITY
  // =========================================================

  const updateQty = useCallback(
    async (id: string, qty: number) => {
      try {
        const newQty = Math.max(0, qty);

        if (newQty === 0) {
          await removeFromCart(id);
        } else {
          await updateCartQuantity(id, newQty);
        }

        await loadCart();
      } catch (error) {
        console.error("Failed to update cart quantity:", error);
      }
    },
    [loadCart]
  );

  // =========================================================
  // REMOVE ITEM
  // =========================================================

  const removeItem = useCallback(
    async (id: string) => {
      try {
        await removeFromCart(id);
        await loadCart();
      } catch (error) {
        console.error("Failed to remove cart item:", error);
      }
    },
    [loadCart]
  );

  // =========================================================
  // CLEAR CART
  // =========================================================

  const clear = useCallback(async () => {
    if (!user) return;

    try {
      await clearCart(user.id);
      setItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  }, [user]);

  // =========================================================
  // CART CALCULATIONS
  // =========================================================

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const subtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

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
  }, [
    items,
    isOpen,
    addItem,
    updateQty,
    removeItem,
    clear,
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return ctx;
}

export const WHATSAPP_NUMBER = "919866410523";

export const formatINR = (n: number) =>
  `₹${n.toLocaleString("en-IN")}`;