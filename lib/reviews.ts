export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  avatar: string;
}

export interface ReviewStats {
  average: number;
  count: number;
  breakdown: number[]; // [5, 4, 3, 2, 1] percentages
}

const JAPANESE_NAMES = [
  "Haruto Tanaka",
  "Yuto Sato",
  "Sota Suzuki",
  "Riku Takahashi",
  "Daiki Watanabe",
  "Yui Ito",
  "Hina Yamamoto",
  "Aoi Nakamura",
  "Rin Kobayashi",
  "Sakura Kato",
  "Kenta Yoshida",
  "Hiroshi Yamada",
  "Takumi Sasaki",
  "Ren Yamaguchi",
  "Kaito Matsumoto",
  "Miyu Inoue",
  "Akari Kimura",
  "Yuna Hayashi",
  "Mei Shimizu",
  "Hana Yamazaki",
];

const REVIEW_TITLES_HIGH = [
  "Exceptional quality",
  "Perfect fit",
  "Beautiful design",
  "Highly recommended",
  "Worth every yen",
  "Stunning craftsmanship",
  "My new favorite",
  "Exceeded expectations",
  "Elegant and comfortable",
  "Premium feel",
];

const REVIEW_TITLES_MID = [
  "Good value",
  "Nice material",
  "Decent fit",
  "Classic style",
  "Satisfied",
  "As described",
  "Comfortable",
  "Solid purchase",
  "Unique look",
  "Well made",
];

const COMMENTS_HIGH = [
  "The heavyweight cotton possesses a remarkable substance and matte texture that feels far more substantial than a standard luxury tee.",
  "From the prompt delivery to the meticulous packaging, the entire experience reflects the brand’s commitment to precision and restraint.",
  "Having explored various labels, this T-shirt stands out as the definitive foundational piece for a modern, high-end wardrobe.",
  "The execution of the structured shoulders and the clean silhouette captures the true essence of Japanese street luxury.",
  "The slightly oversized cut is intentional and sharp, delivering a confident profile that has quickly made this my daily uniform.",
  "There is a distinct elegance in how the heavy fabric drapes, maintaining its shape while feeling incredibly smooth against the skin.",
  "A masterclass in 'less is more,' where the quality of the material and the proportion of the cut do all the talking.",
  "The silhouette is so striking and architectural that it draws attention despite its minimalist, understated design.",
  "It strikes the perfect balance between rugged durability for longevity and a refined softness that ensures all-day comfort.",
  "The matte finish provides a depth of color that is perfectly represented, looking even more sophisticated in natural light.",
];

const COMMENTS_MID = [
  "While the aesthetic is exceptional, be mindful that the structured shoulders create a very specific, tailored silhouette.",
  "Considering the weight of the cotton and the precision of the stitching, this offers impressive value for a luxury-tier essential.",
  "The style is undeniably sharp, though I expected a slightly denser hand-feel given the heavyweight description.",
  "Although the shipping timeline could be improved, the quality of the drape and finish made the wait worthwhile.",
  "A reliable and versatile piece that functions perfectly as a base layer or a standalone statement.",
  "The oversized silhouette is quite generous, offering a relaxed feel without sacrificing the clean, structured look.",
  "It perfectly captures that specific Tokyo street-style vibe through its boxy cut and minimal branding.",
  "The shape retention is so impressive after the first wash that I’m already considering adding the other colorways to my rotation.",
  "It manages to be remarkably simple while still feeling like a deliberate, high-fashion choice.",
  "Its restrained design and matte texture make it incredibly easy to pair with everything from technical trousers to raw denim.",
];

// Simple seeded random to ensure same product always gets same reviews
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function getReviewsForProduct(productId: string): {
  reviews: Review[];
  stats: ReviewStats;
} {
  // Generate a numeric seed from the string ID
  let seed = productId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Determine number of reviews (between 5 and 50)
  const count = Math.floor(seededRandom(seed) * 45) + 5;

  // Determine average rating bias (high quality products!)
  // 60-90% chance of high rating
  const qualityFactor = seededRandom(seed + 1);

  const reviews: Review[] = [];
  const starCounts = [0, 0, 0, 0, 0]; // 1, 2, 3, 4, 5

  for (let i = 0; i < count; i++) {
    // RNG including iteration index
    const r = seededRandom(seed + i + 100);

    // Decide rating: weighted towards 4 and 5
    let rating;
    if (r > 0.3) rating = 5;
    else if (r > 0.1) rating = 4;
    else rating = 3;

    starCounts[rating - 1]++;

    const author =
      JAPANESE_NAMES[
        Math.floor(r * JAPANESE_NAMES.length * 10) % JAPANESE_NAMES.length
      ];
    const avatar = author
      .split(" ")
      .map((n) => n[0])
      .join("");

    let title, content;
    if (rating >= 4) {
      title =
        REVIEW_TITLES_HIGH[
          Math.floor(r * REVIEW_TITLES_HIGH.length * 10) %
            REVIEW_TITLES_HIGH.length
        ];
      content =
        COMMENTS_HIGH[
          Math.floor(r * COMMENTS_HIGH.length * 10) % COMMENTS_HIGH.length
        ];
    } else {
      title =
        REVIEW_TITLES_MID[
          Math.floor(r * REVIEW_TITLES_MID.length * 10) %
            REVIEW_TITLES_MID.length
        ];
      content =
        COMMENTS_MID[
          Math.floor(r * COMMENTS_MID.length * 10) % COMMENTS_MID.length
        ];
    }

    // Random date within last year
    const date = new Date(
      Date.now() - Math.floor(r * 365 * 24 * 60 * 60 * 1000)
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    reviews.push({
      id: `${productId}-review-${i}`,
      author,
      avatar,
      date,
      rating,
      title,
      content,
    });
  }

  // Calculate stats
  const totalStars = starCounts.reduce((acc, c, i) => acc + c * (i + 1), 0);
  const average = Number((totalStars / count).toFixed(1));
  const breakdown = [...starCounts]
    .reverse()
    .map((c) => Math.round((c / count) * 100)); // 5 to 1

  // Sort reviews by date descending (mock)
  // Actually we just return first 5-10 for display? No, return all, component handles slice if needed
  // Let's just return top 5 reviews for the list
  const displayReviews = reviews.slice(0, 5);

  return {
    reviews: displayReviews,
    stats: {
      average,
      count,
      breakdown,
    },
  };
}
