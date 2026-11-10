import Link from "next/link";
import { notFound } from "next/navigation";
import { dict } from "@/lib/dict";
import { isLocale } from "@/lib/i18n";
import { HtmlLang } from "@/components/site/html-lang";

/** Checkout keeps only the way back: no navigation, no footer. */
export default async function CheckoutLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang];

  return (
    <div className="min-h-svh bg-background">
      <HtmlLang lang={lang} />
      <header className="wrap flex h-(--header) items-center justify-between">
        <Link
          href={`/${lang}`}
          aria-label={t.nav.home}
          className="text-[1.375rem] font-medium tracking-[-0.04em]"
        >
          Kairo
        </Link>
        <Link href={`/${lang}/cart`} className="link-quiet">
          {t.checkout.back}
        </Link>
      </header>
      <main id="main">{children}</main>
    </div>
  );
}
