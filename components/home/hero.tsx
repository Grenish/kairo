"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { formatYen, type Product } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type HeroText = {
  support: string;
  action: string;
  pick: string;
  view: string;
};

const HOLD_MS = 5600;

/**
 * The first screen: one garment, large, on a paper plinth, with the word it is named for
 * set top to bottom beside it. The visitor can choose another word; otherwise the pieces
 * change by a slow crossfade.
 */
export function Hero({
  lang,
  t,
  products,
}: {
  lang: Locale;
  t: HeroText;
  products: Product[];
}) {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useRef(true);
  const current = products[index];

  const choose = useCallback((i: number) => {
    setChosen(true);
    setIndex(i);
  }, []);

  // Pause while the hero is off screen or the tab is hidden; never under reduced motion.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || chosen) return;
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    if (sectionRef.current) io.observe(sectionRef.current);
    const timer = window.setInterval(() => {
      if (!visible.current || document.hidden) return;
      setIndex((i) => (i + 1) % products.length);
    }, HOLD_MS);
    return () => {
      window.clearInterval(timer);
      io.disconnect();
    };
  }, [chosen, products.length]);

  const href = `/${lang}/shop/${current.slug}`;
  const longWord = current.word.length > 2;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="wrap relative grid grid-cols-4 gap-x-(--gutter) pt-4 pb-10 lg:grid-cols-12 lg:pb-8 lg:min-h-[calc(100svh-var(--header))]"
    >
      {/* Name, sentence, action and the words: the left column on desktop. */}
      <div className="col-span-4 flex flex-col lg:col-span-3 lg:justify-between lg:pb-2">
        <div>
          <h1
            id="hero-title"
            className="type-display -ml-[0.04em] text-[19vw] sm:text-display lg:text-[length:min(var(--text-display),9.6vw)]"
          >
            <span className="line-mask">
              <span className="load-line">Kairo</span>
            </span>
          </h1>
          <p
            className="load-rise type-lead text-lead mt-5 max-w-[24ch] lg:mt-8"
            style={{ "--d": "380ms" } as React.CSSProperties}
          >
            {t.support}
          </p>
          <Link
            href={`/${lang}/shop`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "load-rise mt-6 w-full sm:w-auto lg:hidden"
            )}
            style={{ "--d": "460ms" } as React.CSSProperties}
          >
            {t.action}
          </Link>
        </div>

        <div className="order-last mt-6 lg:order-none lg:mt-0">
          <p id="hero-pick" className="sr-only">
            {t.pick}
          </p>
          <ul
            role="group"
            aria-labelledby="hero-pick"
            className="grid grid-cols-5 gap-1 lg:grid-cols-1 lg:gap-0"
          >
            {products.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  aria-pressed={i === index}
                  aria-label={`${p.word} ${p.say}${p.aside ? `, ${p.aside}` : ""}`}
                  onClick={() => choose(i)}
                  className={cn(
                    "press flex h-11 w-full items-center justify-center transition-colors lg:grid lg:h-8 lg:grid-cols-[5.5em_1fr] lg:justify-start lg:text-left",
                    i === index
                      ? "bg-foreground text-background lg:bg-transparent lg:text-foreground"
                      : "bg-surface text-foreground/70 hover:text-foreground lg:bg-transparent"
                  )}
                >
                  <span
                    lang="ja"
                    className={cn("leading-none", p.word.length > 2 && "max-lg:text-small")}
                  >
                    {p.word}
                  </span>
                  <span
                    className={cn(
                      "hidden lg:inline",
                      i === index && "underline underline-offset-[0.25em]"
                    )}
                  >
                    {p.say}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <Link
            href={`/${lang}/shop`}
            className={cn(buttonVariants({ size: "lg" }), "mt-6 hidden w-full lg:inline-flex")}
          >
            {t.action}
          </Link>
        </div>
      </div>

      {/* The plinth: a paper square, the garment on it. */}
      <div className="col-span-4 mt-8 lg:col-span-6 lg:mt-0 lg:flex lg:items-center">
        <Link
          href={href}
          aria-label={`${current.title}, ${formatYen(current.price)}`}
          className="load-open group relative block aspect-square w-full overflow-hidden bg-paper lg:max-h-[calc(100svh-var(--header)-3rem)]"
        >
          {products.map((p, i) => (
            <Image
              key={p.id}
              src={p.flat}
              alt=""
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={cn(
                "object-cover transition-opacity duration-[1600ms] ease-(--ease-soft)",
                i === index ? "hero-drift opacity-100" : "opacity-0"
              )}
            />
          ))}
        </Link>
      </div>

      {/* The name tag: the word top to bottom, then what the piece is and what it costs. */}
      <div
        className="col-span-4 mt-5 flex items-start justify-between gap-6 lg:col-span-3 lg:mt-0 lg:flex-col lg:justify-between lg:pb-2"
        aria-live="polite"
      >
        <p
          lang="ja"
          key={current.id}
          className={cn(
            "hero-word font-medium lg:tate",
            longWord
              ? "text-head leading-none"
              : "text-head leading-none lg:text-display"
          )}
        >
          {current.word}
        </p>
        <div className="text-right lg:text-left">
          <p className="type-lead text-lead">
            {current.say}
            {current.aside && (
              <>
                {lang === "ja" ? "、" : ", "}
                <span className="text-ink-soft">{current.aside}</span>
              </>
            )}
          </p>
          <p className="mt-1">{current.kind}</p>
          <p className="tabular mt-1">{formatYen(current.price)}</p>
          <Link href={href} className="link-quiet mt-4 hidden underline decoration-current lg:inline-block">
            {t.view}
          </Link>
        </div>
      </div>
    </section>
  );
}
