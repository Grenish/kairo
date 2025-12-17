import { dict } from "./dict";
import { Product } from "@/components/product-card";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // Use Unicode property escapes to keep letters/numbers from any language
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
}

export function getAllProducts(
  lang: "en" | "ja"
): (Product & { slug: string })[] {
  const t = dict[lang];

  // Aggregate products
  const sampleProducts = t.productsSample.products as unknown as Product[];
  const trendingProducts = t.trendingSection.items as unknown as Product[];
  const allProducts = [...sampleProducts, ...trendingProducts];

  // Add slugs
  return allProducts.map((p) => ({
    ...p,
    slug: slugify(p.title),
  }));
}

export function getProductBySlug(slug: string, lang: "en" | "ja") {
  const products = getAllProducts(lang);
  return products.find((p) => p.slug === slug);
}
