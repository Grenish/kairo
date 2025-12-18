import { dict } from "@/lib/dict";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type PageParams = { lang?: string };

export default async function AboutPage({
  params,
}: {
  params: Promise<PageParams> | PageParams;
}) {
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams?.lang;

  if (lang !== "en" && lang !== "ja") notFound();

  const t = dict[lang].about;

  return (
    <main className="min-h-svh bg-background text-foreground">
      <section className="relative px-6 py-32 md:py-48 flex flex-col bg-interior bg-cover bg-center items-center justify-center text-center">
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-background" />
        <div className="relative max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-md tracking-wider uppercase text-muted-foreground">
            {t.hero.tagline}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
        </div>
      </section>

      <section className="px-6 py-24 border-b border-border/40">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-light tracking-tight mb-6">
              {t.mission.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t.mission.description}
            </p>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.mission.values.map((value, index) => (
              <div key={index} className="space-y-4">
                <span className="block text-sm font-mono text-muted-foreground/60">
                  0{index + 1}
                </span>
                <h3 className="text-lg font-medium">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-border/40" id="journey">
        <div className="lg:grid lg:grid-cols-2">
          <div className="hidden lg:flex sticky top-0 h-screen w-full flex-col items-center justify-center text-center p-12 border-r border-border/40 bg-store bg-cover bg-no-repeat">
            <div className="absolute inset-0 bg-background/20" />
            <div className="relative z-10 space-y-4 bg-background/20 p-12 backdrop-blur-sm">
              <span className="text-xs font-thin tracking-[0.2em] uppercase">
                {t.history.subtitle}
              </span>
              <h2 className="text-4xl font-thin tracking-tight">
                {t.history.title}
              </h2>
            </div>
          </div>

          <div className="lg:hidden p-12 text-center bg-accent/5 border-b border-border/40">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground block mb-2">
              {t.history.subtitle}
            </span>
            <h2 className="text-3xl font-light tracking-tight text-primary">
              {t.history.title}
            </h2>
          </div>

          <div className="w-full">
            {t.history.timeline.map((item, index) => (
              <div
                key={index}
                className="min-h-[50vh] lg:min-h-screen flex flex-col justify-center px-12 py-16 bg-background border-b last:border-b-0 border-border/40 lg:border-none"
              >
                <div className="max-w-lg mx-auto w-full space-y-6">
                  <span className="inline-block text-6xl font-light text-primary tabular-nums">
                    {item.year}
                  </span>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-medium tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 border-b border-border/40">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-2xl">
            <span className="block text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/80 mb-4">
              {t.operations.subtitle}
            </span>
            <h2 className="text-3xl font-light tracking-tight mb-6">
              {t.operations.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.operations.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-border/60">
            {t.operations.steps.map((step, index) => (
              <div
                key={index}
                className="p-8 border-r border-b border-border/60 space-y-6"
              >
                <span className="text-xs font-mono text-muted-foreground/60">
                  STEP {step.number}
                </span>
                <h3 className="text-lg font-medium">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 bg-accent/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          <div className="space-y-6 lg:sticky lg:top-24">
            <div>
              <span className="block text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/80 mb-4">
                {t.providers.subtitle}
              </span>
              <h2 className="text-3xl font-light tracking-tight mb-6">
                {t.providers.title}
              </h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.providers.description}
            </p>
            <div className="pt-8">
              <Button
                asChild
                variant="default"
                size="lg"
                className="rounded-none px-8"
              >
                <Link href={`/${lang}/shop`}>{t.cta.button}</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-12">
            {t.providers.benefits.map((benefit, index) => (
              <div
                key={index}
                className="border-l-2 border-primary/10 pl-8 py-2"
              >
                <h3 className="text-xl font-medium mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-32 text-center bg-background">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-primary">
            {t.cta.title}
          </h2>
          <Separator className="w-12 mx-auto bg-primary/20" />
          <p className="text-muted-foreground leading-relaxed">
            {t.cta.description}
          </p>
        </div>
      </section>
    </main>
  );
}
