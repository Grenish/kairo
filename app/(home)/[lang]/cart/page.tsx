"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { useCartState } from "@/components/providers/cart-provider";
import { BagLines } from "@/components/site/bag-lines";
import { FreeShippingNote } from "@/components/site/bag-drawer";
import { dict } from "@/lib/dict";
import { coerceLocale } from "@/lib/i18n";
import { formatYen } from "@/lib/catalog";
import { orderTotals } from "@/lib/orders";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const params = useParams();
  const lang = coerceLocale(params.lang);
  const t = dict[lang];
  const { lines, hydrated } = useCartState();
  const totals = orderTotals(lines);

  return (
    <div className="wrap pt-12 lg:pt-20">
      <h1 className="type-display text-display -ml-[0.04em]">{t.cartPage.title}</h1>

      {!hydrated ? (
        <div className="mt-16 min-h-[40svh]" />
      ) : lines.length === 0 ? (
        <div className="mt-16 grid min-h-[40svh] content-center gap-5 bg-surface p-8 md:p-14">
          <p className="type-head text-head max-w-[14ch]">{t.bag.empty}</p>
          <p className="max-w-[40ch]">{t.bag.emptyNote}</p>
          <Link href={`/${lang}/shop`} className={cn(buttonVariants({ size: "lg" }), "justify-self-start")}>
            {t.bag.browse}
          </Link>
        </div>
      ) : (
        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-x-(--gutter)">
          <div className="lg:col-span-7">
            <BagLines lang={lang} />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="summary-title">
            <div className="grid gap-6 bg-surface p-6 md:p-8 lg:sticky lg:top-[calc(var(--header)+1.5rem)]">
              <h2 id="summary-title" className="type-lead text-lead font-medium">
                {t.cartPage.summary}
              </h2>
              <dl className="tabular grid gap-3">
                <div className="flex justify-between">
                  <dt>{t.checkout.subtotal}</dt>
                  <dd>{formatYen(totals.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{t.cartPage.shipping}</dt>
                  <dd>{totals.shipping === 0 ? t.cartPage.free : formatYen(totals.shipping)}</dd>
                </div>
                <div className="flex justify-between pt-3 text-lead font-medium">
                  <dt>{t.cartPage.total}</dt>
                  <dd>{formatYen(totals.total)}</dd>
                </div>
              </dl>
              <FreeShippingNote lang={lang} subtotal={totals.subtotal} />
              <Link href={`/${lang}/checkout`} className={cn(buttonVariants({ size: "lg" }), "w-full")}>
                {t.bag.checkout}
              </Link>
              <Link href={`/${lang}/shop`} className="link-quiet justify-self-start underline">
                {t.cartPage.continue}
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
