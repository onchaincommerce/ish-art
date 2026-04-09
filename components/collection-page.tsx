import { collections, getFilteredCollectionProducts } from "@/data/store";
import type { CollectionSlug } from "@/lib/types";

import { CollectionIntro } from "./collection-intro";
import { FilterBar } from "./filter-bar";
import { Pagination } from "./pagination";
import { ProductCard } from "./product-card";

const PAGE_SIZE = 8;

interface CollectionPageProps {
  slug: CollectionSlug;
  page?: number;
  filter?: string;
}

export function CollectionPage({ slug, page = 1, filter = "all" }: CollectionPageProps) {
  const collection = collections[slug];
  const filteredProducts = getFilteredCollectionProducts(slug, filter);
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <CollectionIntro title={collection.title} intro={collection.intro} notes={collection.notes} />

      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterBar basePath={collection.href} filter={filter} options={collection.filterOptions} />
          <p className="text-[10px] uppercase tracking-[0.28em] text-black/42">
            {filteredProducts.length} works
          </p>
        </div>

        {paginatedProducts.length > 0 ? (
          <div className="grid auto-rows-fr grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                soldPresentation={collection.soldPresentation}
              />
            ))}
          </div>
        ) : (
          <div className="border-t border-black/10 pt-6">
            <p className="max-w-xl text-sm leading-7 text-black/58">
              No works match the selected filter yet. Choose another grouping to view the current selection.
            </p>
          </div>
        )}

        <Pagination
          basePath={collection.href}
          currentPage={safePage}
          totalPages={totalPages}
          filter={filter}
          label={collection.paginationLabel}
        />
      </div>
    </div>
  );
}
