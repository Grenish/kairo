import CategorySection from "@/components/category-section";
import Hero from "@/components/hero";
import ProductSample from "@/components/products-sample";
import { dict } from "@/lib/dict";
import { notFound } from "next/navigation";

type PageParams = { lang?: string };

export default async function Page({
  params,
}: {
  params: Promise<PageParams> | PageParams;
}) {
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams?.lang;

  if (lang !== "en" && lang !== "ja") notFound();

  return (
    <>
      <Hero t={dict[lang].hero} />
      <CategorySection t={dict[lang].categorySection} />
      <ProductSample />
    </>
  );
}
