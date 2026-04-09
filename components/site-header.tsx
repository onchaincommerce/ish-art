"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { brand, collections } from "@/data/store";
import { cn } from "@/lib/utils";

import { useShop } from "./shop-provider";

const navigation = [
  { href: collections.catalogues.href, label: collections.catalogues.navLabel },
  { href: collections.prints.href, label: collections.prints.navLabel },
  {
    href: collections["original-drawings"].href,
    label: collections["original-drawings"].navLabel,
  },
  { href: "/about", label: "ABOUT" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openSearch } = useShop();

  function isActive(href: string) {
    return href === "/" ? pathname === href : pathname.startsWith(href);
  }

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  function handleSearchOpen() {
    closeMenu();
    openSearch();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center justify-between gap-6">
          <Link
            href="/"
            className="font-serif text-xl tracking-[0.22em] text-black transition-opacity hover:opacity-70 sm:text-2xl"
            onClick={closeMenu}
          >
            {brand.name}
          </Link>

          <div className="flex items-center gap-4 md:gap-7">
            <nav
              aria-label="Primary"
              className="hidden items-center gap-6 text-[10px] uppercase tracking-[0.28em] text-black/68 md:flex"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-opacity hover:opacity-60",
                    isActive(item.href) && "text-black",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={handleSearchOpen}
              className="flex h-8 w-8 items-center justify-center text-black/70 transition-opacity hover:opacity-60"
              aria-label="Open search"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l4 4" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((current) => !current)}
              className="text-[10px] uppercase tracking-[0.3em] text-black/70 transition-opacity hover:opacity-60 md:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              Menu
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-200 md:hidden",
            mobileMenuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <nav
            aria-label="Mobile primary"
            className="flex flex-col gap-4 border-t border-black/10 py-5 text-[10px] uppercase tracking-[0.28em] text-black/70"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn("transition-opacity hover:opacity-60", isActive(item.href) && "text-black")}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
