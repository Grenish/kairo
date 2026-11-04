"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartActions } from "@/components/providers/cart-provider";
import { formatYen, type Product } from "@/lib/catalog";
import { dict, fill } from "@/lib/dict";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * One piece in the catalogue: the photograph worn, turning to the garment alone on hover,
 * its word and its price. Pointer and keyboard users can add a size without leaving the grid.
 */
export function ProductTile({
  product,
  lang,
  priority = false,
  className,
  quickAdd = true,
}: {
  product: Product;
  lang: Locale;
  priority?: boolean;
  className?: string;
  quickAdd?: boolean;
}) {
  const t = dict[lang].shop;
  const { addToCart } = useCartActions();
  const href = `/${lang}/shop/${product.slug}`;

  return (
    <article className={cn("group/tile relative", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-paper">
        <Link href={href} tabIndex={-1} aria-hidden className="absolute inset-0">
          <Image
            src={product.worn}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover transition-[opacity,transform] duration-700 ease-(--ease-out) group-hover/tile:opacity-0"
          />
          <Image
            src={product.flat}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="scale-[1.04] object-cover opacity-0 transition-[opacity,transform] duration-700 ease-(--ease-out) group-hover/tile:scale-100 group-hover/tile:opacity-100"
          />
        </Link>

        {quickAdd && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 items-center gap-1 bg-paper p-2 text-paper-ink opacity-0 transition-[opacity,transform] duration-300 ease-(--ease-out) group-focus-within/tile:pointer-events-auto group-focus-within/tile:translate-y-0 group-focus-within/tile:opacity-100 [@media(hover:hover)]:flex [@media(hover:hover)]:group-hover/tile:pointer-events-auto [@media(hover:hover)]:group-hover/tile:translate-y-0 [@media(hover:hover)]:group-hover/tile:opacity-100">
            <span className="mr-auto pl-2">{t.quickAdd}</span>
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => addToCart(product.id, size)}
                aria-label={fill(t.quickAddLabel, { title: product.title, size })}
                className="press grid h-10 min-w-10 place-items-center px-2 hover:bg-paper-ink hover:text-paper focus-visible:bg-paper-ink focus-visible:text-paper"
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      <Link href={href} className="mt-4 grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5">
        <span className="font-medium">
          <span lang="ja" className="mr-2 text-[1.25rem] leading-none">
            {product.word}
          </span>
          <span className="link-quiet group-hover/tile:decoration-current">{product.title}</span>
        </span>
        <span className="tabular">{formatYen(product.price)}</span>
        <span className="col-span-2 text-ink-soft">
          {product.gloss}
          {product.isNew ? (lang === "ja" ? `・${t.newPiece}` : `, ${t.newPiece.toLowerCase()}`) : ""}
        </span>
      </Link>
    </article>
  );
}
