export const footer = {
  en: {
    brand: {
      name: "KAIRO",
      tagline:
        "Redefining luxury through Japanese craftsmanship and timeless design.",
      copyright: "© 2025 KAIRO. All rights reserved.",
    },
    sections: [
      {
        title: "Collections",
        links: [
          { label: "Shop All", href: "/shop" },
          { label: "New Arrivals", href: "/shop?sort=newest" },
          { label: "Knitwear", href: "/shop?category=Knitwear" },
          { label: "Outerwear", href: "/shop?category=Outerwear" },
        ],
      },
      {
        title: "The Brand",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Our Journey", href: "/about#journey" },
          { label: "Blogs", href: "/blogs" },
        ],
      },
      {
        title: "Exclusives",
        links: [
          { label: "Instagram", href: "https://instagram.com" },
          { label: "Pinterest", href: "https://pinterest.com" },
        ],
      },
    ],
    newsletter: {
      title: "Join the Circle",
      description: "Receive updates on new collections and exclusive events.",
      placeholder: "Email address",
      button: "Subscribe",
    },
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Shipping", href: "/shipping" },
    ],
  },
  ja: {
    brand: {
      name: "KAIRO",
      tagline:
        "日本の職人技とタイムレスなデザインを通じて、ラグジュアリーを再定義する。",
      copyright: "© 2025 KAIRO. 全著作権所有。",
    },
    sections: [
      {
        title: "コレクション",
        links: [
          { label: "すべて見る", href: "/shop" },
          { label: "新作", href: "/shop?sort=newest" },
          { label: "ニットウェア", href: "/shop?category=Knitwear" },
          { label: "アウターウェア", href: "/shop?category=Outerwear" },
        ],
      },
      {
        title: "ブランド",
        links: [
          { label: "私たちについて", href: "/about" },
          { label: "歩み", href: "/about#journey" },
          { label: "ブログ", href: "/blogs" },
        ],
      },
      {
        title: "エクスクルーシブ",
        links: [
          { label: "Instagram", href: "https://instagram.com" },
          { label: "Pinterest", href: "https://pinterest.com" },
        ],
      },
    ],
    newsletter: {
      title: "ニュースレター",
      description: "最新のコレクションや限定イベントの情報をお届けします。",
      placeholder: "メールアドレス",
      button: "登録",
    },
    legal: [
      { label: "プライバシーポリシー", href: "/privacy" },
      { label: "利用規約", href: "/terms" },
      { label: "配送について", href: "/shipping" },
    ],
  },
} as const;
