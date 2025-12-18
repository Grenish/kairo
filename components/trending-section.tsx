"use client";

import { IconArrowRight } from "@tabler/icons-react";
import ProductCard from "./product-card";
import { Button } from "./ui/button";
import Link from "next/link";

import { Product } from "./product-card";

type TrendingSectionText = {
  title: string;
  subtitle: string;
  viewAll: string;
  addToCart: string;
  items: readonly Product[];
};

export default function TrendingSection({
  t,
  lang,
}: {
  t: TrendingSectionText;
  lang?: string;
}) {
  return (
    <section className="w-full py-16 px-4 bg-secondary/5">
      <div className="max-w-8xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col items-start justify-center text-center space-y-2">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            {t.title}
          </h2>
          <p className="text-muted-foreground font-light text-sm md:text-base max-w-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.items.map((item) => (
            <ProductCard
              key={item.id}
              product={{
                ...item,
                images: item.images as [string, ...string[]], // Type assertion for non-empty tuple
              }}
              addToCartText={t.addToCart}
              onAddToCart={() => console.log("Add to cart", item.id)}
              onToggleFavorite={() => console.log("Toggle favorite", item.id)}
              lang={lang}
            />
          ))}
        </div>

        <div className="w-8xl max-w-full mx-auto flex items-center justify-center">
          <Link href={`/${lang}/shop`}>
            <Button variant={"outline"}>
              {t.viewAll}
              <IconArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
