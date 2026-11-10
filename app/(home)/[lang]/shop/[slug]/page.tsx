import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/catalog";
import { ProductFacts, ProductView } from "@/components/shop/product-view";
import { ProductReviews } from "@/components/shop/product-reviews";
import { RelatedProducts } from "@/components/shop/related-products";
import { dict } from "@/lib/dict";
import { isLocale, locales } from "@/lib/i18n";
import { getReviewsForProduct } from "@/lib/reviews";

type Params = Promise<{ lang: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getProducts(lang).map((p) => ({ lang, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const product = getProductBySlug(slug, lang);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
    openGraph: { images: [product.worn] },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const product = getProductBySlug(slug, lang);
  if (!product) notFound();

  const t = dict[lang].product;
  // Reviews are generated sample data (lib/reviews.ts); replace with real reviews before launch.
  const { reviews, stats } = getReviewsForProduct(product.id);

  const others = getProducts(lang).filter((p) => p.id !== product.id);
  const sameKind = others.filter((p) => p.category === product.category);
  const related = [...sameKind, ...others.filter((p) => p.category !== product.category)].slice(0, 4);

  return (
    <div className="pt-8 lg:pt-12">
      <ProductView product={product} lang={lang} />

      <section aria-label={t.material} className="wrap mt-32 lg:mt-48">
        <ProductFacts product={product} lang={lang} />
      </section>

      <div className="wrap mt-32 lg:mt-48">
        <ProductReviews reviews={reviews} stats={stats} title={t.reviews} lang={lang} />
      </div>

      <div className="wrap mt-32 lg:mt-48">
        <RelatedProducts title={t.related} products={related} lang={lang} />
      </div>
    </div>
  );
}
