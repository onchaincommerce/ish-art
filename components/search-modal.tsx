"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useRef, useState } from "react";

import { collections, products } from "@/data/store";
import { formatCurrency } from "@/lib/utils";

import { ArtworkImage } from "./artwork-image";
import { useShop } from "./shop-provider";

export function SearchModal() {
  const { searchOpen, closeSearch } = useShop();

  if (!searchOpen) {
    return null;
  }

  return <SearchDialog onClose={closeSearch} />;
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const results = normalizedQuery
    ? products
        .filter((product) => {
          const collectionLabel = collections[product.collection].title.toLowerCase();
          return [product.title, product.artistLine, product.description, collectionLabel, ...product.filters]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        })
        .slice(0, 8)
    : products.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 bg-white/98">
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start justify-between gap-6 border-b border-black/10 pb-4">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/45">Search</p>
            <p className="text-sm leading-7 text-black/60">
              Search across editions, original drawings, and printed matter.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[10px] uppercase tracking-[0.3em] text-black/70 transition-opacity hover:opacity-60"
          >
            Close
          </button>
        </div>

        <label htmlFor="site-search" className="sr-only">
          Search the catalogue
        </label>
        <input
          id="site-search"
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title, medium, or collection"
          className="w-full border-b border-black/20 bg-transparent pb-5 font-serif text-3xl tracking-[0.04em] text-black outline-none placeholder:text-black/28 sm:text-5xl"
        />

        <div className="mt-8 flex-1 overflow-y-auto">
          <div className="grid gap-6 sm:grid-cols-2">
            {results.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="grid grid-cols-[96px_1fr] gap-4 border-t border-black/10 pt-4 transition-opacity hover:opacity-65"
              >
                <ArtworkImage artwork={product.artwork} className="p-2" />
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-black/45">
                    {collections[product.collection].navLabel}
                  </p>
                  <h2 className="font-serif text-xl tracking-[0.04em] text-black">{product.title}</h2>
                  <p className="text-sm text-black/62">{product.artistLine}</p>
                  <p className="text-sm text-black/72">{formatCurrency(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>

          {results.length === 0 ? (
            <p className="border-t border-black/10 pt-6 text-sm leading-7 text-black/55">
              No works matched that search. Try a shorter title, medium, or collection term.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
