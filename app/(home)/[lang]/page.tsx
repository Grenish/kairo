import CategorySection from "@/components/category-section";
import Hero from "@/components/hero";
import Philosophy from "@/components/philosophy";
import ProductSample from "@/components/products-sample";
import SneakPeak from "@/components/sneak-peak";
import Testimonials from "@/components/testimonials";
import TrendingSection from "@/components/trending-section";
import BlogSection from "@/components/blog-section";
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
      <CategorySection t={dict[lang].categorySection} lang={lang} />
      <Philosophy t={dict[lang].philosophySection} />
      <ProductSample t={dict[lang].productsSample} />
      <Testimonials t={dict[lang].testimonialsSection} />
      <SneakPeak t={dict[lang].sneakPeakSection} />
      <TrendingSection t={dict[lang].trendingSection} lang={lang} />
      <BlogSection t={dict[lang].blogSection} lang={lang} />
    </>
  );
}
