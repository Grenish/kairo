import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type LayoutParams = { lang?: string };

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LayoutParams> | LayoutParams;
}) {
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams?.lang;

  if (!isLocale(lang)) {
    notFound();
  }

  // Do NOT render <html>/<body> here since RootLayout already owns those tags.
  return (
    <>
      <Navbar />
      {children}
      <Footer lang={lang} />
    </>
  );
}
