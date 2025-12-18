"use client";

import Link from "next/link";
import { dict } from "@/lib/dict";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export default function Footer({ lang }: { lang: "en" | "ja" }) {
  const t = dict[lang].footer;

  return (
    <footer className="relative bg-background text-muted-foreground py-24 overflow-hidden border-t border-border/40">
      <div className="absolute md:-bottom-19 bottom-0 left-0 right-0 lg:right-auto lg:-left-10 pointer-events-none select-none opacity-[0.03] text-center lg:text-left">
        <h1 className="text-[30vw] md:text-[25vw] font-black tracking-wider text-foreground leading-none">
          {t.brand.name}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
          <div className="lg:col-span-4 space-y-8">
            <Link href={`/${lang}`} className="block">
              <h2 className="text-2xl font-bold tracking-[0.4em] text-foreground">
                {t.brand.name}
              </h2>
            </Link>
            <p className="text-muted-foreground/80 font-light leading-relaxed max-w-sm">
              {t.brand.tagline}
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {t.sections.map((section, idx) => (
              <div key={idx} className="space-y-6">
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/80">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={
                          link.href.startsWith("http")
                            ? link.href
                            : `/${lang}${link.href}`
                        }
                        className="text-sm font-light hover:text-foreground transition-colors duration-300 ease-out"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground tracking-tight">
                {t.newsletter.title}
              </h3>
              <p className="text-xs text-muted-foreground/70 font-light">
                {t.newsletter.description}
              </p>
            </div>

            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder={t.newsletter.placeholder}
                className="bg-background/50 border-border focus:ring-1 focus:ring-ring rounded-none h-12 text-sm"
              />
              <Button
                variant="outline"
                className="rounded-none border-border text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-all duration-500 py-6"
              >
                {t.newsletter.button}
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-16 bg-border/40" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="order-2 md:order-1">
            <p className="text-[10px] tracking-widest text-muted-foreground/60 uppercase font-mono">
              {t.brand.copyright}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 order-1 md:order-2">
            {t.legal.map((item, idx) => (
              <Link
                key={idx}
                href={`/${lang}${item.href}`}
                className="text-[10px] tracking-widest text-muted-foreground/60 hover:text-foreground/80 uppercase font-mono transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
