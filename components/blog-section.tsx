import BlogCard from "./blog-card";

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
        <div className="flex flex-col items-center justify-center text-center space-y-4">
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
      </div>
    </section>
  );
}
