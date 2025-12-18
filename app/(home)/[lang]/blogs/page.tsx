import { dict } from "@/lib/dict";
import BlogCard from "@/components/blog-card";
import { notFound } from "next/navigation";

type PageParams = { lang?: string };

export default async function BlogsPage({
  params,
}: {
  params: Promise<PageParams> | PageParams;
}) {
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams?.lang;

  if (lang !== "en" && lang !== "ja") notFound();

  const t = dict[lang].blogSection;

  return (
    <div className="w-full py-24 px-4 min-h-screen bg-background">
      <div className="max-w-8xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-start justify-center text-start space-y-4">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            {t.title}
          </h1>
          <p className="text-muted-foreground font-light text-sm md:text-base max-w-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {t.posts.map((post) => (
            <BlogCard key={post.id} post={post} ctaText={t.cta} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}
