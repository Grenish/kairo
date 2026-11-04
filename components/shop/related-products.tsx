import type { Product } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { ProductTile } from "./product-tile";

/** Four more pieces, each another word, at the foot of a product page. */
export function RelatedProducts({
  title,
  products,
  lang,
}: {
  title: string;
  products: Product[];
  lang: Locale;
}) {
  return (
    <section aria-labelledby="related-title">
      <h2 id="related-title" className="type-head text-head" data-reveal>
        {title}
      </h2>
      <ul className="mt-12 grid grid-cols-2 gap-x-(--gutter) gap-y-12 lg:grid-cols-4">
        {products.map((product, i) => (
          <li key={product.id} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
            <ProductTile product={product} lang={lang} />
          </li>
        ))}
      </ul>
    </section>
  );
}
