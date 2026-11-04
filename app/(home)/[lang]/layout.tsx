import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { HtmlLang } from "@/components/site/html-lang";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  // Do NOT render <html>/<body> here since RootLayout already owns those tags.
  return (
    <>
      <HtmlLang lang={lang} />
      <SiteHeader lang={lang} />
      <main id="main" className="pt-(--header)">
        {children}
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
