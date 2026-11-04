"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dict } from "@/lib/dict";
import { otherLocale, replaceLocale, type Locale } from "@/lib/i18n";
import { ThemeSwitch } from "./theme-switch";

function Scallops({ count, className }: { count: number; className?: string }) {
  return (
    <div className={className} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="block aspect-[2/1] flex-1 rounded-t-full bg-paper" />
      ))}
    </div>
  );
}

export function SiteFooter({ lang }: { lang: Locale }) {
  const t = dict[lang].footer;
  const nav = dict[lang].nav;
  const pathname = usePathname() ?? `/${lang}`;
  const [email, setEmail] = useState("");

  const subscribe = (event: React.FormEvent) => {
    event.preventDefault();
    // No mailing-list service is connected yet: hand the request to the visitor's mail app.
    const subject = encodeURIComponent("Kairo seasonal letter");
    const body = encodeURIComponent(`Please add ${email} to the seasonal letter.`);
    window.location.href = `mailto:${t.email}?subject=${subject}&body=${body}`;
  };

  const contact = [
    { label: t.email, href: `mailto:${t.email}` },
    { label: t.phone, href: `tel:${t.phone.replace(/[^\d+]/g, "")}` },
    {
      label: t.street,
      href: "https://maps.google.com/?q=4-26-12+Jingumae+Shibuya+Tokyo",
    },
    { label: t.instagram, href: "https://instagram.com" },
  ];

  return (
    <footer className="wrap pt-28 pb-10 md:pt-32" lang={lang}>
      <div className="mx-auto md:w-[calc(100%*10/12)]">
        <Scallops count={12} className="hidden md:flex" />
        <Scallops count={6} className="flex md:hidden" />
        <div className="relative grid gap-12 bg-paper px-6 pt-8 pb-8 text-paper-ink md:grid-cols-2 md:gap-16 md:px-12 md:pt-10">
          <div>
            <h2 className="type-lead text-lead font-medium">{t.signoff}</h2>
            <p className="mt-4 max-w-[38ch]">{t.message}</p>
            <form onSubmit={subscribe} className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
              <label htmlFor="footer-email" className="sr-only">
                {t.emailLabel}
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailLabel}
                autoComplete="email"
                className="h-12 w-full min-w-0 bg-paper-2 px-4 sm:flex-1 text-paper-ink placeholder:text-paper-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper-ink"
              />
              <button
                type="submit"
                className="press h-12 bg-paper-ink px-6 font-medium text-paper hover:bg-paper-ink/88"
              >
                {t.subscribe}
              </button>
            </form>
          </div>

          <div className="relative md:pr-28">
            <figure className="absolute top-0 right-0 hidden w-[5.5rem] bg-paper-2 p-1.5 md:block">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/store.png"
                  alt={t.stampAlt}
                  fill
                  sizes="88px"
                  className="object-cover object-[38%_50%]"
                />
              </div>
            </figure>
            <ul className="grid gap-3">
              {contact.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="link-quiet"
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-small text-center text-paper-soft md:col-span-2">
            {t.imprint}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {t.links.map((link) => (
              <li key={link.href}>
                <Link href={`/${lang}${link.href}`} className="link-quiet">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6">
            <Link
              href={replaceLocale(pathname, otherLocale(lang))}
              hrefLang={otherLocale(lang)}
              aria-label={nav.otherLanguageLabel}
              className="link-quiet"
            >
              {nav.otherLanguage}
            </Link>
            <ThemeSwitch lang={lang} />
          </div>
        </div>
        <p className="text-small mt-6 max-w-[70ch] text-ink-soft">{t.credits}</p>
      </div>
    </footer>
  );
}
