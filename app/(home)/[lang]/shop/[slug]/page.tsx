import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import { ProductView } from "@/components/shop/product-view";
import { ProductReviews } from "@/components/shop/product-reviews";
import { RelatedProducts } from "@/components/shop/related-products";
import { dict } from "@/lib/dict";
import { getReviewsForProduct } from "@/lib/reviews";

interface ProductPageProps {
  params: Promise<{
    lang: "en" | "ja";
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { lang, slug } = await params;
  const product = getProductBySlug(slug, lang);
  const t = dict[lang];

  if (!product || !t) {
    return notFound();
  }

  // Generate deterministic reviews based on product ID (or title if ID missing)
  const productId = product.id || product.title;
  const { reviews, stats } = getReviewsForProduct(productId);

  // Get other products for recommendations
  const allProducts = getAllProducts(lang);
  const otherProducts = allProducts.filter((p) => p.slug !== slug);

  // Simple "Related" (first 4)
  const relatedProducts = otherProducts.slice(0, 4);

  // Simple "You Might Also Like" (next 4)
  const maybeLikeProducts = otherProducts.slice(4, 8);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-12">
        <ProductView
          product={product}
          rating={stats.average}
          reviewCount={stats.count}
        />

        <ProductReviews reviews={reviews} stats={stats} />

        <RelatedProducts
          title="Related Products"
          products={relatedProducts}
          lang={lang}
          addToCartText={t.productsSample.addToCart}
        />

        <RelatedProducts
          title="You Might Also Like"
          products={maybeLikeProducts}
          lang={lang}
          addToCartText={t.productsSample.addToCart}
        />
      </div>
    </div>
  );
}
