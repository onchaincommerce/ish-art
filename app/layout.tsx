import type { Metadata } from "next";
import "./globals.css";

import { brand } from "@/data/store";

import { CartDrawer } from "@/components/cart-drawer";
import { SearchModal } from "@/components/search-modal";
import { ShopProvider } from "@/components/shop-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | Artist Storefront`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  keywords: [
    "artist storefront",
    "fine art editions",
    "original drawings",
    "catalogues",
    "minimal ecommerce",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full bg-white text-black">
        <ShopProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter />
          </div>
          <SearchModal />
          <CartDrawer />
        </ShopProvider>
      </body>
    </html>
  );
}
