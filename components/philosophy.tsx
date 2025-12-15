import Image from "next/image";
import { Button } from "./ui/button";

type PhilosophyText = {
  title: string;
  description: string;
  cta: string;
};

export default function Philosophy({ t }: { t: PhilosophyText }) {
  return (
    <div className="relative min-h-svh bg-models bg-cover bg-center bg-no-repeat transition-all duration-500">
      <div className="pointer-events-none absolute inset-0 z-0 block">
        <div className="absolute inset-0 bg-stone-100/10 dark:bg-black/20 transition-colors duration-500" />
        <div className="absolute inset-0 mix-blend-overlay bg-orange-200/30 dark:bg-amber-500/10 sepia-[0.3] dark:sepia-[0.5] contrast-[1.1]" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0.4)_100%)] dark:[background:radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.8)_100%)]" />
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_1px,transparent_1px,transparent_3px)] dark:bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)] mix-blend-overlay" />
      </div>

      <div className="relative flex h-svh w-full flex-col items-center justify-center p-4">
        <h2 className="text-4xl font-semibold capitalize tracking-tight sm:text-5xl md:text-6xl text-center transition-colors duration-300 drop-shadow-sm">
          {t.title}
        </h2>
        <p className="text-lg w-1/4 text-center font-thin leading-tight mt-2">
          {t.description}
        </p>
        <Button
          className={"capitalize mt-5 backdrop-blur-sm"}
          size="sm"
          variant={"outline"}
        >
          {t.cta}
        </Button>
      </div>
    </div>
  );
}
