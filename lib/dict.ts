import { blogSection } from "./dictionary/blog-section";
import { auth } from "./dictionary/auth";
import { product } from "./dictionary/product";
import { about } from "./dictionary/about";
import { settings } from "./dictionary/settings";
import { account } from "./dictionary/account";
import { site } from "./dictionary/site";

export const dict = {
  en: {
    ...site.en,
    blogSection: blogSection.en,
    auth: auth.en,
    product: { ...product.en, ...site.en.product },
    about: about.en,
    settings: settings.en,
    account: account.en,
  },
  ja: {
    ...site.ja,
    blogSection: blogSection.ja,
    auth: auth.ja,
    product: { ...product.ja, ...site.ja.product },
    about: about.ja,
    settings: settings.ja,
    account: account.ja,
  },
} as const;

/** Replace `{name}` placeholders in a dictionary string. */
export function fill(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in values ? String(values[key]) : `{${key}}`
  );
}
