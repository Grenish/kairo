import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="max-h-svh h-svh flex items-center justify-center relative bg-smooth bg-cover">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
      >
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-amber-200/10 mix-blend-overlay sepia-[0.35] contrast-[1.08] saturate-[0.85]" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.6)_100%)]" />
        <div className="absolute inset-0 opacity-[0.07] bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)] mix-blend-overlay" />
      </div>
      <h2 className="absolute bottom-32 z-50 -right-10 -rotate-90 opacity-50">
        Dumplings over flowers
      </h2>

      <div className="flex flex-col items-center justify-center relative">
        <div className="flex items-center justify-center gap-2 mb-2">
          <p className="text-destructive">EST</p>
          <Separator className={"bg-destructive"} />
          <p className="text-destructive">2025</p>
        </div>
        <h2 className="text-5xl font-semibold w-10/12 text-center">
          Style is woven from threads of patience and choice
        </h2>
        <p className="mt-5 w-1/2 text-center">
          Discover our finest collection, made with thoughtfully selected
          fabrics influenced by Japanese textile craftsmanship.
        </p>
        <div className="flex itcitems-center gap-2 mt-5">
          <Button variant={"ghost"}>Explore More</Button>
          <Button variant={"outline"}>Browse Catalogue</Button>
        </div>
      </div>
    </div>
  );
}
