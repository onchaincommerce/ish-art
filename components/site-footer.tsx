import Link from "next/link";

import { brand, footerLinks } from "@/data/store";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md space-y-3">
            <p className="font-serif text-xl tracking-[0.1em]">{brand.name}</p>
            <p className="max-w-sm text-sm leading-7 text-black/62">{brand.description}</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.26em] text-black/60">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition-opacity hover:opacity-60">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
