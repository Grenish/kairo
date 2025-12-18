import { Product } from "@/components/product-card";
import { ShopInterface } from "@/components/shop/shop-interface";
import { dict } from "@/lib/dict";
import { getAllProducts } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ja" }>;
}) {
  const { lang } = await params;
  const t = dict[lang];

  if (!t) return notFound();

  // Combine products - Use getAllProducts to ensure slugs are consistent (Latin for JP)
  const allProducts = getAllProducts(lang);

  const pageTitle = lang === "ja" ? "ショップ" : "Shop";
  const pageDescription =
    lang === "ja"
      ? "私たちのコレクションをご覧ください。"
      : "Explore our collection.";

  // Localized UI strings for the interface
  const interfaceText = {
    addToCart: t.productsSample.addToCart,
    filters: lang === "ja" ? "フィルター" : "Filters",
    sort: lang === "ja" ? "並び替え" : "Sort",
    sortBy: {
      newest: lang === "ja" ? "新着順" : "Newest Arrivals",
      priceLowToHigh: lang === "ja" ? "価格の安い順" : "Price: Low to High",
      priceHighToLow: lang === "ja" ? "価格の高い順" : "Price: High to Low",
    },
    category: lang === "ja" ? "カテゴリー" : "Category",
    priceRange: lang === "ja" ? "価格帯" : "Price Range",
    clearFilters: lang === "ja" ? "フィルターをクリア" : "Clear Filters",
    results: lang === "ja" ? "件の結果" : "results",
    categories:
      lang === "ja"
        ? {
            Suits: "スーツ",
            Dresses: "ドレス",
            Tops: "トップス",
            Bottoms: "ボトムス",
            Knitwear: "ニット",
            Outerwear: "アウター",
            Other: "その他",
          }
        : undefined,
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-6">
      <div className="max-w-8xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {pageDescription}
          </p>
        </div>

        <ShopInterface products={allProducts} t={interfaceText} lang={lang} />
      </div>
    </div>
  );
}
