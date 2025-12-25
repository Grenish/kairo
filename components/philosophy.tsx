import { Button } from "./ui/button";
import Link from "next/link";

type PhilosophyText = {
  title: string;
  description: string;
  cta: string;
};

export default function Philosophy({
  t,
  lang,
}: {
  t: PhilosophyText;
  lang: string;
}) {
  return (
    <div className="p-5 min-h-[60vh]">
      <div className="relative bg-models bg-cover bg-center bg-no-repeat bg-fixed transition-all duration-500">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-background z-0 block"></div>

        <div className="relative flex h-[60vh] w-full flex-col items-center justify-center p-4">
          <h2 className="text-4xl font-semibold capitalize tracking-tight sm:text-5xl md:text-6xl text-center transition-colors duration-300 drop-shadow-sm">
            {t.title}
          </h2>
          <p className="text-lg w-1/2 md:w-1/5 text-center font-thin leading-tight mt-2">
            {t.description}
          </p>
          <Link href={`/${lang}/about`}>
            <Button
              className={"capitalize mt-5 backdrop-blur-sm"}
              size="sm"
              variant={"outline"}
            >
              {t.cta}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
