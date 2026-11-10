"use client";

import Image from "next/image";
import Link from "next/link";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useCart } from "@/components/providers/cart-provider";
import { dict } from "@/lib/dict";
import { formatYen, getProduct } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** The lines of the bag, shared by the drawer and the bag page. */
export function BagLines({
  lang,
  compact = false,
  onNavigate,
}: {
  lang: Locale;
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const t = dict[lang].bag;
  const { lines, removeFromCart, updateQuantity } = useCart();

  return (
    <ul className={cn("grid", compact ? "gap-6 py-2" : "gap-10")}>
      {lines.map((line) => {
        const product = getProduct(line.id, lang);
        if (!product) return null;
        const href = `/${lang}/shop/${product.slug}`;
        return (
          <li
            key={`${line.id}-${line.size}`}
            className={cn(
              "grid items-start gap-x-5",
              compact
                ? "grid-cols-[5.5rem_1fr]"
                : "grid-cols-[7rem_1fr] md:grid-cols-[10rem_1fr]"
            )}
          >
            <Link
              href={href}
              onClick={onNavigate}
              className="relative block aspect-[4/5] overflow-hidden bg-paper"
            >
              <Image
                src={product.worn}
                alt={product.title}
                fill
                sizes={compact ? "88px" : "160px"}
                className="object-cover"
              />
            </Link>
            <div className="grid min-w-0 gap-3">
              <div className="flex items-start justify-between gap-4">
                <Link href={href} onClick={onNavigate} className="link-quiet min-w-0">
                  <span
                    lang="ja"
                    className={cn("block", compact ? "text-[1.5rem]" : "text-[2rem]")}
                  >
                    {product.word}
                  </span>
                  <span className="block font-medium">{product.title}</span>
                </Link>
                <span className="tabular shrink-0">
                  {formatYen(product.price * line.quantity)}
                </span>
              </div>
              <p className="text-ink-soft">
                {t.size} {line.size}
              </p>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center bg-surface">
                  <button
                    type="button"
                    aria-label={`${t.fewer}: ${product.title}`}
                    disabled={line.quantity <= 1}
                    onClick={() =>
                      updateQuantity(line.id, line.size, line.quantity - 1)
                    }
                    className="press grid size-10 place-items-center hover:bg-surface-2 disabled:opacity-40"
                  >
                    <IconMinus className="size-4" />
                  </button>
                  <span className="tabular w-8 text-center" aria-live="polite">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`${t.more}: ${product.title}`}
                    onClick={() =>
                      updateQuantity(line.id, line.size, line.quantity + 1)
                    }
                    className="press grid size-10 place-items-center hover:bg-surface-2"
                  >
                    <IconPlus className="size-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(line.id, line.size)}
                  className="link-quiet text-ink-soft hover:text-foreground"
                >
                  {t.remove}
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
