"use client";

import Link from "next/link";
import { useEffect } from "react";

import { formatCurrency } from "@/lib/utils";

import { ArtworkImage } from "./artwork-image";
import { useShop } from "./shop-provider";

export function CartDrawer() {
  const { cartItems, cartOpen, closeCart, updateQuantity, removeItem } = useShop();

  useEffect(() => {
    if (!cartOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeCart();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [cartOpen, closeCart]);

  if (!cartOpen) {
    return null;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/12">
      <button type="button" aria-label="Close cart" className="absolute inset-0" onClick={closeCart} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-white px-4 py-6 sm:px-6">
        <div className="mb-8 flex items-start justify-between gap-4 border-b border-black/10 pb-4">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/45">Cart</p>
            <p className="text-sm leading-7 text-black/60">
              A temporary cart for review. Checkout can be added later.
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="text-[10px] uppercase tracking-[0.3em] text-black/70 transition-opacity hover:opacity-60"
          >
            Close
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="space-y-4 border-t border-black/10 pt-6">
              <p className="font-serif text-2xl tracking-[0.04em] text-black">The cart is empty.</p>
              <p className="max-w-sm text-sm leading-7 text-black/60">
                Add an available edition or drawing from a product page to begin a selection.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.slug} className="grid grid-cols-[96px_1fr] gap-4 border-t border-black/10 pt-4">
                <ArtworkImage artwork={item.artwork} className="p-2" />
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeCart}
                      className="font-serif text-xl tracking-[0.04em] text-black transition-opacity hover:opacity-65"
                    >
                      {item.title}
                    </Link>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-black/42">
                      {item.artistLine}
                    </p>
                    <p className="text-sm text-black/68">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-black/62">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                      className="border border-black/12 px-3 py-2 transition-colors hover:border-black/25"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      className="border border-black/12 px-3 py-2 transition-colors hover:border-black/25"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug)}
                      className="ml-2 transition-opacity hover:opacity-60"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 space-y-5 border-t border-black/10 pt-5">
          <div className="flex items-center justify-between text-sm text-black/72">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <button
            type="button"
            disabled
            className="inline-flex min-h-12 w-full items-center justify-center border border-black/12 px-5 text-[10px] uppercase tracking-[0.3em] text-black/35"
          >
            Checkout Coming Soon
          </button>
        </div>
      </aside>
    </div>
  );
}
