"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { dict } from "@/lib/dict";
import { otherLocale, type Locale } from "@/lib/i18n";
import { ThemeSwitch } from "./theme-switch";

export function MenuSheet({
  lang,
  switchHref,
}: {
  lang: Locale;
  switchHref: string;
}) {
  const t = dict[lang].nav;
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const links = [
    { href: `/${lang}/shop`, label: t.shop },
    { href: `/${lang}/blogs`, label: t.journal },
    { href: `/${lang}/about`, label: t.about },
    { href: `/${lang}/account`, label: t.account },
    { href: `/${lang}/help`, label: t.help },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="link-quiet py-2 lg:hidden">{t.menu}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full gap-0 px-5 pt-5 pb-8 data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <SheetTitle className="text-[1.375rem]">Kairo</SheetTitle>
        <nav className="mt-10 flex-1">
          <ul className="grid gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="type-head block py-1 text-[2.75rem]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-between gap-4">
          <Link
            href={switchHref}
            hrefLang={otherLocale(lang)}
            onClick={close}
            className="link-quiet py-2"
            aria-label={t.otherLanguageLabel}
          >
            {t.otherLanguage}
          </Link>
          <ThemeSwitch lang={lang} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
