"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { priceOf } from "@/lib/catalog";

/** A line in the bag. Product details are looked up from the catalogue when rendered. */
export interface CartLine {
  id: string;
  size: string;
  quantity: number;
}

interface CartStateContextType {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  saved: string[];
  hydrated: boolean;
}

interface CartActionsContextType {
  addToCart: (id: string, size: string, quantity?: number) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleSaved: (id: string) => void;
}

const BAG_KEY = "kairo-bag-v2";
const SAVED_KEY = "kairo-saved";

const CartStateContext = createContext<CartStateContextType | undefined>(
  undefined
);
const CartActionsContext = createContext<CartActionsContextType | undefined>(
  undefined
);

function readList<T>(key: string, valid: (value: unknown) => value is T): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(valid) : [];
  } catch {
    return [];
  }
}

const isLine = (value: unknown): value is CartLine =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as CartLine).id === "string" &&
  typeof (value as CartLine).size === "string" &&
  typeof (value as CartLine).quantity === "number" &&
  priceOf((value as CartLine).id) > 0;

const isString = (value: unknown): value is string => typeof value === "string";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(readList(BAG_KEY, isLine));
    setSaved(readList(SAVED_KEY, isString));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(BAG_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const addToCart = useCallback((id: string, size: string, quantity = 1) => {
    setLines((prev) => {
      const index = prev.findIndex((l) => l.id === id && l.size === size);
      if (index > -1) {
        return prev.map((l, i) =>
          i === index ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { id, size, quantity }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string, size: string) => {
    setLines((prev) => prev.filter((l) => !(l.id === id && l.size === size)));
  }, []);

  const updateQuantity = useCallback(
    (id: string, size: string, quantity: number) => {
      if (quantity < 1) return;
      setLines((prev) =>
        prev.map((l) =>
          l.id === id && l.size === size ? { ...l, quantity } : l
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const toggleSaved = useCallback((id: string) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }, []);

  const itemCount = lines.reduce((acc, l) => acc + l.quantity, 0);
  const subtotal = lines.reduce((acc, l) => acc + priceOf(l.id) * l.quantity, 0);

  const stateValue = useMemo(
    () => ({ lines, itemCount, subtotal, isCartOpen, saved, hydrated }),
    [lines, itemCount, subtotal, isCartOpen, saved, hydrated]
  );

  const actionsValue = useMemo(
    () => ({
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleSaved,
    }),
    [
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleSaved,
    ]
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

export function useCart() {
  const state = useCartState();
  const actions = useCartActions();
  return { ...state, ...actions };
}
