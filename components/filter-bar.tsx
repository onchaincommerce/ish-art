import Link from "next/link";

import type { FilterOption } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  basePath: string;
  filter?: string;
  options?: FilterOption[];
}

function buildFilterHref(basePath: string, value: string) {
  if (value === "all") {
    return basePath;
  }

  return `${basePath}?filter=${value}`;
}

export function FilterBar({ basePath, filter = "all", options }: FilterBarProps) {
  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-black/10 pb-6">
      {options.map((option) => {
        const activeValue = filter || "all";
        const active = option.value === activeValue;

        return (
          <Link
            key={option.value}
            href={buildFilterHref(basePath, option.value)}
            className={cn(
              "border px-3 py-2 text-[10px] uppercase tracking-[0.28em] transition-colors",
              active
                ? "border-black text-black"
                : "border-black/12 text-black/55 hover:border-black/25 hover:text-black/75",
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
