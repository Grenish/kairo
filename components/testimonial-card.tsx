import { IconLanguageHiragana, IconQuote } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface TestimonialsCardProps {
  profile: string;
  name: string;
  initials: string;
  source: string;
  testimonials: string;
  className?: string;
}

export default function TestimonialCard({
  profile,
  name,
  initials,
  source,
  testimonials,
  className,
}: TestimonialsCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-md hover:border-primary/20",
        className,
      )}
    >
      <div className="absolute -top-6 -right-6 z-0 text-muted opacity-50 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
        <IconQuote size={180} stroke={1} />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/50 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-secondary-foreground backdrop-blur-sm">
            <IconLanguageHiragana size={12} stroke={1.5} />
            <span>Translated from Japanese</span>
          </div>

          <blockquote className="text-base font-medium leading-relaxed text-card-foreground/90 tracking-tight">
            {testimonials}
          </blockquote>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Avatar className="h-11 w-11 border-2 border-background shadow-sm">
            <AvatarImage src={profile} alt={name} className="object-cover" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-foreground">
              {name}
            </span>
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-3 rounded-full bg-primary/30"></span>
              <span className="text-xs font-medium text-muted-foreground">
                {source}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
