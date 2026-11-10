import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dict } from "@/lib/dict";
import { isLocale, locales } from "@/lib/i18n";
import { getProducts } from "@/lib/catalog";
import { RelatedProducts } from "@/components/shop/related-products";

type Params = Promise<{ lang: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    dict[lang].blogSection.posts.map((post) => ({ lang, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const post = dict[lang].blogSection.posts.find((p) => p.slug === slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const t = dict[lang].blogSection;
  const post = t.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const [first, ...rest] = post.content;
  const more = t.posts.filter((p) => p.id !== post.id);

  return (
    <article className="pt-12 lg:pt-20">
      <header className="wrap grid gap-6 lg:grid-cols-12 lg:gap-x-(--gutter)">
        <p className="text-ink-soft lg:col-span-12">
          <Link href={`/${lang}/blogs`} className="link-quiet text-foreground">
            {t.title}
          </Link>
          <span aria-hidden> / </span>
          {post.date}, {post.readTime}
        </p>
        <h1 className="type-head text-head max-w-[16ch] lg:col-span-8">{post.title}</h1>
        <p className="type-lead text-lead max-w-[30ch] first-letter:uppercase lg:col-span-4 lg:self-end">
          {post.excerpt}
        </p>
      </header>

      <div className="wrap mt-12 lg:mt-16">
        <div className="load-open relative aspect-[4/3] overflow-hidden bg-paper lg:aspect-[16/8]">
          <Image src={post.image} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>

      <div className="wrap mt-16 grid gap-8 lg:mt-24 lg:grid-cols-12 lg:gap-x-(--gutter)">
        <p className="type-lead text-lead lg:col-span-5 lg:col-start-2" data-reveal>
          {first}
        </p>
        <div className="grid gap-6 lg:col-span-5 lg:col-start-8">
          {rest.map((paragraph, i) => (
            <p key={i} className="max-w-[62ch]" data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="wrap mt-32 lg:mt-48">
        <RelatedProducts
          title={lang === "ja" ? "コレクションから" : "From the collection"}
          products={getProducts(lang).slice(0, 4)}
          lang={lang}
        />
      </div>

      <section aria-labelledby="more-title" className="wrap mt-32 lg:mt-48">
        <h2 id="more-title" className="type-head text-head" data-reveal>
          {lang === "ja" ? "ほかの記事" : "More from the journal"}
        </h2>
        <ul className="mt-12 grid gap-12 md:grid-cols-2 md:gap-x-(--gutter)">
          {more.map((p) => (
            <li key={p.id} data-reveal>
              <Link href={`/${lang}/blogs/${p.slug}`} className="group block">
                <span className="relative block aspect-[3/2] overflow-hidden bg-paper">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.03]"
                  />
                </span>
                <span className="type-lead text-lead mt-5 block font-medium">
                  <span className="link-quiet group-hover:decoration-current">{p.title}</span>
                </span>
                <span className="mt-1 block text-ink-soft">{p.readTime}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
