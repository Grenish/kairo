import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import BlogCard from "./blog-card";
import { Button } from "./ui/button";

type BlogSectionText = {
  title: string;
  subtitle: string;
  cta: string;
  posts: readonly {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    readTime: string;
    slug: string;
  }[];
};

export default function BlogSection({
  t,
  lang,
}: {
  t: BlogSectionText;
  lang: string;
}) {
  return (
    <section className="w-full py-24 px-4">
      <div className="max-w-8xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-start justify-center text-start space-y-4">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            {t.title}
          </h2>
          <p className="text-muted-foreground font-light text-sm md:text-base max-w-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {t.posts.map((post) => (
            <BlogCard key={post.id} post={post} ctaText={t.cta} lang={lang} />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Link href={`/${lang}/blogs`}>
            <Button variant={"outline"}>
              Read More <IconArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
