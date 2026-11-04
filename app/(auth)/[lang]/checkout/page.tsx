"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
import { dict, fill } from "@/lib/dict";
import { PREFECTURES } from "@/lib/dictionary/site";
import { coerceLocale } from "@/lib/i18n";
import { formatYen, getProduct, priceOf } from "@/lib/catalog";
import { orderTotals, saveOrder } from "@/lib/orders";
import { cn } from "@/lib/utils";

const field =
  "h-12 w-full bg-surface px-4 placeholder:text-ink-soft hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring user-invalid:outline-2 user-invalid:outline-destructive";

// Accepts 1500001, 150-0001 and full-width digits; the hint beside the field says what is expected.
const POSTAL = "[0-9０-９]{3}[-－ー]?[0-9０-９]{4}";

export default function CheckoutPage() {
  const params = useParams();
  const lang = coerceLocale(params.lang);
  const t = dict[lang].checkout;
  const router = useRouter();
  const { lines, hydrated, clearCart } = useCart();
  const [payment, setPayment] = useState("card");
  const [slot, setSlot] = useState("any");
  const [placing, setPlacing] = useState(false);
  const totals = orderTotals(lines, payment);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    setPlacing(true);
    const order = saveOrder({
      email: value("email"),
      name: value("name"),
      address: [
        `〒${value("postal")}`,
        `${value("prefecture")} ${value("city")}`,
        value("street"),
        value("building"),
      ].filter(Boolean),
      slot: t.slots.find((s) => s.id === slot)?.label ?? slot,
      payment: t.methods.find((m) => m.id === payment)?.label ?? payment,
      lines: lines.map((l) => ({ ...l, price: priceOf(l.id) })),
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      fee: totals.fee,
      total: totals.total,
    });
    clearCart();
    router.push(`/${lang}/checkout/complete?order=${order.id}`);
  };

  if (!hydrated) return <div className="min-h-[60svh]" />;

  if (lines.length === 0 && !placing) {
    return (
      <div className="wrap pt-16">
        <h1 className="type-display text-display">{t.title}</h1>
        <div className="mt-12 grid min-h-[36svh] content-center gap-6 bg-surface p-8 md:p-14">
          <p className="type-lead text-lead max-w-[30ch]">{t.empty}</p>
          <Link href={`/${lang}/shop`} className={cn(buttonVariants({ size: "lg" }), "justify-self-start")}>
            {t.browse}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap pt-8 pb-24 lg:pt-12">
      <h1 className="type-display text-display -ml-[0.04em]">{t.title}</h1>

      <div className="mt-12 grid gap-16 lg:mt-16 lg:grid-cols-12 lg:gap-x-(--gutter)">
        <form onSubmit={submit} className="grid gap-14 lg:col-span-7">
          <fieldset className="grid gap-5">
            <legend className="type-lead text-lead mb-5 font-medium">{t.contact}</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span>{t.email}</span>
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
              <label className="grid gap-2">
                <span>{t.phone}</span>
                <input name="phone" type="tel" required autoComplete="tel" className={field} />
              </label>
            </div>
          </fieldset>

          <fieldset className="grid gap-5">
            <legend className="type-lead text-lead mb-5 font-medium">{t.delivery}</legend>
            <label className="grid gap-2">
              <span>{t.name}</span>
              <input name="name" required autoComplete="name" className={field} />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span>{t.postal}</span>
                <input
                  name="postal"
                  required
                  inputMode="numeric"
                  autoComplete="postal-code"
                  pattern={POSTAL}
                  aria-describedby="postal-hint"
                  className={field}
                />
                <span id="postal-hint" className="text-ink-soft">
                  {t.postalHint}
                </span>
              </label>
              <label className="grid content-start gap-2">
                <span>{t.prefecture}</span>
                <select name="prefecture" required defaultValue="" autoComplete="address-level1" className={field}>
                  <option value="" disabled>
                    {t.choosePrefecture}
                  </option>
                  {PREFECTURES[lang].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="grid gap-2">
              <span>{t.city}</span>
              <input name="city" required autoComplete="address-level2" className={field} />
            </label>
            <label className="grid gap-2">
              <span>{t.street}</span>
              <input name="street" required autoComplete="address-line1" className={field} />
            </label>
            <label className="grid gap-2">
              <span>{t.building}</span>
              <input name="building" autoComplete="address-line2" className={field} />
            </label>
          </fieldset>

          <fieldset>
            <legend className="type-lead text-lead mb-5 font-medium">{t.slot}</legend>
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
              {t.slots.map((s) => (
                <Choice key={s.id} name="slot" value={s.id} checked={slot === s.id} onChange={setSlot} label={s.label} />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="type-lead text-lead mb-5 font-medium">{t.payment}</legend>
            <div className="grid gap-1 sm:grid-cols-2">
              {t.methods.map((m) => (
                <Choice key={m.id} name="payment" value={m.id} checked={payment === m.id} onChange={setPayment} label={m.label} />
              ))}
            </div>
            <p className="mt-5 max-w-[56ch] text-ink-soft">{t.demoNote}</p>
          </fieldset>

          <button
            type="submit"
            disabled={placing}
            className={cn(buttonVariants({ size: "lg" }), "h-16 w-full text-lead")}
          >
            {placing ? t.placing : `${t.place}, ${formatYen(totals.total)}`}
          </button>
        </form>

        <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="order-title">
          <div className="grid gap-6 bg-surface p-6 md:p-8 lg:sticky lg:top-8">
            <h2 id="order-title" className="type-lead text-lead font-medium">
              {t.summary}
            </h2>
            <ul className="grid gap-5">
              {lines.map((line) => {
                const product = getProduct(line.id, lang);
                if (!product) return null;
                return (
                  <li key={`${line.id}-${line.size}`} className="grid grid-cols-[4rem_1fr_auto] items-start gap-4">
                    <span className="relative block aspect-[4/5] overflow-hidden bg-paper">
                      <Image src={product.worn} alt="" fill sizes="64px" className="object-cover" />
                    </span>
                    <span>
                      <span className="block font-medium">
                        <span lang="ja" className="mr-2">
                          {product.word}
                        </span>
                        {product.title}
                      </span>
                      <span className="tabular block text-ink-soft">
                        {line.size} × {line.quantity}
                      </span>
                    </span>
                    <span className="tabular">{formatYen(product.price * line.quantity)}</span>
                  </li>
                );
              })}
            </ul>
            <dl className="tabular grid gap-3 pt-2">
              <Row term={t.subtotal} value={formatYen(totals.subtotal)} />
              <Row term={t.shipping} value={totals.shipping === 0 ? t.free : formatYen(totals.shipping)} />
              {totals.fee > 0 && <Row term={t.codFee} value={formatYen(totals.fee)} />}
              <div className="flex justify-between pt-3 text-lead font-medium">
                <dt>{t.total}</dt>
                <dd>{formatYen(totals.total)}</dd>
              </div>
              <p className="text-ink-soft">{fill(t.tax, { tax: formatYen(totals.tax) })}</p>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt>{term}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Choice({
  name,
  value,
  checked,
  onChange,
  label,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <label
      className={cn(
        "press flex min-h-14 cursor-pointer items-center px-4 py-3 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
        checked ? "bg-foreground text-background" : "bg-surface hover:bg-surface-2"
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {label}
    </label>
  );
}
