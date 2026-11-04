import Image from "next/image";
import { cn } from "@/lib/utils";

type Step = {
  verb: string;
  text: string;
  caption: string;
  image: string;
  position: string;
  /** A photograph with dark subjects takes a neutral scrim and the light ink. */
  scrim?: boolean;
};

/**
 * One verb at a time: each panel is a full screen picture of the trade, and its verb holds
 * the middle of the screen while the picture passes behind it.
 */
export function Making({ title, steps }: { title: string; steps: readonly Step[] }) {
  return (
    <section aria-label={title} className="mt-32 lg:mt-48">
      {steps.map((step, i) => (
        <article key={step.verb} className="relative h-svh overflow-clip bg-paper text-paper-ink">
          <Image
            src={step.image}
            alt={step.caption}
            fill
            sizes="100vw"
            quality={80}
            className="object-cover"
            style={{ objectPosition: step.position }}
          />
          {step.scrim && <div className="absolute inset-0 bg-black/40" aria-hidden />}
          {/* The verb holds the middle of the screen, and stops above the sentence at the foot. */}
          <div className="absolute inset-x-0 top-0 bottom-56 md:bottom-28">
            <h2
              lang={/^[a-z]/i.test(step.verb) ? undefined : "ja"}
              className={cn(
                "type-display text-display sticky top-[calc(50svh-0.45em)] text-center",
                step.scrim && "text-paper"
              )}
            >
              {step.verb}
            </h2>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-(--margin) md:flex-row md:items-end md:justify-between">
            <p
              className="max-w-[34ch] bg-paper px-4 py-3 text-paper-ink"
              data-reveal
              style={{ "--d": `${i === 0 ? 120 : 60}ms` } as React.CSSProperties}
            >
              {step.text}
            </p>
            <p className="text-small bg-paper px-3 py-1.5 text-paper-soft">{step.caption}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
