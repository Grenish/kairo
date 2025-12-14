import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

type HeroText = {
  sideTagline: string;
  est: string;
  year: string;
  title: string;
  description: string;
  ctaExplore: string;
  ctaBrowse: string;
};

export default function Hero({ t }: { t: HeroText }) {
  return (
    <div className="h-svh w-full flex items-center justify-center relative bg-smooth bg-cover overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 block">
        <div className="absolute inset-0 dark:bg-black/50 bg-white/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-amber-200/10 mix-blend-overlay sepia-[0.35] contrast-[1.08] saturate-[0.85]" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.6)_100%)]" />
        <div className="absolute inset-0 opacity-[0.07] bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)] mix-blend-overlay" />
      </div>

      <h2 className="hidden lg:block absolute bottom-32 z-50 right-0 xl:-right-4 -rotate-90 opacity-50 text-sm tracking-widest whitespace-nowrap origin-bottom-right">
        {t.sideTagline}
      </h2>

      <div className="flex flex-col items-center justify-center relative z-10 px-4 md:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <p className="text-destructive font-medium text-sm tracking-wide">
            {t.est}
          </p>
          <Separator className="bg-destructive w-8 sm:w-12" />
          <p className="text-destructive font-medium text-sm tracking-wide">
            {t.year}
          </p>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold w-full md:w-10/12 leading-[1.1] tracking-tight">
          {t.title}
        </h2>

        <p className="mt-4 sm:mt-6 w-11/12 md:w-3/4 lg:w-1/2 text-sm sm:text-base text-muted-foreground">
          {t.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto">
          <Button variant="ghost" className="w-full sm:w-auto min-w-30">
            {t.ctaExplore}
          </Button>
          <Button variant="outline" className="w-full sm:w-auto min-w-30">
            {t.ctaBrowse}
          </Button>
        </div>
      </div>
    </div>
  );
}
