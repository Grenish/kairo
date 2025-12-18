"use client";

import ProductCard, { type Product } from "./product-card";

type ProductSampleText = {
  title: string;
  description: string;
  addToCart: string;
  products: readonly Product[];
};

export default function ProductSample({
  t,
  lang,
}: {
  t: ProductSampleText;
  lang?: string;
}) {
  return (
    <section className="w-full py-10">
      <div className="mx-auto w-full max-w-8xl px-4">
        <div className="mb-10 flex flex-col items-start justify-center text-start">
          <h2 className="text-3xl font-semibold md:text-4xl">{t.title}</h2>
          <p className="mt-2 max-w-2xl text-lg font-thin text-gray-600 dark:text-gray-300">
            {t.description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.products.map((product) => (
            <ProductCard
              key={product.id ?? product.title}
              product={product}
              addToCartText={t.addToCart}
              onAddToCart={() => console.log("Add to cart", product.id)}
              onToggleFavorite={() =>
                console.log("Toggle favorite", product.id)
              }
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
