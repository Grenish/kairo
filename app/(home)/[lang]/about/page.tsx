import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { dict } from "@/lib/dict";
import { isLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: dict[lang].nav.about, description: dict[lang].about.hero.description };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang].about;

  return (
    <div className="pt-12 lg:pt-20">
      {/* The statement and the room it was made in. */}
      <section className="wrap grid gap-8 lg:grid-cols-12 lg:gap-x-(--gutter)">
        <h1 className="type-head text-head max-w-[13ch] lg:col-span-8">{t.hero.title}</h1>
        <p
          className="load-rise type-lead text-lead max-w-[30ch] lg:col-span-4 lg:self-end"
          style={{ "--d": "300ms" } as React.CSSProperties}
        >
          {t.hero.description}
        </p>
        <div className="load-open relative mt-6 aspect-[4/3] overflow-hidden bg-paper lg:col-span-12 lg:aspect-[16/7]">
          <Image
            src="/interior.png"
            alt={lang === "ja" ? "障子とハンガーラックのあるアトリエの一室" : "A room in the atelier with shoji screens and a single clothes rail"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Mission: one paragraph, three values. */}
      <section aria-labelledby="mission-title" className="wrap mt-32 grid gap-12 lg:mt-48 lg:grid-cols-12 lg:gap-x-(--gutter)">
        <div className="lg:col-span-5">
          <h2 id="mission-title" className="type-head text-head" data-reveal>
            {t.mission.title}
          </h2>
          <p className="type-lead text-lead mt-8 max-w-[30ch]" data-reveal>
            {t.mission.description}
          </p>
        </div>
        <ul className="grid gap-2 self-end lg:col-span-6 lg:col-start-7">
          {t.mission.values.map((value, i) => (
            <li
              key={value.title}
              className="grid gap-2 bg-surface p-6 md:grid-cols-[14ch_1fr] md:gap-8 md:p-8"
              data-reveal
              style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
            >
              <h3 className="type-lead text-lead font-medium">{value.title}</h3>
              <p>{value.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Journey: the shop held on the left while the years pass on the right. */}
      <section id="journey" aria-labelledby="journey-title" className="mt-32 lg:mt-48">
        <div className="wrap">
          <h2 id="journey-title" className="type-head text-head" data-reveal>
            {t.history.title}
          </h2>
        </div>
        <div className="wrap mt-12 grid gap-12 lg:grid-cols-12 lg:gap-x-(--gutter)">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper lg:sticky lg:top-[calc(var(--header)+2rem)] lg:aspect-[4/5]">
              <Image
                src="/store.png"
                alt={lang === "ja" ? "東京の通りに建つKairoのショップ" : "The Kairo shop on its Tokyo street"}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[35%_50%]"
              />
            </div>
          </div>
          <ol className="grid gap-16 lg:col-span-5 lg:col-start-8 lg:gap-0">
            {t.history.timeline.map((item) => (
              <li key={item.year} className="lg:flex lg:min-h-[70svh] lg:flex-col lg:justify-center" data-reveal>
                <p className="type-display text-display tabular">{item.year}</p>
                <h3 className="type-lead text-lead mt-4 font-medium">{item.title}</h3>
                <p className="mt-3 max-w-[40ch]">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How we work: four stages read left to right. */}
      <section aria-labelledby="work-title" className="wrap mt-32 lg:mt-48">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-(--gutter)">
          <h2 id="work-title" className="type-head text-head lg:col-span-6" data-reveal>
            {t.operations.title}
          </h2>
          <p className="type-lead text-lead max-w-[32ch] lg:col-span-5 lg:col-start-8 lg:self-end" data-reveal>
            {t.operations.description}
          </p>
        </div>
        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-(--gutter)">
          {t.operations.steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
            >
              <h3 className="type-lead text-lead font-medium">{step.title}</h3>
              <p className="mt-4">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Partners: the promise held while the four commitments scroll by. */}
      <section aria-labelledby="partners-title" className="wrap mt-32 grid gap-12 lg:mt-48 lg:grid-cols-12 lg:gap-x-(--gutter)">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header)+2rem)]">
            <h2 id="partners-title" className="type-head text-head" data-reveal>
              {t.providers.title}
            </h2>
            <p className="mt-8 max-w-[40ch]" data-reveal>
              {t.providers.description}
            </p>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden bg-paper" data-reveal="mask">
              <Image
                src="/threads.png"
                alt={lang === "ja" ? "草原に並ぶ、Kairoを着た六人" : "Six people in Kairo clothing in a field of tall grass"}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <ul className="grid gap-12 lg:col-span-6 lg:col-start-7">
          {t.providers.benefits.map((benefit) => (
            <li key={benefit.title} data-reveal>
              <h3 className="type-lead text-lead font-medium">{benefit.title}</h3>
              <p className="mt-3 max-w-[48ch]">{benefit.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Close: the one centred moment on the page. */}
      <section aria-labelledby="cta-title" className="mt-32 lg:mt-48">
        <div className="wrap flex flex-col items-center text-center">
          <h2 id="cta-title" className="type-head text-head max-w-[14ch]" data-reveal>
            {t.cta.title}
          </h2>
          <p className="mt-6 max-w-[40ch]" data-reveal>
            {t.cta.description}
          </p>
          <Link href={`/${lang}/shop`} className={cn(buttonVariants({ size: "lg" }), "mt-10")}>
            {t.cta.button}
          </Link>
        </div>
        <div className="wrap mt-16">
          <div className="relative aspect-[4/3] overflow-hidden bg-paper lg:aspect-[16/7]" data-reveal="mask">
            <Image
              src="/models-bg.png"
              alt={lang === "ja" ? "草原に立つ、Kairoを着た五人" : "Five people in Kairo clothing standing in a field of grass"}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
