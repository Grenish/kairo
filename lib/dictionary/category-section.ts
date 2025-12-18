export const categorySection = {
  en: {
    title: "Shop Category",
    description:
      "Shop by category to navigate our collection with clarity and purpose.",
    cta: "Shop",
    categories: [
      {
        id: 1,
        img: "/shop/shirt.png",
        alt: "Minimal Japanese designer shirt",
        href: "/shop?category=Tops",
        headline: "Refined Shirts",
      },
      {
        id: 2,
        img: "/shop/pants.png",
        alt: "Modern Japanese designer pants",
        href: "/shop?category=Bottoms",
        headline: "Modern Pants",
      },
      {
        id: 3,
        img: "/shop/sweater.png",
        alt: "Unisex Japanese knit sweater",
        href: "/shop?category=Knitwear",
        headline: "Unisex Sweaters",
      },
      {
        id: 4,
        img: "/shop/tops.png",
        alt: "Minimal Japanese women's top",
        href: "/shop?category=Tops",
        headline: "Women's Tops",
      },
    ],
  },
  ja: {
    title: "カテゴリーから探す",
    description:
      "カテゴリー別に商品を探して、明確で効率的にコレクションをご覧ください。",
    cta: "見る",
    categories: [
      {
        id: 1,
        img: "/shop/shirt.png",
        alt: "ミニマルな日本風デザインのシャツ",
        href: "/shop?category=Tops",
        headline: "シャツ",
      },
      {
        id: 2,
        img: "/shop/pants.png",
        alt: "モダンな日本風デザインのパンツ",
        href: "/shop?category=Bottoms",
        headline: "パンツ",
      },
      {
        id: 3,
        img: "/shop/sweater.png",
        alt: "ユニセックスの日本風ニットセーター",
        href: "/shop?category=Knitwear",
        headline: "セーター",
      },
      {
        id: 4,
        img: "/shop/tops.png",
        alt: "ミニマルな日本風レディーストップス",
        href: "/shop?category=Tops",
        headline: "トップス",
      },
    ],
  },
} as const;
