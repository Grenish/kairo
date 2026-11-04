"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { useCartState } from "@/components/providers/cart-provider";
import { ProductTile } from "@/components/shop/product-tile";
import { dict, fill } from "@/lib/dict";
import { coerceLocale } from "@/lib/i18n";
import { formatYen, getProduct } from "@/lib/catalog";
import { readOrders, type Order } from "@/lib/orders";
import { cn } from "@/lib/utils";

type Tab = "orders" | "saved" | "address";

export default function AccountPage() {
  const params = useParams();
  const lang = coerceLocale(params.lang);
  const t = dict[lang].account;
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const { saved, hydrated } = useCartState();

  useEffect(() => setOrders(readOrders()), []);

  const date = (iso: string) =>
    new Intl.DateTimeFormat(lang === "ja" ? "ja-JP" : "en-GB", {
      dateStyle: "long",
      timeZone: "Asia/Tokyo",
    }).format(new Date(iso));

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "orders", label: t.tabs.orders, count: orders?.length },
    { id: "saved", label: t.tabs.saved, count: hydrated ? saved.length : undefined },
    { id: "address", label: t.tabs.address, count: t.addresses.length },
  ];

  return (
    <div className="wrap pt-12 lg:pt-20">
      <header className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-(--gutter)">
        <h1 className="type-display text-display -ml-[0.04em] lg:col-span-7">{t.title}</h1>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="type-lead text-lead max-w-[30ch]">{t.intro}</p>
          <p className="mt-4 flex gap-6">
            <Link href={`/${lang}/settings`} className="link-quiet underline">
              {t.settings}
            </Link>
            <Link href={`/${lang}/login`} className="link-quiet underline">
              {t.signIn}
            </Link>
          </p>
        </div>
      </header>

      <div role="tablist" aria-label={t.title} className="mt-16 flex flex-wrap gap-x-8 gap-y-2 text-lead">
        {tabs.map((item) => (
          <button
            key={item.id}
            id={`tab-${item.id}`}
            role="tab"
            type="button"
            aria-selected={tab === item.id}
            aria-controls={`panel-${item.id}`}
            onClick={() => setTab(item.id)}
            className={cn(
              "link-quiet py-1",
              tab === item.id ? "underline decoration-current" : "text-ink-soft hover:text-foreground"
            )}
          >
            {item.label}
            {item.count !== undefined && (
              <span className="tabular ml-1.5 align-super text-small">{item.count}</span>
            )}
          </button>
        ))}
      </div>

      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-10">
        {tab === "orders" &&
          (orders === null ? (
            <div className="min-h-[30svh]" />
          ) : orders.length === 0 ? (
            <Empty title={t.empty.orders} body={t.empty.ordersDesc} action={t.empty.action} href={`/${lang}/shop`} />
          ) : (
            <ul className="grid gap-2">
              {orders.map((order) => (
                <li key={order.id} className="grid gap-6 bg-surface p-6 md:grid-cols-12 md:gap-x-(--gutter) md:p-8">
                  <div className="md:col-span-4">
                    <p className="type-lead text-lead tabular font-medium">{order.id}</p>
                    <p className="mt-1 text-ink-soft">{fill(t.order.placed, { date: date(order.placedAt) })}</p>
                  </div>
                  <ul className="flex flex-wrap gap-2 md:col-span-4">
                    {order.lines.map((line) => {
                      const product = getProduct(line.id, lang);
                      if (!product) return null;
                      return (
                        <li key={`${line.id}-${line.size}`}>
                          <Link
                            href={`/${lang}/shop/${product.slug}`}
                            className="relative block aspect-[4/5] w-16 overflow-hidden bg-paper"
                            aria-label={`${product.title}, ${line.size} × ${line.quantity}`}
                          >
                            <Image src={product.worn} alt="" fill sizes="64px" className="object-cover" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <dl className="tabular grid gap-1 md:col-span-4 md:text-right">
                    <div className="flex justify-between gap-4 md:justify-end">
                      <dt className="text-ink-soft">{t.order.slot}</dt>
                      <dd>{order.slot}</dd>
                    </div>
                    <div className="flex justify-between gap-4 md:justify-end">
                      <dt className="text-ink-soft">{t.order.payment}</dt>
                      <dd>{order.payment}</dd>
                    </div>
                    <div className="flex justify-between gap-4 pt-2 text-lead font-medium md:justify-end">
                      <dt>{t.order.total}</dt>
                      <dd>{formatYen(order.total)}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          ))}

        {tab === "saved" &&
          (!hydrated ? (
            <div className="min-h-[30svh]" />
          ) : saved.length === 0 ? (
            <Empty title={t.empty.saved} body={t.empty.savedDesc} action={t.empty.action} href={`/${lang}/shop`} />
          ) : (
            <ul className="grid grid-cols-2 gap-x-(--gutter) gap-y-12 lg:grid-cols-4">
              {saved.map((id) => {
                const product = getProduct(id, lang);
                return product ? (
                  <li key={id}>
                    <ProductTile product={product} lang={lang} />
                  </li>
                ) : null;
              })}
            </ul>
          ))}

        {tab === "address" && (
          <ul className="grid gap-2 md:grid-cols-2">
            {t.addresses.map((address) => (
              <li key={address.label} className="bg-surface p-6 md:p-8">
                <p className="type-lead text-lead font-medium">
                  {address.label}
                  {address.isDefault && <span className="ml-3 text-body font-normal text-ink-soft">{t.defaultAddress}</span>}
                </p>
                <address className="mt-4 not-italic">
                  {address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="tabular mt-2 block text-ink-soft">{address.phone}</span>
                </address>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Empty({
  title,
  body,
  action,
  href,
}: {
  title: string;
  body: string;
  action: string;
  href: string;
}) {
  return (
    <div className="grid min-h-[36svh] content-center gap-4 bg-surface p-8 md:p-14">
      <p className="type-lead text-lead">{title}</p>
      <p className="max-w-[44ch] text-ink-soft">{body}</p>
      <Link href={href} className={cn(buttonVariants(), "mt-2 justify-self-start")}>
        {action}
      </Link>
    </div>
  );
}
