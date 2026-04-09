import Link from "next/link";

import { cn } from "@/lib/utils";

interface PaginationProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
  filter?: string;
  label: string;
}

function getHref(basePath: string, page: number, filter?: string) {
  const params = new URLSearchParams();

  if (page > 1) {
    params.set("page", String(page));
  }

  if (filter && filter !== "all") {
    params.set("filter", filter);
  }

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function Pagination({
  basePath,
  currentPage,
  totalPages,
  filter,
  label,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label={label} className="flex items-center justify-center gap-2 border-t border-black/10 pt-8 sm:pt-10">
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        const active = page === currentPage;

        return (
          <Link
            key={page}
            href={getHref(basePath, page, filter)}
            className={cn(
              "min-w-10 border px-3 py-2 text-center text-[10px] uppercase tracking-[0.28em] transition-colors",
              active
                ? "border-black text-black"
                : "border-black/12 text-black/55 hover:border-black/25 hover:text-black/75",
            )}
            aria-current={active ? "page" : undefined}
          >
            {page}
          </Link>
        );
      })}
    </nav>
  );
}
