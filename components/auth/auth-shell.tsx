import Image from "next/image";
import Link from "next/link";
import { HtmlLang } from "@/components/site/html-lang";

/** Sign-in and sign-up share one composition: the photograph on one half, the form on the other. */
export function AuthShell({
  lang,
  image,
  alt,
  children,
}: {
  lang: "en" | "ja";
  image: string;
  alt: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-2">
      <HtmlLang lang={lang} />
      <div className="relative hidden overflow-hidden bg-paper lg:block">
        <Image src={image} alt={alt} fill priority sizes="50vw" className="object-cover" />
      </div>
      <div className="wrap flex flex-col py-6">
        <Link href={`/${lang}`} className="self-start text-[1.375rem] font-medium tracking-[-0.04em]">
          Kairo
        </Link>
        <main id="main" className="flex flex-1 items-center py-16">
          <div className="w-full max-w-md lg:ml-[12%]">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function GoogleMark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden className="size-4">
      <path
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
        fill="currentColor"
      />
    </svg>
  );
}
