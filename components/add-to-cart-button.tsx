"use client";

import { useState } from "react";

import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

import { useShop } from "./shop-provider";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useShop();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={product.status === "sold"}
      className={cn(
        "inline-flex min-h-12 items-center justify-center border px-5 text-[10px] uppercase tracking-[0.3em] transition-colors",
        product.status === "sold"
          ? "cursor-not-allowed border-black/12 text-black/35"
          : "border-black text-black hover:bg-black hover:text-white",
      )}
    >
      {product.status === "sold" ? "Sold Out" : added ? "Added" : "Add to Cart"}
    </button>
  );
}
