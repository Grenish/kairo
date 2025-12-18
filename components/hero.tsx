import { Button } from "./ui/button";

type HeroText = {
  sideTagline: string;
  title: string;
  description: string;
  ctaExplore: string;
  ctaBrowse: string;
};

export default function Hero({ t }: { t: HeroText }) {
  return (
    <div className="h-svh w-full flex items-center justify-center relative bg-hero bg-cover bg-top bg-no-repeat overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 block bg-linear-to-b from-background/10 via-background-5 to-background"></div>

      <h2 className="hidden lg:block absolute bottom-32 z-50 right-0 xl:-right-4 -rotate-90 opacity-50 text-sm tracking-widest whitespace-nowrap origin-bottom-right">
        {t.sideTagline}
      </h2>

      <div className="flex flex-col items-center justify-center relative z-10 px-4 md:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold w-full md:w-10/12 leading-[1.1] tracking-tight">
          {t.title}
        </h2>

        <p className="mt-4 sm:mt-6 w-11/12 md:w-3/4 lg:w-1/2 text-sm sm:text-base font-thin">
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
