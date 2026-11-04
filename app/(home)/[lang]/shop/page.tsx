import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShopInterface, type SortKey } from "@/components/shop/shop-interface";
import { dict } from "@/lib/dict";
import { isLocale } from "@/lib/i18n";
import { CATEGORIES, getProducts, type Category } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: dict[lang].shop.title, description: dict[lang].shop.intro };
}

const SOON = ["/soon/gown.png", "/soon/kimono.png", "/soon/yellow-dress.png", "/soon/pants.png"];

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const query = await searchParams;
  const t = dict[lang].shop;

  const pick = (key: string) => {
    const value = query[key];
    return typeof value === "string" ? value : undefined;
  };
  const category = pick("category")?.toLowerCase();
  const sort = pick("sort");

  const initial = {
    category: CATEGORIES.includes(category as Category) ? (category as Category) : null,
    size: pick("size")?.toUpperCase() ?? null,
    sort: (sort === "price-asc" || sort === "price-desc" ? sort : "new") as SortKey,
  };

  return (
    <>
      <section className="wrap grid gap-6 pt-12 pb-14 lg:grid-cols-12 lg:items-end lg:gap-x-(--gutter) lg:pt-20 lg:pb-20">
        <h1 className="type-display text-display -ml-[0.04em] lg:col-span-7">
          <span className="line-mask">
            <span className="load-line">{t.title}</span>
          </span>
        </h1>
        <p
          className="load-rise type-lead text-lead max-w-[32ch] lg:col-span-4 lg:col-start-9"
          style={{ "--d": "300ms" } as React.CSSProperties}
        >
          {t.intro}
        </p>
      </section>

      <ShopInterface lang={lang} products={getProducts(lang)} initial={initial} />

      <section aria-labelledby="soon-title" className="wrap mt-32 lg:mt-48">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-(--gutter)">
          <h2 id="soon-title" className="type-head text-head lg:col-span-6" data-reveal>
            {t.next}
          </h2>
          <p className="max-w-[40ch] lg:col-span-4 lg:col-start-9 lg:self-end" data-reveal>
            {t.nextNote}
          </p>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-(--gutter) lg:grid-cols-4">
          {SOON.map((src, i) => (
            <li
              key={src}
              className="relative aspect-[3/4] overflow-hidden bg-paper"
              data-reveal="mask"
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
            >
              <Image
                src={src}
                alt={t.nextAlt[i]}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
