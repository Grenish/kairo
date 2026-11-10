"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  SIZES,
  type Category,
  type Product,
} from "@/lib/catalog";
import { dict, fill } from "@/lib/dict";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ProductTile } from "./product-tile";

export type SortKey = "new" | "price-asc" | "price-desc";

export interface ShopFilters {
  category: Category | null;
  size: string | null;
  sort: SortKey;
}

/** Category, size and order, kept in the address so a filtered view can be shared. */
export function ShopInterface({
  lang,
  products,
  initial,
}: {
  lang: Locale;
  products: Product[];
  initial: ShopFilters;
}) {
  const t = dict[lang].shop;
  const pathname = usePathname();
  const [filters, setFilters] = useState<ShopFilters>(initial);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.size) params.set("size", filters.size);
    if (filters.sort !== "new") params.set("sort", filters.sort);
    const query = params.toString();
    // Next.js keeps its router in step with native history updates; no server round trip.
    window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
  }, [filters, pathname]);

  const counts = useMemo(() => {
    const map = new Map<Category, number>();
    for (const p of products) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, [products]);

  const shown = useMemo(() => {
    const list = products.filter(
      (p) =>
        (!filters.category || p.category === filters.category) &&
        (!filters.size || p.sizes.includes(filters.size))
    );
    if (filters.sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, filters]);

  const set = (patch: Partial<ShopFilters>) => setFilters((f) => ({ ...f, ...patch }));
  const filtered = filters.category !== null || filters.size !== null;

  return (
    <div className="wrap">
      <div className="grid gap-6 pb-8">
        <div>
          <p className="sr-only" id="category-label">
            {t.category}
          </p>
          <ul
            role="group"
            aria-labelledby="category-label"
            className="flex flex-wrap gap-x-6 gap-y-2 text-lead"
          >
            <li>
              <FilterButton
                on={filters.category === null}
                onClick={() => set({ category: null })}
                label={t.all}
                count={products.length}
              />
            </li>
            {CATEGORIES.filter((c) => counts.has(c)).map((c) => (
              <li key={c}>
                <FilterButton
                  on={filters.category === c}
                  onClick={() => set({ category: filters.category === c ? null : c })}
                  label={CATEGORY_LABEL[c][lang]}
                  count={counts.get(c) ?? 0}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
          <p className="tabular mr-auto text-ink-soft" aria-live="polite">
            {fill(t.results, { n: shown.length })}
          </p>
          <div className="flex items-center gap-3" role="group" aria-labelledby="size-label">
            <span id="size-label" className="text-ink-soft">
              {t.size}
            </span>
            <div className="flex">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  aria-pressed={filters.size === size}
                  onClick={() => set({ size: filters.size === size ? null : size })}
                  className={cn(
                    "press grid h-10 min-w-10 place-items-center px-2",
                    filters.size === size
                      ? "bg-foreground text-background"
                      : "hover:bg-surface"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-3">
            <span className="text-ink-soft">{t.sort}</span>
            <select
              value={filters.sort}
              onChange={(e) => set({ sort: e.target.value as SortKey })}
              className="h-10 bg-surface px-3 pr-8 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <option value="new">{t.sortNew}</option>
              <option value="price-asc">{t.sortLow}</option>
              <option value="price-desc">{t.sortHigh}</option>
            </select>
          </label>
        </div>
      </div>

      {filtered && (
        <div className="pb-6">
          <button
            type="button"
            onClick={() => set({ category: null, size: null })}
            className="link-quiet underline"
          >
            {t.clear}
          </button>
        </div>
      )}

      {shown.length === 0 ? (
        <div className="grid min-h-[40svh] place-items-center bg-surface p-10 text-center">
          <p className="type-lead text-lead max-w-[30ch]">{t.none}</p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-x-(--gutter) gap-y-12 lg:grid-cols-3 lg:gap-y-16">
          {shown.map((product, i) => (
            <li
              key={product.id}
              data-reveal
              style={{ "--d": `${(i % 3) * 70}ms` } as React.CSSProperties}
            >
              <ProductTile product={product} lang={lang} priority={i < 3} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterButton({
  on,
  onClick,
  label,
  count,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "link-quiet py-1 transition-colors",
        on ? "text-foreground underline decoration-current" : "text-ink-soft hover:text-foreground"
      )}
    >
      {label}
      <span className="tabular ml-1.5 align-super text-small">{count}</span>
    </button>
  );
}
