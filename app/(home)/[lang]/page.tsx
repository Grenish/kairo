import { notFound } from "next/navigation";
import { dict, fill } from "@/lib/dict";
import { isLocale } from "@/lib/i18n";
import { getProduct, getProducts } from "@/lib/catalog";
import { Hero } from "@/components/home/hero";
import { Showcase } from "@/components/home/showcase";
import { CollectionList } from "@/components/home/collection-list";
import { Lookbook, type LookbookFrame } from "@/components/home/lookbook";
import { Designer } from "@/components/home/designer";
import { Making } from "@/components/home/making";
import { Visit } from "@/components/home/visit";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = dict[lang];
  const products = getProducts(lang);
  const akane = getProduct("akane", lang)!;

  const extra: LookbookFrame[] =
    lang === "ja"
      ? [
          { src: "/hero-bg.png", alt: "黒いベストと白いシャツの女性" },
          { src: "/shop/sweater.png", alt: "生成りのニットを着た女性" },
          { src: "/shop/tops.png", alt: "グレーと藍の切り替えトップスの女性" },
          { src: "/shop/shirt.png", alt: "グレーのシャツで床に座る男性" },
          { src: "/shop/pants.png", alt: "藍色のワイドパンツ" },
          { src: "/story.png", alt: "白と黒の彫刻的なガウン" },
        ]
      : [
          { src: "/hero-bg.png", alt: "A woman in a black vest over a white shirt" },
          { src: "/shop/sweater.png", alt: "A woman in an unbleached knit" },
          { src: "/shop/tops.png", alt: "A woman in a grey and indigo panelled top" },
          { src: "/shop/shirt.png", alt: "A man in a grey shirt sitting on the floor" },
          { src: "/shop/pants.png", alt: "Wide indigo trousers" },
          { src: "/story.png", alt: "A sculpted white and black gown" },
        ];

  const frames: LookbookFrame[] = [
    ...products.map((p) => ({
      src: p.worn,
      alt: fill(t.product.wornAlt, { title: p.title }),
      href: `/${lang}/shop/${p.slug}`,
    })),
    ...extra,
  ];

  return (
    <>
      <Hero lang={lang} t={t.home.hero} products={products} />
      <Showcase
        t={t.home.showcase}
        image={akane.flat}
        href={`/${lang}/shop/${akane.slug}`}
      />
      <CollectionList lang={lang} t={t.home.list} products={products} />
      <Lookbook
        title={t.home.gallery.title}
        count={fill(t.home.gallery.count, { n: frames.length })}
        frames={frames}
      />
      <Designer t={t.home.about} href={`/${lang}/blogs/silence-in-design`} />
      <Making title={t.home.making.title} steps={t.home.making.steps} />
      <Visit t={t.home.visit} email={t.footer.email} />
    </>
  );
}
