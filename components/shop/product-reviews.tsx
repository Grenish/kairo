import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { IconStarFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Review, ReviewStats } from "@/lib/reviews";

interface ProductReviewsProps {
  reviews: Review[];
  stats: ReviewStats;
}

export function ProductReviews({ reviews, stats }: ProductReviewsProps) {
  return (
    <section className="py-12 lg:py-16">
      <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Summary Column */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">{stats.average}</span>
              <span className="text-muted-foreground">out of 5</span>
            </div>
            <div className="flex text-yellow-500">
              <IconStarFilled className="w-5 h-5" />
              <IconStarFilled className="w-5 h-5" />
              <IconStarFilled className="w-5 h-5" />
              <IconStarFilled className="w-5 h-5" />
              <IconStarFilled className="w-5 h-5 text-yellow-500/30" />
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {stats.count} global ratings
            </p>
          </div>

          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars, i) => (
              <div key={stars} className="flex items-center gap-3 text-sm">
                <span className="w-8">{stars} star</span>
                <Progress value={stats.breakdown[i]} className="h-2.5 flex-1" />
                <span className="w-8 text-right text-muted-foreground">
                  {stats.breakdown[i]}%
                </span>
              </div>
            ))}
          </div>

          <div className="bg-secondary/20 p-6 rounded-xl space-y-2">
            <h3 className="font-semibold">Review this product</h3>
            <p className="text-sm text-muted-foreground">
              Share your thoughts with other customers
            </p>
            <button className="w-full mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              Write a Review
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-8 space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{review.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{review.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {review.date}
                    </div>
                  </div>
                </div>
                <div className="flex text-yellow-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <IconStarFilled
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < review.rating ? "fill-current" : "text-muted/20"
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">{review.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {review.content}
                </p>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
