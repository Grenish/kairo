"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ShowcaseText = {
  before: string;
  after: string;
  caption: string;
  link: string;
  alt: string;
};

// Whole kimono, then the obi, then one painted peony.
const STAGES = [
  { scale: 1, origin: "50% 50%" },
  { scale: 1.9, origin: "52% 41%" },
  { scale: 2.7, origin: "38% 78%" },
];

/**
 * One frame held on screen while the page scrolls past it three times: each screen
 * moves the camera closer to the cloth.
 */
export function Showcase({
  t,
  image,
  href,
}: {
  t: ShowcaseText;
  image: string;
  href: string;
}) {
  const [stage, setStage] = useState(0);
  const markers = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStage(Number((entry.target as HTMLElement).dataset.stage));
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    markers.current.forEach((m) => m && io.observe(m));
    return () => io.disconnect();
  }, []);

  const s = STAGES[stage];

  return (
    <section
      aria-labelledby="showcase-title"
      className="showcase relative mt-32 h-[240svh] lg:mt-48"
    >
      <div className="showcase-stage sticky top-0 flex h-svh flex-col items-center justify-center gap-4 overflow-hidden wrap pt-(--header)">
        <h2
          id="showcase-title"
          className="type-head text-head text-center"
          data-reveal
        >
          {t.before}
        </h2>

        <div className="relative w-[70vw] max-w-[30rem] lg:w-[30vw]">
          <figure className="relative aspect-[4/5] overflow-hidden bg-paper">
            <Image
              src={image}
              alt={t.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 70vw"
              quality={90}
              className="object-cover transition-transform duration-700 ease-(--ease-in-out) will-change-transform"
              style={{ transform: `scale(${s.scale})`, transformOrigin: s.origin }}
            />
          </figure>

          {/* The third distance brings its caption, to the right of the frame on desktop. */}
          <Caption t={t} href={href} on={stage === 2} className="absolute top-0 left-[calc(100%+2rem)] hidden w-[28ch] lg:block" />
        </div>

        <p
          aria-hidden
          className={cn(
            "showcase-after type-head text-head text-center",
            stage >= 1 ? "is-on" : ""
          )}
        >
          {t.after}
        </p>
        <Caption t={t} href={href} on={stage === 2} className="max-w-[34ch] text-center lg:hidden" />
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col" aria-hidden>
        {STAGES.map((_, i) => (
          <div
            key={i}
            data-stage={i}
            ref={(el) => {
              markers.current[i] = el;
            }}
            className="flex-1"
          />
        ))}
      </div>
    </section>
  );
}

function Caption({
  t,
  href,
  on,
  className,
}: {
  t: ShowcaseText;
  href: string;
  on: boolean;
  className?: string;
}) {
  return (
    <div className={cn("showcase-caption", on && "is-on", className)}>
      <p>{t.caption}</p>
      <Link href={href} className="link-quiet mt-3 inline-block underline decoration-current">
        {t.link}
      </Link>
    </div>
  );
}
