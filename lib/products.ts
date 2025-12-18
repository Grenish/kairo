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

export function getSampleProducts(
  lang: "en" | "ja"
): (Product & { slug: string })[] {
  const t = dict[lang];
  const en = dict.en;

  const products = t.productsSample.products as unknown as Product[];
  const productsEn = en.productsSample.products as unknown as Product[];

  return products.map((p, i) => ({
    ...p,
    slug: slugify(productsEn[i]?.title || p.title),
  }));
}

export function getTrendingProducts(
  lang: "en" | "ja"
): (Product & { slug: string })[] {
  const t = dict[lang];
  const en = dict.en;

  const items = t.trendingSection.items as unknown as Product[];
  const itemsEn = en.trendingSection.items as unknown as Product[];

  return items.map((p, i) => ({
    ...p,
    slug: slugify(itemsEn[i]?.title || p.title),
  }));
}

export function getAllProducts(
  lang: "en" | "ja"
): (Product & { slug: string })[] {
  return [...getSampleProducts(lang), ...getTrendingProducts(lang)];
}

export function getProductBySlug(slug: string, lang: "en" | "ja") {
  const products = getAllProducts(lang);
  console.log(
    `[getProductBySlug] Searching for slug: '${slug}' in lang: '${lang}'`
  );
  const match = products.find((p) => p.slug === slug);
  if (match) {
    console.log(
      `[getProductBySlug] Found match: ${match.title} (${match.slug})`
    );
  } else {
    console.log(
      `[getProductBySlug] No match found. First available slug: ${products[0]?.slug}`
    );
  }
  return match;
}
