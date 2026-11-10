"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dict } from "@/lib/dict";
import { otherLocale, replaceLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useCartActions, useCartState } from "@/components/providers/cart-provider";
import { SearchDialog } from "./search-dialog";
import { BagDrawer } from "./bag-drawer";
import { MenuSheet } from "./menu-sheet";

export function SiteHeader({ lang }: { lang: Locale }) {
  const t = dict[lang].nav;
  const pathname = usePathname() ?? `/${lang}`;
  const { itemCount, hydrated } = useCartState();
  const { openCart } = useCartActions();
  const [searchOpen, setSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Hide while reading down the page, return as soon as the visitor scrolls up.
      setHidden(y > 160 && y > last + 2);
      if (y < last - 2 || y < 160) setHidden(false);
      setPastHero(y > window.innerHeight * 0.6);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // "/" opens search from anywhere outside a field.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      const typing =
        target instanceof Element &&
        target.closest("input, textarea, select, [contenteditable=true]") !== null;
      if (event.key === "/" && !typing && !searchOpen) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  const switchHref = replaceLocale(pathname, otherLocale(lang));

  const links = [
    { href: `/${lang}/shop`, label: t.shop },
    { href: `/${lang}/blogs`, label: t.journal },
    { href: `/${lang}/about`, label: t.about },
  ];

  const isActive = (href: string) => pathname.startsWith(href);
  const wordmarkHidden = isHome && !pastHero;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t.skip}
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 h-(--header) bg-background text-foreground transition-transform duration-300 ease-(--ease-out)",
          hidden && !searchOpen && "-translate-y-full"
        )}
      >
        <nav className="wrap grid h-full grid-cols-12 items-center gap-x-(--gutter)">
          <Link
            href={`/${lang}`}
            aria-label={t.home}
            className={cn(
              "col-span-4 justify-self-start text-[1.375rem] font-medium tracking-[-0.04em] transition-opacity duration-300 md:col-span-3",
              wordmarkHidden && "invisible opacity-0"
            )}
          >
            Kairo
          </Link>

          <ul className="col-span-4 hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "link-quiet",
                    isActive(link.href) && "underline decoration-current"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="col-span-8 flex items-center justify-end gap-5 whitespace-nowrap md:col-span-9 md:gap-7 lg:col-span-5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="link-quiet py-2"
            >
              {t.search}
            </button>
            <Link
              href={switchHref}
              hrefLang={otherLocale(lang)}
              aria-label={t.otherLanguageLabel}
              className="link-quiet hidden py-2 sm:inline"
            >
              {t.otherLanguage}
            </Link>
            <Link
              href={`/${lang}/account`}
              className="link-quiet hidden py-2 lg:inline"
            >
              {t.account}
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="link-quiet py-2"
              aria-label={`${t.bag}, ${hydrated ? itemCount : 0}`}
            >
              {t.bag}
              <span className="tabular ml-1.5 inline-block min-w-[1ch]">
                {hydrated ? itemCount : 0}
              </span>
            </button>
            <MenuSheet lang={lang} switchHref={switchHref} />
          </div>
        </nav>
      </header>

      <SearchDialog lang={lang} open={searchOpen} onOpenChange={setSearchOpen} />
      <BagDrawer lang={lang} />
    </>
  );
}
