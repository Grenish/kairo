import { dict } from "@/lib/dict";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

type Props = {
  params: Promise<{
    lang: "en" | "ja";
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;

  const d = dict[lang];
  if (!d) return notFound();

  const post = d.blogSection.posts.find((p) => p.slug === slug);
  if (!post) return notFound();

  return (
    <article className="min-h-screen bg-background">
      <div className="relative h-[60vh] w-full bg-muted">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border-none">
            {post.date}
          </Badge>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl drop-shadow-md">
            {post.title}
          </h1>
          <p className="mt-4 text-lg font-light text-white/90">
            {post.readTime}
          </p>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground hover:underline underline-offset-4 mb-8 transition-colors"
        >
          <IconArrowLeft className="mr-2 h-4 w-4" />
          {lang === "en" ? "Go Back" : "戻る"}
        </Link>
        <div className="prose prose-stone dark:prose-invert prose-lg max-w-none">
          {post.content.map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t">
          <h3 className="text-2xl font-semibold tracking-tight mb-6">
            {lang === "en" ? "More from the Journal" : "ジャーナルの他の記事"}
          </h3>
          <div className="grid gap-8 md:grid-cols-2">
            {d.blogSection.posts
              .filter((p) => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/${lang}/blogs/${relatedPost.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted mb-4">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-medium group-hover:underline underline-offset-4">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {relatedPost.readTime}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </article>
  );
}
