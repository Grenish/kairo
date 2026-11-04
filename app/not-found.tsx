"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { SearchDialog } from "@/components/site/search-dialog";
import { dict } from "@/lib/dict";
import { coerceLocale } from "@/lib/i18n";
import { getProducts } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const params = useParams();
  const lang = coerceLocale(params?.lang);
  const t = dict[lang];
  const [searchOpen, setSearchOpen] = useState(false);
  const words = getProducts(lang);

  return (
    <div className="wrap flex min-h-svh flex-col py-6">
      <Link href={`/${lang}`} className="self-start text-[1.375rem] font-medium tracking-[-0.04em]">
        Kairo
      </Link>
      <main id="main" className="grid flex-1 content-center gap-10 py-16 lg:grid-cols-12 lg:gap-x-(--gutter)">
        <div className="lg:col-span-7">
          <p lang="ja" aria-hidden className="type-display text-display text-ink-soft">
            無
          </p>
          <h1 className="type-head text-head mt-6 max-w-[14ch]">{t.notFound.title}</h1>
          <p className="mt-6 max-w-[44ch]">{t.notFound.body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href={`/${lang}/shop`} className={cn(buttonVariants({ size: "lg" }))}>
              {t.notFound.shop}
            </Link>
            <button type="button" onClick={() => setSearchOpen(true)} className="link-quiet underline">
              {t.nav.search}
            </button>
          </div>
        </div>
        <ul className="grid content-end gap-1 lg:col-span-4 lg:col-start-9">
          {words.map((p) => (
            <li key={p.id}>
              <Link
                href={`/${lang}/shop/${p.slug}`}
                className="press flex items-baseline justify-between gap-4 bg-surface px-4 py-3 hover:bg-surface-2"
              >
                <span>
                  <span lang="ja" className="mr-3 text-[1.25rem]">
                    {p.word}
                  </span>
                  {p.say}
                </span>
                <span className="text-ink-soft">{p.aside}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SearchDialog lang={lang} open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
