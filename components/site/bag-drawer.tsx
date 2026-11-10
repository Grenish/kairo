"use client";

import Link from "next/link";
import { useCart } from "@/components/providers/cart-provider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { dict, fill } from "@/lib/dict";
import { SHOP, formatYen } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { BagLines } from "./bag-lines";

export function FreeShippingNote({
  lang,
  subtotal,
}: {
  lang: Locale;
  subtotal: number;
}) {
  const t = dict[lang].bag;
  const remaining = Math.max(0, SHOP.freeShippingFrom - subtotal);
  const share = Math.min(1, subtotal / SHOP.freeShippingFrom);
  return (
    <div>
      <p className="mb-2">
        {remaining === 0
          ? t.freeShipping
          : fill(t.awayFromFree, { amount: formatYen(remaining) })}
      </p>
      <div className="h-1 bg-surface-2" aria-hidden>
        <div
          className="h-full origin-left bg-foreground transition-transform duration-500 ease-(--ease-out)"
          style={{ transform: `scaleX(${share})` }}
        />
      </div>
    </div>
  );
}

export function BagDrawer({ lang }: { lang: Locale }) {
  const t = dict[lang].bag;
  const { lines, itemCount, subtotal, isCartOpen, openCart, closeCart } =
    useCart();

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={(open) => (open ? openCart() : closeCart())}
    >
      <SheetContent
        side="right"
        className="w-full gap-0 data-[side=right]:w-full data-[side=right]:sm:max-w-[28rem]"
      >
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle>{t.title}</SheetTitle>
          <SheetDescription className="tabular">
            {itemCount === 1 ? t.countOne : fill(t.count, { n: itemCount })}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col justify-center gap-4 px-6 pb-24">
            <p className="type-lead text-lead">{t.empty}</p>
            <p className="text-ink-soft">{t.emptyNote}</p>
            <Link
              href={`/${lang}/shop`}
              onClick={closeCart}
              className={cn(buttonVariants(), "mt-2 self-start")}
            >
              {t.browse}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6" data-lenis-prevent>
              <BagLines lang={lang} compact onNavigate={closeCart} />
            </div>
            <div className="grid gap-5 bg-surface px-6 pt-5 pb-6">
              <FreeShippingNote lang={lang} subtotal={subtotal} />
              <div className="flex items-baseline justify-between text-[1.25rem]">
                <span>{t.subtotal}</span>
                <span className="tabular font-medium">{formatYen(subtotal)}</span>
              </div>
              <div className="grid gap-2">
                <Link
                  href={`/${lang}/checkout`}
                  onClick={closeCart}
                  className={cn(buttonVariants({ size: "lg" }), "w-full")}
                >
                  {t.checkout}
                </Link>
                <div className="flex items-center justify-between pt-1 text-ink-soft">
                  <Link
                    href={`/${lang}/cart`}
                    onClick={closeCart}
                    className="link-quiet text-foreground"
                  >
                    {t.viewBag}
                  </Link>
                  <span className="text-small">{t.taxNote}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
