import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dict } from "@/lib/dict";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: dict[lang].blogSection.title, description: dict[lang].blogSection.subtitle };
}

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang].blogSection;

  return (
    <div className="wrap pt-12 lg:pt-20">
      <header className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-(--gutter)">
        <h1 className="type-display text-display -ml-[0.04em] lg:col-span-7">
          <span className="line-mask">
            <span className="load-line">{t.title}</span>
          </span>
        </h1>
        <p
          className="load-rise type-lead text-lead max-w-[28ch] lg:col-span-4 lg:col-start-9"
          style={{ "--d": "300ms" } as React.CSSProperties}
        >
          {t.subtitle}
        </p>
      </header>

      <div className="load-open relative mt-12 aspect-[21/9] overflow-hidden bg-paper lg:mt-16">
        <Image
          src="/kairo-night.png"
          alt={lang === "ja" ? "月夜の山あいを流れる川の墨絵" : "An ink painting of a river winding between hills under a crescent moon"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <ol className="mt-20 grid gap-24 lg:mt-28 lg:gap-32">
        {t.posts.map((post, i) => (
          <li key={post.id}>
            <Link
              href={`/${lang}/blogs/${post.slug}`}
              className="group grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-(--gutter)"
            >
              <div
                className={
                  i % 2 === 0
                    ? "relative aspect-[4/3] overflow-hidden bg-paper lg:col-span-7"
                    : "relative aspect-[4/3] overflow-hidden bg-paper lg:order-2 lg:col-span-6 lg:col-start-7"
                }
                data-reveal="mask"
              >
                <Image
                  src={post.image}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.03]"
                />
              </div>
              <div
                className={i % 2 === 0 ? "lg:col-span-4 lg:col-start-9" : "lg:order-1 lg:col-span-5"}
                data-reveal
                style={{ "--d": "120ms" } as React.CSSProperties}
              >
                <h2 className="type-head text-head">
                  <span className="link-quiet group-hover:decoration-current">{post.title}</span>
                </h2>
                <p className="mt-4 text-ink-soft">
                  {post.date}, {post.readTime}
                </p>
                <p className="mt-5 max-w-[40ch] first-letter:uppercase">{post.excerpt}</p>
                <p className="mt-6 underline underline-offset-[0.22em]">{t.cta}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
