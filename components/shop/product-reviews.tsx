import { IconStarFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Review, ReviewStats } from "@/lib/reviews";

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} aria-label={`${value} / 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <IconStarFilled
          key={i}
          aria-hidden
          className={cn("size-4", i < Math.round(value) ? "text-foreground" : "text-foreground/25")}
        />
      ))}
    </span>
  );
}

export function ProductReviews({
  reviews,
  stats,
  title,
  lang,
}: {
  reviews: Review[];
  stats: ReviewStats;
  title: string;
  lang: "en" | "ja";
}) {
  const ofFive = lang === "ja" ? "5点中" : "out of 5";
  const ratings = lang === "ja" ? `${stats.count}件の評価` : `${stats.count} ratings`;

  return (
    <section aria-labelledby="reviews-title" className="grid gap-12 lg:grid-cols-12 lg:gap-x-(--gutter)">
      <div className="lg:col-span-4">
        <h2 id="reviews-title" className="type-head text-head" data-reveal>
          {title}
        </h2>
        <p className="mt-8 flex items-baseline gap-3">
          <span className="type-display text-[4.5rem] tabular">{stats.average}</span>
          <span className="text-ink-soft">{ofFive}</span>
        </p>
        <Stars value={stats.average} className="mt-3" />
        <p className="mt-2 text-ink-soft">{ratings}</p>
        <ul className="mt-8 grid max-w-sm gap-2">
          {[5, 4, 3, 2, 1].map((stars, i) => (
            <li key={stars} className="tabular grid grid-cols-[2ch_1fr_4ch] items-center gap-3">
              <span>{stars}</span>
              <span className="h-1 bg-surface-2" aria-hidden>
                <span className="block h-full bg-foreground" style={{ width: `${stats.breakdown[i]}%` }} />
              </span>
              <span className="text-right text-ink-soft">{stats.breakdown[i]}%</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="grid gap-12 lg:col-span-7 lg:col-start-6">
        {reviews.slice(0, 4).map((review) => (
          <li key={review.id} className="grid gap-3" data-reveal>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="type-lead text-lead font-medium">{review.title}</h3>
              <Stars value={review.rating} />
            </div>
            <p className="max-w-[62ch]">{review.content}</p>
            <p className="text-ink-soft">
              {review.author}, {review.date}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
