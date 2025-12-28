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
import { getSampleProducts, getTrendingProducts } from "@/lib/products";

type PageParams = { lang?: string };

export default async function Page({
  params,
}: {
  params: Promise<PageParams> | PageParams;
}) {
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams?.lang;

  if (lang !== "en" && lang !== "ja") notFound();

  const sampleProducts = getSampleProducts(lang);
  const trendingProducts = getTrendingProducts(lang);

  return (
    <>
      <Hero t={dict[lang].hero} />
      <CategorySection t={dict[lang].categorySection} lang={lang} />
      <Philosophy t={dict[lang].philosophySection} lang={lang} />
      <ProductSample
        t={{ ...dict[lang].productsSample, products: sampleProducts }}
        lang={lang}
      />
      <Testimonials t={dict[lang].testimonialsSection} />
      <SneakPeak t={dict[lang].sneakPeakSection} />
      <TrendingSection
        t={{ ...dict[lang].trendingSection, items: trendingProducts }}
        lang={lang}
      />
      <BlogSection t={dict[lang].blogSection} lang={lang} />
    </>
  );
}
