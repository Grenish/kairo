import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DesignerText = {
  statement: string;
  oneTitle: string;
  one: string;
  twoTitle: string;
  two: string;
  button: string;
  alt: string;
};

/**
 * An inset panel one tone up from the ground. The portrait is cut to a circle, the ensō,
 * and the panel's lower edge crops it.
 */
export function Designer({ t, href }: { t: DesignerText; href: string }) {
  return (
    <section aria-labelledby="designer-title" className="wrap mt-32 lg:mt-48">
      <div className="relative grid overflow-hidden bg-surface px-6 pt-10 md:px-14 md:pt-14 lg:min-h-[86svh] lg:grid-cols-12 lg:gap-x-(--gutter)">
        <div className="lg:col-span-7">
          <h2
            id="designer-title"
            className="type-head text-head max-w-[11ch]"
            data-reveal
          >
            {t.statement}
          </h2>
        </div>

        <div className="mt-10 grid gap-10 lg:col-span-4 lg:col-start-9 lg:mt-2 lg:gap-16 lg:self-start">
          <div data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            <h3 className="type-lead text-lead font-medium">{t.oneTitle}</h3>
            <p className="mt-3 max-w-[34ch]">{t.one}</p>
          </div>
          <div data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            <h3 className="type-lead text-lead font-medium">{t.twoTitle}</h3>
            <p className="mt-3 max-w-[34ch]">{t.two}</p>
            <Link href={href} className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
              {t.button}
            </Link>
          </div>
        </div>

        <div className="mt-14 -mb-[22%] flex justify-center lg:absolute lg:bottom-0 lg:left-14 lg:mt-0 lg:mb-0 lg:translate-y-[20%]">
          <div
            className="relative aspect-square w-[86vw] overflow-hidden rounded-full bg-paper lg:w-[38vw] lg:max-w-[46rem]"
            data-reveal="mask"
          >
            <Image
              src="/miyu-kuroda.png"
              alt={t.alt}
              fill
              sizes="(min-width: 1024px) 38vw, 86vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
