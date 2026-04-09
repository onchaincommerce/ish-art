"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { CartItem, Product } from "@/lib/types";

interface ShopContextValue {
  cartItems: CartItem[];
  cartCount: number;
  searchOpen: boolean;
  cartOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
}

const CART_STORAGE_KEY = "ish-art-cart";

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    try {
      return JSON.parse(storedCart) as CartItem[];
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function openSearch() {
    setCartOpen(false);
    setSearchOpen(true);
  }

  function closeSearch() {
    setSearchOpen(false);
  }

  function openCart() {
    setSearchOpen(false);
    setCartOpen(true);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function addItem(product: Product) {
    if (product.status === "sold") {
      return;
    }

    setCartOpen(true);
    setSearchOpen(false);

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.slug === product.slug);

      if (existingItem) {
        return currentItems.map((item) =>
          item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...currentItems,
        {
          slug: product.slug,
          title: product.title,
          artistLine: product.artistLine,
          price: product.price,
          artwork: product.artwork,
          quantity: 1,
        },
      ];
    });
  }

  function updateQuantity(slug: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(slug);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) => (item.slug === slug ? { ...item, quantity } : item)),
    );
  }

  function removeItem(slug: string) {
    setCartItems((currentItems) => currentItems.filter((item) => item.slug !== slug));
  }

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        cartCount,
        searchOpen,
        cartOpen,
        openSearch,
        closeSearch,
        openCart,
        closeCart,
        addItem,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used inside ShopProvider.");
  }

  return context;
}
