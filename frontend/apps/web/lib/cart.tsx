"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product, Shade, CartItem } from "./types";

interface CartContextType {
  items: CartItem[];
  add: (product: Product, shade: Shade, quantity?: number) => void;
  remove: (productId: string, shadeId: string) => void;
  update: (productId: string, shadeId: string, quantity: number) => void;
  clear: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "mona-empire-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        setItems(parsed);
      } catch {
        // Invalid data, ignore
      }
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const add = (product: Product, shade: Shade, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.shade.id === shade.id
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.shade.id === shade.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, shade, quantity }];
    });
  };

  const remove = (productId: string, shadeId: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.shade.id === shadeId)
      )
    );
  };

  const update = (productId: string, shadeId: string, quantity: number) => {
    if (quantity <= 0) {
      remove(productId, shadeId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.shade.id === shadeId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clear = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

