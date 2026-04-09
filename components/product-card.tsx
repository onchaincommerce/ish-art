import Link from "next/link";

import type { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

import { ArtworkImage } from "./artwork-image";

interface ProductCardProps {
  product: Product;
  soldPresentation?: "badge" | "plain";
}

export function ProductCard({
  product,
  soldPresentation = "badge",
}: ProductCardProps) {
  return (
    <article className="group h-full">
      <Link href={`/products/${product.slug}`} className="flex h-full flex-col gap-4">
        <div className="relative">
          <ArtworkImage
            artwork={product.artwork}
            mediaAspect="portrait"
            className="transition-opacity duration-200 group-hover:opacity-90"
          />
          {product.status === "sold" && soldPresentation === "badge" ? (
            <span className="absolute left-0 top-0 bg-white/92 px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-black/70">
              Sold
            </span>
          ) : null}
        </div>

        <div className="flex min-h-32 flex-1 flex-col">
          <div className="space-y-2">
            {product.status === "sold" && soldPresentation === "plain" ? (
              <p className="text-[10px] uppercase tracking-[0.28em] text-black/55">Sold</p>
            ) : null}
            <p className="text-[10px] uppercase tracking-[0.28em] text-black/42">
              {product.artistLine}
            </p>
            <h2 className="line-clamp-2 font-serif text-xl leading-tight tracking-[0.04em] text-black underline-offset-4 group-hover:underline">
              {product.title}
            </h2>
          </div>
          <p className="mt-auto pt-4 text-sm text-black/68">{formatCurrency(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}
