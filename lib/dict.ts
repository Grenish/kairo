export const dict = {
  en: {
    navbar: {
      brand: "Kairo",
      links: {
        home: "Home",
        browse: "Browse",
        newArrivals: "New Arrivals",
        philosophy: "Philosophy",
      },
      searchPlaceholder: "Search...",
      language: {
        en: "EN",
        ja: "JA",
      },
      userMenu: {
        account: "Account",
        settings: "Settings",
        logout: "Logout",
      },
    },
    hero: {
      sideTagline: "Dumplings over flowers",
      est: "EST",
      year: "2025",
      title: "Style is woven from threads of patience and choice",
      description:
        "Discover our finest collection, made with thoughtfully selected fabrics influenced by Japanese textile craftsmanship.",
      ctaExplore: "Explore More",
      ctaBrowse: "Browse Catalogue",
    },
    categorySection: {
      title: "Shop Category",
      cta: "Shop",
      categories: [
        {
          id: 1,
          img: "/shop/shirt.png",
          alt: "Minimal Japanese designer shirt",
          href: "/en",
          headline: "Refined Shirts",
        },
        {
          id: 2,
          img: "/shop/pants.png",
          alt: "Modern Japanese designer pants",
          href: "/en",
          headline: "Modern Pants",
        },
        {
          id: 3,
          img: "/shop/sweater.png",
          alt: "Unisex Japanese knit sweater",
          href: "/en",
          headline: "Unisex Sweaters",
        },
        {
          id: 4,
          img: "/shop/tops.png",
          alt: "Minimal Japanese women’s top",
          href: "/en",
          headline: "Women’s Tops",
        },
      ],
    },
  },
  ja: {
    navbar: {
      brand: "Kairo",
      links: {
        home: "ホーム",
        browse: "ブラウズ",
        newArrivals: "新着",
        philosophy: "哲学",
      },
      searchPlaceholder: "検索...",
      language: {
        en: "EN",
        ja: "JA",
      },
      userMenu: {
        account: "アカウント",
        settings: "設定",
        logout: "ログアウト",
      },
    },
    hero: {
      sideTagline: "花より団子",
      est: "創業",
      year: "2025",
      title: "スタイルは、忍耐と選択の糸から織り上げられる",
      description:
        "日本の繊維技術に着想を得た、厳選された素材で仕立てた私たちのコレクションをご覧ください。",
      ctaExplore: "詳しく見る",
      ctaBrowse: "カタログを見る",
    },
    categorySection: {
      title: "カテゴリーから探す",
      cta: "見る",
      categories: [
        {
          id: 1,
          img: "/shop/shirt.png",
          alt: "ミニマルな日本風デザインのシャツ",
          href: "/ja",
          headline: "シャツ",
        },
        {
          id: 2,
          img: "/shop/pants.png",
          alt: "モダンな日本風デザインのパンツ",
          href: "/ja",
          headline: "パンツ",
        },
        {
          id: 3,
          img: "/shop/sweater.png",
          alt: "ユニセックスの日本風ニットセーター",
          href: "/ja",
          headline: "セーター",
        },
        {
          id: 4,
          img: "/shop/tops.png",
          alt: "ミニマルな日本風レディーストップス",
          href: "/ja",
          headline: "トップス",
        },
      ],
    },
  },
} as const;
