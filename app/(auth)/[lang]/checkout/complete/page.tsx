import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { OrderComplete } from "@/components/site/order-complete";

export default async function CompletePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ order?: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { order } = await searchParams;
  return <OrderComplete lang={lang} id={order ?? ""} />;
}
