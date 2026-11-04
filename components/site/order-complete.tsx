"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { dict, fill } from "@/lib/dict";
import { formatYen, getProduct } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { readOrder, type Order } from "@/lib/orders";
import { cn } from "@/lib/utils";

/** The receipt, read back from this browser's saved orders. */
export function OrderComplete({ lang, id }: { lang: Locale; id: string }) {
  const t = dict[lang].complete;
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(readOrder(id) ?? null);
  }, [id]);

  if (order === undefined) return <div className="min-h-[60svh]" />;

  return (
    <div className="wrap pt-8 pb-24 lg:pt-12">
      <h1 className="type-display text-display -ml-[0.04em]">
        <span className="line-mask">
          <span className="load-line">{t.title}</span>
        </span>
      </h1>

      {order === null ? (
        <p className="type-lead text-lead mt-10 max-w-[36ch]">{t.missing}</p>
      ) : (
        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-x-(--gutter)">
          <div className="lg:col-span-6">
            <p className="type-lead text-lead max-w-[30ch]">
              {fill(t.body, { id: order.id })}
            </p>
            <dl className="mt-10 grid gap-6">
              <div>
                <dt className="text-ink-soft">{t.deliverTo}</dt>
                <dd className="mt-1">
                  {[order.name, ...order.address].map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-ink-soft">{t.slot}</dt>
                <dd className="mt-1">{order.slot}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">{t.payment}</dt>
                <dd className="mt-1">{order.payment}</dd>
              </div>
            </dl>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Link href={`/${lang}/shop`} className={buttonVariants({ size: "lg" })}>
                {t.continue}
              </Link>
              <Link href={`/${lang}/account`} className="link-quiet underline">
                {t.orders}
              </Link>
            </div>
          </div>

          <ul className="grid content-start gap-5 self-start bg-surface p-6 md:p-8 lg:col-span-5 lg:col-start-8">
            {order.lines.map((line) => {
              const product = getProduct(line.id, lang);
              if (!product) return null;
              return (
                <li key={`${line.id}-${line.size}`} className="grid grid-cols-[4.5rem_1fr_auto] items-start gap-4">
                  <span className="relative block aspect-[4/5] overflow-hidden bg-paper">
                    <Image src={product.worn} alt="" fill sizes="72px" className="object-cover" />
                  </span>
                  <span>
                    <span lang="ja" className="block text-[1.5rem] leading-tight">
                      {product.word}
                    </span>
                    <span className="block">{product.title}</span>
                    <span className="tabular block text-ink-soft">
                      {line.size} × {line.quantity}
                    </span>
                  </span>
                  <span className="tabular">{formatYen(line.price * line.quantity)}</span>
                </li>
              );
            })}
            <li className={cn("tabular flex justify-between pt-3 text-lead font-medium")}>
              <span>{dict[lang].checkout.total}</span>
              <span>{formatYen(order.total)}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
