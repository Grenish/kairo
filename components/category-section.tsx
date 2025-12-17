import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

type CategoryItem = {
  id: number;
  img: string;
  alt: string;
  href: string;
  headline: string;
};

type CategorySectionText = {
  title: string;
  description: string;
  cta: string;
  categories: readonly CategoryItem[];
};

export default function CategorySection({
  t,
  lang,
}: {
  t: CategorySectionText;
  lang: string;
}) {
  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto py-5">
        <h2 className="text-center text-3xl font-semibold">{t.title}</h2>
        <p className="text-lg font-thin text-center mt-2 mb-5">
          {t.description}
        </p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.categories.map(({ id, img, alt, href, headline }) => (
            <div key={id} className="relative group overflow-hidden">
              <Image
                src={img}
                alt={alt}
                width={400}
                height={500}
                className="object-cover w-full transition-transform duration-500 ease-in-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out flex flex-col items-center justify-center">
                <h2 className="text-white font-medium text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {headline}
                </h2>

                <Link
                  href={`/${lang}${href}`}
                  className="mt-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100"
                >
                  <Button variant="secondary" size="sm" className="w-24">
                    {t.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
