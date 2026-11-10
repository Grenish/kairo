"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCartActions, useCartState } from "@/components/providers/cart-provider";
import { CATEGORY_LABEL, formatYen, type Product } from "@/lib/catalog";
import { dict, fill } from "@/lib/dict";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { SizeGuide } from "./size-guide";

// Two close-ups cut from the flat photograph: the collar, then the hem.
const CLOSEUPS = [
  { scale: 2.3, origin: "50% 22%", ratio: "aspect-[3/4]" },
  { scale: 2.1, origin: "34% 78%", ratio: "aspect-[4/5]" },
];

export function ProductView({
  product,
  lang,
}: {
  product: Product;
  lang: Locale;
}) {
  const t = dict[lang].product;
  const router = useRouter();
  const { addToCart, toggleSaved } = useCartActions();
  const { saved } = useCartState();
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );
  const [error, setError] = useState(false);
  const isSaved = saved.includes(product.id);
  const longWord = product.word.length > 2;

  const add = () => {
    if (!size) {
      setError(true);
      return false;
    }
    addToCart(product.id, size);
    return true;
  };

  const buyNow = () => {
    if (!size) {
      setError(true);
      return;
    }
    addToCart(product.id, size);
    router.push(`/${lang}/checkout`);
  };

  const gallery = [
    { key: "worn", node: <Image src={product.worn} alt={fill(t.wornAlt, { title: product.title })} fill priority sizes="(min-width: 1024px) 58vw, 86vw" className="object-cover" />, ratio: "aspect-[4/5]" },
    { key: "flat", node: <Image src={product.flat} alt={fill(t.flatAlt, { title: product.title })} fill sizes="(min-width: 1024px) 58vw, 86vw" className="object-cover" />, ratio: "aspect-square" },
  ];

  return (
    <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-y-10 lg:grid-cols-12 lg:gap-x-(--gutter)">
      <nav aria-label="Breadcrumb" className="text-ink-soft lg:col-span-12">
        <ol className="flex gap-2">
          <li>
            <Link href={`/${lang}/shop`} className="link-quiet">
              {t.breadcrumb}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={`/${lang}/shop?category=${product.category}`} className="link-quiet">
              {CATEGORY_LABEL[product.category][lang]}
            </Link>
          </li>
        </ol>
      </nav>

      {/* Pictures: stacked on desktop, a row to swipe on a phone. */}
      <div className="-mx-(--margin) lg:col-span-7 lg:mx-0">
        <ul className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-(--margin) lg:grid lg:gap-(--gutter) lg:overflow-visible lg:px-0">
          {gallery.map((item, i) => (
            <li
              key={item.key}
              className={cn("relative w-[72vw] shrink-0 snap-center overflow-hidden bg-paper md:w-[50vw] lg:w-auto", item.ratio)}
              data-reveal={i === 0 ? undefined : "mask"}
            >
              {item.node}
            </li>
          ))}
          <li className="contents lg:grid lg:grid-cols-[3fr_2fr] lg:items-end lg:gap-(--gutter)">
            {CLOSEUPS.map((c, i) => (
              <div
                key={i}
                className={cn("relative w-[52vw] shrink-0 snap-center overflow-hidden bg-paper md:w-[36vw] lg:w-auto", c.ratio)}
                data-reveal="mask"
                style={{ "--d": `${i * 120}ms` } as React.CSSProperties}
              >
                <Image
                  src={product.flat}
                  alt={fill(t.closeAlt, { title: product.title })}
                  fill
                  sizes="(min-width: 1024px) 34vw, 60vw"
                  quality={90}
                  className="object-cover"
                  style={{ transform: `scale(${c.scale})`, transformOrigin: c.origin }}
                />
              </div>
            ))}
          </li>
        </ul>
      </div>

      {/* The tag: what it is, its word, its price, and the one way to buy. */}
      <div className="lg:col-span-4 lg:col-start-9">
        <div className="lg:sticky lg:top-[calc(var(--header)+1.5rem)]">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h1 className="type-head text-[2.5rem] leading-[0.95] lg:text-[2.75rem]">
                {product.title}
              </h1>
              <p className="type-lead text-lead mt-4">
                {product.say}
                {product.aside && (
                  <>
                    {lang === "ja" ? "、" : ", "}
                    <span className="text-ink-soft">{product.aside}</span>
                  </>
                )}
              </p>
              {product.isNew && <p className="mt-2 text-ink-soft">{t.new}</p>}
            </div>
            <p
              lang="ja"
              aria-hidden
              className={cn(
                "tate shrink-0 font-medium",
                longWord ? "text-[3.25rem]" : "text-[4.5rem] lg:text-[5.5rem]"
              )}
            >
              {product.word}
            </p>
          </div>

          <p className="mt-8 flex items-baseline gap-3">
            <span className="type-lead text-lead tabular font-medium">{formatYen(product.price)}</span>
            <span className="text-ink-soft">{t.taxIncluded}</span>
          </p>

          <p className="mt-6 max-w-[44ch]">{product.description}</p>

          <div className="mt-8">
            <div className="mb-3 flex items-baseline justify-between">
              <span id="size-choice" className="font-medium">
                {t.size}
              </span>
              <SizeGuide lang={lang} />
            </div>
            <div role="radiogroup" aria-labelledby="size-choice" className="grid grid-cols-5 gap-1">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={size === s}
                  onClick={() => {
                    setSize(s);
                    setError(false);
                  }}
                  className={cn(
                    "press h-12 transition-colors",
                    size === s ? "bg-foreground text-background" : "bg-surface hover:bg-surface-2"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <p role="alert" className="mt-3 min-h-[1.5em] text-destructive">
              {error ? t.chooseSize : ""}
            </p>
          </div>

          <div className="mt-2 grid grid-cols-[1fr_auto] gap-1">
            <Button size="lg" onClick={add}>
              {t.add}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              aria-pressed={isSaved}
              onClick={() => toggleSaved(product.id)}
              className="px-5"
            >
              {isSaved ? t.saved : t.save}
            </Button>
          </div>
          <button
            type="button"
            onClick={buyNow}
            className="link-quiet mt-4 underline decoration-current"
          >
            {t.buyNow}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductFacts({ product, lang }: { product: Product; lang: Locale }) {
  const t = dict[lang].product;
  const facts = [
    { term: t.material, value: product.material },
    { term: t.madeIn, value: product.madeIn },
    { term: t.fit, value: product.fit },
    { term: t.colour, value: product.colour },
    { term: t.care, value: product.care },
    { term: t.delivery, value: t.deliveryText },
  ];
  return (
    <dl className="grid gap-x-(--gutter) gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {facts.map((fact, i) => (
        <div key={fact.term} data-reveal style={{ "--d": `${(i % 3) * 70}ms` } as React.CSSProperties}>
          <dt className="text-ink-soft">{fact.term}</dt>
          <dd className="type-lead text-lead mt-2 max-w-[24ch]">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
