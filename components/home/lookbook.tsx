"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export type LookbookFrame = { src: string; alt: string; href?: string };

/**
 * A quiet screen with one row of small portrait frames that runs off both edges.
 * Drag, swipe or use the trackpad to move along it; each frame of a piece opens it.
 */
export function Lookbook({
  title,
  count,
  frames,
}: {
  title: string;
  count: string;
  frames: LookbookFrame[];
}) {
  const rowRef = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  // Mouse drag to scroll; touch and trackpads scroll natively.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !rowRef.current) return;
    drag.current = { x: e.clientX, left: rowRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !rowRef.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    rowRef.current.scrollLeft = drag.current.left - dx;
  };
  const onPointerUp = () => {
    setTimeout(() => (drag.current = null), 0);
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current?.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section
      aria-labelledby="lookbook-title"
      className="relative mt-32 bg-paper py-14 text-paper-ink lg:mt-48 lg:py-20"
    >
      <div className="relative">
        <h2
          id="lookbook-title"
          className="wrap type-lead text-lead relative z-10 -mb-3 font-medium"
          data-reveal
        >
          {title} <span className="tabular text-paper-soft">{count}</span>
        </h2>
        <ul
          ref={rowRef}
          className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-[5vw] overflow-x-auto px-(--margin) py-6 select-none active:cursor-grabbing lg:snap-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onClickCapture={onClickCapture}
          data-lenis-prevent-wheel
        >
          {frames.map((frame, i) => {
            const picture = (
              <span className="relative block aspect-[2/3] w-[34vw] overflow-hidden bg-paper-2 transition-transform duration-[250ms] ease-(--ease-out) group-hover:scale-110 group-focus-visible:scale-110 lg:w-[11vw] lg:min-w-[9.5rem]">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 12vw, 34vw"
                  className="object-cover"
                />
              </span>
            );
            return (
              <li
                key={frame.src}
                className="shrink-0 snap-start"
                data-reveal
                style={{ "--d": `${Math.min(i, 7) * 50}ms` } as React.CSSProperties}
              >
                {frame.href ? (
                  <Link href={frame.href} className="group block" draggable={false}>
                    {picture}
                  </Link>
                ) : (
                  <span className="group block">{picture}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
