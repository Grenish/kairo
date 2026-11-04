"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { dict, fill } from "@/lib/dict";
import { formatYen, getProducts, searchProducts } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";

export function SearchDialog({
  lang,
  open,
  onOpenChange,
}: {
  lang: Locale;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = dict[lang].search;
  const [query, setQuery] = useState("");
  const all = useMemo(() => getProducts(lang), [lang]);
  const results = useMemo(() => searchProducts(query, lang), [query, lang]);
  const close = () => {
    onOpenChange(false);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[12vh] max-h-[80vh] translate-y-0 gap-6 overflow-y-auto p-6 sm:max-w-2xl md:p-8">
        <DialogTitle>{t.title}</DialogTitle>
        <label className="sr-only" htmlFor="site-search">
          {t.title}
        </label>
        <input
          id="site-search"
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.placeholder}
          autoComplete="off"
          className="h-14 w-full bg-surface px-4 text-[1.25rem] tracking-[-0.01em] placeholder:text-ink-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />

        {query.trim() !== "" && (
          <div aria-live="polite">
            {results.length === 0 ? (
              <p className="text-ink-soft">{fill(t.empty, { q: query.trim() })}</p>
            ) : (
              <>
                <p className="sr-only">{fill(t.results, { n: results.length })}</p>
                <ul className="grid gap-1">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/${lang}/shop/${p.slug}`}
                        onClick={close}
                        className="press group grid grid-cols-[4rem_1fr_auto] items-center gap-4 p-2 hover:bg-surface"
                      >
                        <span className="relative block aspect-[4/5] w-16 overflow-hidden bg-paper">
                          <Image src={p.worn} alt="" fill sizes="64px" className="object-cover" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[1.125rem] font-medium">
                            <span lang="ja" className="mr-2">
                              {p.word}
                            </span>
                            {p.title}
                          </span>
                          <span className="block text-ink-soft">{p.gloss}</span>
                        </span>
                        <span className="tabular">{formatYen(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        <div>
          <p className="mb-3 text-ink-soft">{t.words}</p>
          <ul className="flex flex-wrap gap-2">
            {all.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setQuery(p.word)}
                  className="press bg-surface px-3 py-2 hover:bg-surface-2"
                >
                  <span lang="ja">{p.word}</span>
                  <span className="ml-2 text-ink-soft">{p.gloss}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
