"use client";

import { useEffect } from "react";

/** The root layout cannot see the locale segment, so the page sets <html lang> itself. */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
