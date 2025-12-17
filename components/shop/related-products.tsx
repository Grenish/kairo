import ProductCard, { Product } from "@/components/product-card";

interface RelatedProductsProps {
  title: string;
  products: Product[];
  lang: string;
  addToCartText: string;
}

export function RelatedProducts({
  title,
  products,
  lang,
  addToCartText,
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-12 border-t">
      <h2 className="text-2xl font-bold mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((product, index) => (
          <ProductCard
            key={`${product.id}-${index}`} // Using index to ensure uniqueness if products are generic
            product={product}
            addToCartText={addToCartText}
            lang={lang}
            className="h-full"
          />
        ))}
      </div>
    </section>
  );
}
