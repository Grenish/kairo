"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Product } from "@/components/product-card";

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

interface CartStateContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
}

interface CartActionsContextType {
  addToCart: (product: Product, quantity: number, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartStateContext = createContext<CartStateContextType | undefined>(
  undefined
);
const CartActionsContext = createContext<CartActionsContextType | undefined>(
  undefined
);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("kairo-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to local storage whenever items change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("kairo-cart", JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addToCart = useCallback(
    (product: Product, quantity: number, size: string) => {
      setItems((prev) => {
        const existingItemIndex = prev.findIndex(
          (item) => item.id === product.id && item.selectedSize === size
        );

        if (existingItemIndex > -1) {
          const newItems = [...prev];
          newItems[existingItemIndex].quantity += quantity;
          return newItems;
        }

        return [...prev, { ...product, quantity, selectedSize: size }];
      });
      setIsCartOpen(true);
    },
    []
  );

  const removeFromCart = useCallback((productId: string, size: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.selectedSize === size)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number) => {
      if (quantity < 1) return;
      setItems((prev) =>
        prev.map((item) =>
          item.id === productId && item.selectedSize === size
            ? { ...item, quantity }
            : item
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const stateValue = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isCartOpen,
    }),
    [items, itemCount, subtotal, isCartOpen]
  );

  const actionsValue = useMemo(
    () => ({
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
    }),
    [addToCart, removeFromCart, updateQuantity, clearCart, openCart, closeCart]
  );

  return (
    <CartStateContext.Provider value={stateValue}>
      <CartActionsContext.Provider value={actionsValue}>
        {children}
      </CartActionsContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCartState() {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useCartState must be used within a CartProvider");
  }
  return context;
}

export function useCartActions() {
  const context = useContext(CartActionsContext);
  if (context === undefined) {
    throw new Error("useCartActions must be used within a CartProvider");
  }
  return context;
}

// Legacy hook for backward compatibility (combines both)
export function useCart() {
  const state = useCartState();
  const actions = useCartActions();
  return { ...state, ...actions };
}
