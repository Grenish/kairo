import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

export type BlogCardProps = {
  post: {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    readTime: string;
    slug: string;
  };
  ctaText: string;
  lang: string;
};

export default function BlogCard({ post, ctaText, lang }: BlogCardProps) {
  return (
    <Link href={`/${lang}/blogs/${post.slug}`} className="group block h-full">
      <Card className="h-full border-none shadow-none bg-transparent gap-4 pt-0 flex flex-col">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-md bg-muted">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="font-normal">
              {post.date}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">
              {post.readTime}
            </span>
          </div>
          <CardTitle className="text-xl font-medium leading-tight group-hover:underline decoration-1 underline-offset-4">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm line-clamp-2">
            {post.excerpt}
          </CardDescription>
        </CardContent>
        <CardFooter className="mt-auto">
          <div className="flex items-center text-sm font-medium underline-offset-4 group-hover:underline">
            {ctaText}
            <IconArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
