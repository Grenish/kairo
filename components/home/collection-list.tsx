"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORY_LABEL, formatYen, type Product } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ListText = { before: string; after: string; note: string; all: string };

/**
 * The collection as a glossary: one row per word. On desktop a frame rides down the middle
 * of the list and shows the piece of the row it is passing; that row takes the paper band.
 */
export function CollectionList({
  lang,
  t,
  products,
}: {
  lang: Locale;
  t: ListText;
  products: Product[];
}) {
  const [active, setActive] = useState(-1);
  const [hovered, setHovered] = useState<number | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const frame = frameRef.current?.getBoundingClientRect();
      if (!frame || frame.width === 0) return;
      const y = frame.top + frame.height / 2;
      const index = rowRefs.current.findIndex((row) => {
        const r = row?.getBoundingClientRect();
        return r ? y >= r.top && y < r.bottom : false;
      });
      setActive(index);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const shown = hovered ?? (active >= 0 ? active : 0);

  return (
    <section aria-labelledby="list-title" className="relative mt-32 lg:mt-48">
      <div className="relative">
        {/* The riding frame: sticky in a centred column that spans heading and rows. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-[22%] max-w-[22rem] -translate-x-1/2 lg:block"
          aria-hidden
        >
          <div
            ref={frameRef}
            className="sticky top-[calc(50svh-min(16rem,32svh))] aspect-[4/5] max-h-[64svh] w-full overflow-hidden bg-paper"
          >
            {products.map((p, i) => (
              <Image
                key={p.id}
                src={p.worn}
                alt=""
                fill
                sizes="22vw"
                className={cn(
                  "object-cover transition-opacity duration-500 ease-(--ease-out)",
                  i === shown ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
          </div>
        </div>

        <div className="wrap grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 pb-10 lg:min-h-[min(32rem,64svh)] lg:pb-14">
          <h2
            id="list-title"
            className="type-head text-head col-span-3 flex items-center justify-center gap-4 lg:justify-between lg:gap-0"
          >
            <span className="lg:w-[calc(50%-12rem)] lg:text-right" data-reveal>
              {t.before}
            </span>
            <span className="relative block aspect-[4/5] w-[34vw] overflow-hidden bg-paper lg:hidden" aria-hidden>
              <Image src={products[0].worn} alt="" fill sizes="34vw" className="object-cover" />
            </span>
            <span className="lg:w-[calc(50%-12rem)]" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
              {t.after}
            </span>
          </h2>
          <p className="col-span-3 mt-6 text-center text-ink-soft lg:hidden">{t.note}</p>
        </div>

        <ul onPointerLeave={() => setHovered(null)}>
          {products.map((p, i) => {
            const on = (hovered ?? active) === i;
            return (
              <li
                key={p.id}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className={cn(
                  "transition-colors duration-300",
                  on
                    ? "bg-paper text-paper-ink"
                    : i % 2 === 0
                      ? "bg-surface"
                      : "bg-background"
                )}
              >
                <Link
                  href={`/${lang}/shop/${p.slug}`}
                  onPointerEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  className="wrap grid min-h-[5.25rem] grid-cols-[4rem_1fr] items-center gap-x-4 py-3 lg:grid-cols-2 lg:gap-x-[24%] lg:py-4"
                  data-reveal
                  style={{ "--d": `${Math.min(i, 4) * 60}ms` } as React.CSSProperties}
                >
                  <span className="relative block aspect-[4/5] overflow-hidden bg-paper lg:hidden">
                    <Image src={p.worn} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <span className="grid min-w-0 gap-0.5 lg:block">
                    <span className="type-lead text-lead block font-medium">
                      <span lang="ja" className="mr-3">
                        {p.word}
                      </span>
                      {p.say}
                    </span>
                    <span className={cn("block", on ? "text-paper-soft" : "text-ink-soft")}>
                      {p.aside ? `${p.aside}${lang === "ja" ? "。" : ". "}` : ""}
                      {p.kind}
                    </span>
                    <span className="tabular block lg:hidden">{formatYen(p.price)}</span>
                  </span>
                  <span className="hidden items-end justify-between gap-6 self-end lg:flex">
                    <span className={on ? "text-paper-soft" : "text-ink-soft"}>
                      {CATEGORY_LABEL[p.category][lang]}
                      {p.isNew ? (lang === "ja" ? "・新作" : ", new") : ""}
                    </span>
                    <span className="tabular">{formatYen(p.price)}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="wrap mt-10 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
        <p className="hidden max-w-[48ch] text-ink-soft lg:block">{t.note}</p>
        <Link href={`/${lang}/shop`} className="link-quiet text-lead underline decoration-current">
          {t.all.replace("{n}", String(products.length))}
        </Link>
      </div>
    </section>
  );
}
