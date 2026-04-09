import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { ArtworkImage } from "@/components/artwork-image";
import { ProductCard } from "@/components/product-card";
import { collections, getProductBySlug, getRelatedProducts, products } from "@/data/store";
import { formatCurrency } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Work Not Found",
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);
  const collection = collections[product.collection];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
        <div className="space-y-4">
          <ArtworkImage
            artwork={product.artwork}
            decorative={false}
            label={product.title}
            className="max-w-4xl"
          />
        </div>

        <div className="space-y-8 lg:sticky lg:top-28">
          <div className="space-y-4 border-b border-black/10 pb-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/45">
              <Link href={collection.href} className="transition-opacity hover:opacity-60">
                {collection.navLabel}
              </Link>
            </p>
            <h1 className="font-serif text-4xl tracking-[0.06em] text-black sm:text-5xl">
              {product.title}
            </h1>
            <p className="text-sm uppercase tracking-[0.22em] text-black/42">
              {product.artistLine}
            </p>
            <p className="text-lg text-black/78">{formatCurrency(product.price)}</p>
          </div>

          <div className="space-y-5 border-b border-black/10 pb-8">
            <p className="text-base leading-8 text-black/68">{product.description}</p>
            <dl className="space-y-4">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex items-start justify-between gap-4 border-t border-black/10 pt-3">
                  <dt className="text-[10px] uppercase tracking-[0.28em] text-black/45">
                    {spec.label}
                  </dt>
                  <dd className="max-w-[60%] text-right text-sm leading-7 text-black/68">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-5">
            <div className="space-y-3 border-b border-black/10 pb-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-black/45">Shipping</p>
              <p className="text-sm leading-7 text-black/68">{product.shippingDetails}</p>
            </div>
            <div className="space-y-3 border-b border-black/10 pb-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-black/45">Availability</p>
              <p className="text-sm leading-7 text-black/68">{product.availabilityNote}</p>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="space-y-8 border-t border-black/10 pt-10">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/45">From the same collection</p>
            <h2 className="font-serif text-3xl tracking-[0.06em] text-black">Related Works</h2>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((entry) => (
              <ProductCard
                key={entry.slug}
                product={entry}
                soldPresentation={collection.soldPresentation}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
