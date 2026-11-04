import type { Locale } from "./i18n";

/**
 * The Kairo collection. Every piece is named for one Japanese word, and that word is
 * part of the data: it is shown as the piece's name tag across the site.
 *
 * Material, origin, fit and care lines are sample details written for the redesign;
 * confirm them before launch.
 */

export type Category =
  | "tailoring"
  | "knitwear"
  | "tops"
  | "trousers"
  | "dresses"
  | "kimono";

type Text = Record<Locale, string>;

interface CatalogEntry {
  id: string;
  slug: string;
  word: string;
  kana: string;
  reading: string;
  meaning: Text;
  title: Text;
  kind: Text;
  category: Category;
  price: number;
  sizes: readonly string[];
  /** On a person. */
  worn: string;
  /** The garment alone on a plain ground. */
  flat: string;
  description: Text;
  material: Text;
  madeIn: Text;
  fit: Text;
  care: Text;
  colour: Text;
  isNew?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  word: string;
  kana: string;
  reading: string;
  meaning: string;
  /** What to print beside the kanji: the meaning in English, the reading in Japanese. */
  gloss: string;
  /** How the word is said: romaji in English, kana in Japanese. */
  say: string;
  /** The meaning when it adds something to the word (in Japanese, 影 means 影). */
  aside: string;
  title: string;
  kind: string;
  category: Category;
  price: number;
  sizes: readonly string[];
  worn: string;
  flat: string;
  images: readonly [string, string];
  description: string;
  material: string;
  madeIn: string;
  fit: string;
  care: string;
  colour: string;
  isNew: boolean;
}

const CATALOG: readonly CatalogEntry[] = [
  {
    id: "ai",
    slug: "ai-wrap-top",
    word: "藍",
    kana: "あい",
    reading: "Ai",
    meaning: { en: "indigo", ja: "藍色" },
    title: { en: "Ai Wrap Top", ja: "藍の打ち合わせトップス" },
    kind: { en: "Wrap top", ja: "打ち合わせトップス" },
    category: "tops",
    price: 34000,
    sizes: ["S", "M", "L"],
    worn: "/products/kiyaro-wrap-top-1.png",
    flat: "/products/kiyaro-wrap-top-2.png",
    description: {
      en: "Cotton dyed with indigo, cut with a crossed front like a kimono and fastened with an inside tie. The colour softens and lightens with every wash.",
      ja: "藍で染めたコットンを、着物のような打ち合わせに仕立てました。内側の紐で留めます。洗うたびに色が柔らかく、明るくなっていきます。",
    },
    material: { en: "Indigo-dyed cotton twill", ja: "藍染めコットンツイル" },
    madeIn: { en: "Dyed in Tokushima, sewn in Tokyo", ja: "徳島で染め、東京で縫製" },
    fit: { en: "Relaxed through the body", ja: "身幅はゆったりめ" },
    care: { en: "Wash separately, cold", ja: "単独で冷水洗い" },
    colour: { en: "Indigo", ja: "藍色" },
    isNew: true,
  },
  {
    id: "sumi",
    slug: "sumi-asymmetric-wrap-top",
    word: "墨",
    kana: "すみ",
    reading: "Sumi",
    meaning: { en: "ink black", ja: "墨の黒" },
    title: { en: "Sumi Asymmetric Wrap Top", ja: "墨のアシンメトリートップス" },
    kind: { en: "Asymmetric wrap top", ja: "アシンメトリートップス" },
    category: "tops",
    price: 36500,
    sizes: ["XS", "S", "M", "L"],
    worn: "/products/kuro-asym-wrap-kimono-top-1.png",
    flat: "/products/kuro-asym-wrap-kimono-top-2.png",
    description: {
      en: "A black top that wraps to one side and closes at the hip, with wide three-quarter sleeves. Worn over the Enso trousers it reads as one piece.",
      ja: "片側へ打ち合わせ、腰で留める黒のトップス。七分丈の広い袖。円相のトラウザーズに重ねると、ひとつながりに見えます。",
    },
    material: { en: "Wool gabardine", ja: "ウールギャバジン" },
    madeIn: { en: "Sewn in Tokyo", ja: "東京で縫製" },
    fit: { en: "Boxy, cropped at the hip", ja: "ボクシー、腰丈" },
    care: { en: "Dry clean", ja: "ドライクリーニング" },
    colour: { en: "Ink black", ja: "墨色" },
    isNew: true,
  },
  {
    id: "shinkai",
    slug: "shinkai-modern-tailored-suit",
    word: "深海",
    kana: "しんかい",
    reading: "Shinkai",
    meaning: { en: "deep sea", ja: "深い海" },
    title: { en: "Shinkai Modern Tailored Suit", ja: "深海モダンテーラードスーツ" },
    kind: { en: "Tailored suit", ja: "テーラードスーツ" },
    category: "tailoring",
    price: 68000,
    sizes: ["XS", "S", "M", "XL"],
    worn: "/products/shinkai-modern-tailored-suit-2.png",
    flat: "/products/shinkai-modern-tailored-suit-1.png",
    description: {
      en: "A softly built jacket over straight, clean trousers. The shoulders are light, the lapels narrow, and the matte cloth drapes rather than shines. Wear the two together in the evening, or the jacket alone over a T-shirt.",
      ja: "軽く仕立てたジャケットと、まっすぐなトラウザーズのセットアップ。肩は柔らかく、ラペルは細め。光沢を抑えた生地がきれいに落ちます。夜はセットで、普段はジャケットだけをTシャツに重ねて。",
    },
    material: { en: "Wool and mohair twill", ja: "ウール・モヘアのツイル" },
    madeIn: { en: "Woven in Bishū, sewn in Tokyo", ja: "尾州で織り、東京で縫製" },
    fit: { en: "True to size, 2 cm hem allowance", ja: "通常サイズ、裾は2cm出し可能" },
    care: { en: "Dry clean", ja: "ドライクリーニング" },
    colour: { en: "Mist blue", ja: "ミストブルー" },
    isNew: true,
  },
  {
    id: "kage",
    slug: "kage-form-knit-sweater",
    word: "影",
    kana: "かげ",
    reading: "Kage",
    meaning: { en: "shadow", ja: "影" }, // taste-skill-ignore: the word, not a box-shadow
    title: { en: "Kage Form Knit Sweater", ja: "影フォルムニットセーター" },
    kind: { en: "Form knit sweater", ja: "フォルムニット" },
    category: "knitwear",
    price: 29500,
    sizes: ["XS", "S", "M", "XL"],
    worn: "/products/kage-form-knit-sweater-1.png",
    flat: "/products/kage-form-knit-sweater-2.png",
    description: {
      en: "Three greys and an olive, knitted in blocks that meet at angles, so the sweater looks different from each side. The shoulders sit wide and the body drops straight.",
      ja: "三つのグレーとオリーブを、角度をつけたブロックで編み合わせました。見る方向によって表情が変わります。肩は広く、身頃はまっすぐに落ちます。",
    },
    material: { en: "Merino wool, 7 gauge", ja: "メリノウール 7ゲージ" },
    madeIn: { en: "Knitted in Yamagata", ja: "山形で編み立て" },
    fit: { en: "Relaxed; size down for a closer fit", ja: "ゆったりめ。ジャストなら1サイズ下を" },
    care: { en: "Hand wash cold, dry flat", ja: "手洗い(冷水)、平干し" },
    colour: { en: "Charcoal, ash and olive", ja: "チャコール・アッシュ・オリーブ" },
    isNew: true,
  },
  {
    id: "sora",
    slug: "sora-heavyweight-t-shirt",
    word: "空",
    kana: "そら",
    reading: "Sora",
    meaning: { en: "sky", ja: "空" },
    title: { en: "Sora Heavyweight T-Shirt", ja: "空ヘビーウェイトTシャツ" },
    kind: { en: "Heavyweight T-shirt", ja: "ヘビーウェイトTシャツ" },
    category: "tops",
    price: 12800,
    sizes: ["XS", "S", "M"],
    worn: "/products/sora-heavyweight-tshirt-1.png",
    flat: "/products/sora-heavyweight-tshirt-2.png",
    description: {
      en: "A thick cotton T-shirt cut slightly wide, with black panels across the shoulders and grey sleeves. It keeps its shape after many washes.",
      ja: "やや身幅を広くとった、厚手コットンのTシャツ。肩に黒、袖にグレーの切り替え。何度洗っても形が崩れにくい一枚です。",
    },
    material: { en: "Cotton jersey, 300 g/m²", ja: "コットン天竺 300g/m²" },
    madeIn: { en: "Loopwheel-knitted in Wakayama", ja: "和歌山の吊り編み機で編み立て" },
    fit: { en: "Slightly oversized", ja: "ややオーバーサイズ" },
    care: { en: "Machine wash cold, hang dry", ja: "洗濯機可(冷水)、陰干し" },
    colour: { en: "Unbleached, black and grey", ja: "生成り・ブラック・グレー" },
  },
  {
    id: "kuro",
    slug: "kuro-utility-cargo-pants",
    word: "黒",
    kana: "くろ",
    reading: "Kuro",
    meaning: { en: "black", ja: "黒" },
    title: { en: "Kuro Utility Cargo Pants", ja: "黒ユーティリティカーゴパンツ" },
    kind: { en: "Utility cargo pants", ja: "カーゴパンツ" },
    category: "trousers",
    price: 12800,
    sizes: ["S", "M", "L"],
    worn: "/products/kuro-utility-cargo-pants-1.png",
    flat: "/products/kuro-utility-cargo-pants-2.png",
    description: {
      en: "Olive and grey cargo trousers with deep pockets on both legs and a straight, roomy cut. Heavy cotton that softens the more it is worn.",
      ja: "両脚に深いポケットを備えた、オリーブとグレーのカーゴパンツ。ゆとりのあるストレートシルエット。厚手のコットンは、穿くほどに柔らかくなります。",
    },
    material: { en: "Cotton canvas, 12 oz", ja: "コットンキャンバス 12オンス" },
    madeIn: { en: "Sewn in Okayama", ja: "岡山で縫製" },
    fit: { en: "Relaxed, straight leg", ja: "リラックスしたストレート" },
    care: { en: "Machine wash inside out", ja: "裏返して洗濯機可" },
    colour: { en: "Olive and slate", ja: "オリーブ・スレート" },
  },
  {
    id: "kuro-silence",
    slug: "kuro-silence-wrap-dress",
    word: "黒の静寂",
    kana: "くろのせいじゃく",
    reading: "Kuro no seijaku",
    meaning: { en: "black silence", ja: "黒い静けさ" },
    title: { en: "Kuro Silence Wrap Dress", ja: "黒の静寂ラップドレス" },
    kind: { en: "Wrap dress", ja: "ラップドレス" },
    category: "dresses",
    price: 38000,
    sizes: ["XS", "S", "M", "L"],
    worn: "/trending/kuro-silence-wrap-dress-1.png",
    flat: "/trending/kuro-silence-wrap-dress-2.png",
    description: {
      en: "A long black dress that wraps and ties at the waist, with wide sleeves cut like a kimono's. Nothing on it but the line of the wrap.",
      ja: "腰で結ぶ、ロング丈の黒いラップドレス。袖は着物のように広く仕立てました。飾りはなく、重なりの線だけが残ります。",
    },
    material: { en: "Triacetate crepe", ja: "トリアセテートのクレープ" },
    madeIn: { en: "Sewn in Tokyo", ja: "東京で縫製" },
    fit: { en: "Adjustable at the waist", ja: "ウエストで調整可能" },
    care: { en: "Hand wash or dry clean", ja: "手洗いまたはドライクリーニング" },
    colour: { en: "Black", ja: "ブラック" },
  },
  {
    id: "hikari",
    slug: "hikari-flow-dress",
    word: "光",
    kana: "ひかり",
    reading: "Hikari",
    meaning: { en: "light", ja: "光" },
    title: { en: "Hikari Flow Dress", ja: "光のフロードレス" },
    kind: { en: "Flow dress", ja: "フロードレス" },
    category: "dresses",
    price: 29800,
    sizes: ["XS", "S", "M", "L"],
    worn: "/trending/hikari-flow-dress-1.png",
    flat: "/trending/hikari-flow-dress-2.png",
    description: {
      en: "A lilac dress with a stand collar and short sleeves, fitted to the waist and loose below it, so the skirt moves when you walk.",
      ja: "スタンドカラーと短い袖のライラックのドレス。ウエストまでは体に沿い、その下は歩くたびにスカートが揺れるよう、ゆとりを持たせました。",
    },
    material: { en: "Cotton and silk poplin", ja: "コットン・シルクのポプリン" },
    madeIn: { en: "Sewn in Tokyo", ja: "東京で縫製" },
    fit: { en: "Fitted waist, full skirt", ja: "ウエストはフィット、裾はフレア" },
    care: { en: "Hand wash cold", ja: "手洗い(冷水)" },
    colour: { en: "Lilac", ja: "ライラック" },
  },
  {
    id: "akane",
    slug: "akane-heritage-kimono",
    word: "茜",
    kana: "あかね",
    reading: "Akane",
    meaning: { en: "madder red", ja: "茜色" },
    title: { en: "Akane Heritage Kimono", ja: "茜の遺産着物" },
    kind: { en: "Silk kimono", ja: "正絹の着物" },
    category: "kimono",
    price: 120000,
    sizes: ["S", "M", "L", "XL"],
    worn: "/trending/akane-heritage-kimono-1.png",
    flat: "/trending/akane-heritage-kimono-2.png",
    description: {
      en: "A madder-red silk kimono with cream and gold peonies, worn with a woven gold obi. Made to order in four weeks and fitted to your height.",
      ja: "クリームと金の牡丹を描いた、茜色の正絹の着物。金糸の帯を合わせて。ご注文から四週間で、身長に合わせてお仕立てします。",
    },
    material: { en: "Silk crepe", ja: "正絹ちりめん" },
    madeIn: { en: "Woven in Kyoto, tailored in Tokyo", ja: "京都で織り、東京で仕立て" },
    fit: { en: "Made to your height", ja: "身長に合わせてお仕立て" },
    care: { en: "Specialist kimono cleaning", ja: "着物専門のクリーニング" },
    colour: { en: "Madder red", ja: "茜色" },
  },
  {
    id: "enso",
    slug: "enso-tailored-pants",
    word: "円相",
    kana: "えんそう",
    reading: "Ensō",
    meaning: { en: "the zen circle", ja: "禅の円" },
    title: { en: "Enso Tailored Pants", ja: "円相テーラードパンツ" },
    kind: { en: "Tailored trousers", ja: "テーラードトラウザーズ" },
    category: "tailoring",
    price: 28500,
    sizes: ["S", "M", "L", "XL"],
    worn: "/trending/enso-tailored-pants-1.png",
    flat: "/trending/enso-tailored-pants-2.png",
    description: {
      en: "Charcoal trousers with two pleats at the front and a straight leg that breaks once at the shoe. They go with the Shinkai jacket or with a knit.",
      ja: "前に二本のプリーツを入れた、チャコールのトラウザーズ。まっすぐな脚は靴の上で一度だけ折れます。深海のジャケットにも、ニットにも。",
    },
    material: { en: "Wool flannel", ja: "ウールフランネル" },
    madeIn: { en: "Woven in Bishū, sewn in Tokyo", ja: "尾州で織り、東京で縫製" },
    fit: { en: "High rise, straight leg", ja: "ハイライズ、ストレート" },
    care: { en: "Dry clean", ja: "ドライクリーニング" },
    colour: { en: "Charcoal", ja: "チャコール" },
  },
];

export const CATEGORIES: readonly Category[] = [
  "tailoring",
  "knitwear",
  "tops",
  "trousers",
  "dresses",
  "kimono",
];

export const CATEGORY_LABEL: Record<Category, Text> = {
  tailoring: { en: "Tailoring", ja: "テーラリング" },
  knitwear: { en: "Knitwear", ja: "ニット" },
  tops: { en: "Tops", ja: "トップス" },
  trousers: { en: "Trousers", ja: "パンツ" },
  dresses: { en: "Dresses", ja: "ドレス" },
  kimono: { en: "Kimono", ja: "着物" },
};

export const SIZES = ["XS", "S", "M", "L", "XL"] as const;

/** Shop terms used by the bag, product page and checkout. */
export const SHOP = {
  freeShippingFrom: 50000,
  shipping: 500,
  cashOnDeliveryFee: 330,
  returnDays: 14,
};

function localize(entry: CatalogEntry, lang: Locale): Product {
  return {
    id: entry.id,
    slug: entry.slug,
    word: entry.word,
    kana: entry.kana,
    reading: entry.reading,
    meaning: entry.meaning[lang],
    gloss: lang === "ja" ? entry.kana : entry.meaning.en,
    say: lang === "ja" ? entry.kana : entry.reading,
    aside: entry.meaning[lang] === entry.word ? "" : entry.meaning[lang],
    title: entry.title[lang],
    kind: entry.kind[lang],
    category: entry.category,
    price: entry.price,
    sizes: entry.sizes,
    worn: entry.worn,
    flat: entry.flat,
    images: [entry.worn, entry.flat],
    description: entry.description[lang],
    material: entry.material[lang],
    madeIn: entry.madeIn[lang],
    fit: entry.fit[lang],
    care: entry.care[lang],
    colour: entry.colour[lang],
    isNew: Boolean(entry.isNew),
  };
}

export function getProducts(lang: Locale): Product[] {
  return CATALOG.map((entry) => localize(entry, lang));
}

export function getProduct(id: string, lang: Locale): Product | undefined {
  const entry = CATALOG.find((e) => e.id === id);
  return entry ? localize(entry, lang) : undefined;
}

export function getProductBySlug(slug: string, lang: Locale): Product | undefined {
  const entry = CATALOG.find((e) => e.slug === slug);
  return entry ? localize(entry, lang) : undefined;
}

export function priceOf(id: string): number {
  return CATALOG.find((e) => e.id === id)?.price ?? 0;
}

export function formatYen(value: number): string {
  return `¥${value.toLocaleString("en-US")}`;
}

export function searchProducts(query: string, lang: Locale): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return CATALOG.filter((entry) => {
    const haystack = [
      entry.word,
      entry.kana,
      entry.reading,
      entry.meaning.en,
      entry.meaning.ja,
      entry.title.en,
      entry.title.ja,
      entry.kind.en,
      entry.kind.ja,
      CATEGORY_LABEL[entry.category].en,
      CATEGORY_LABEL[entry.category].ja,
      entry.colour.en,
      entry.colour.ja,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  }).map((entry) => localize(entry, lang));
}
