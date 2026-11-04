import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SizeTable } from "@/components/shop/size-guide";
import { isLocale, type Locale } from "@/lib/i18n";

// Shop terms are sample details for the redesign; confirm them before launch.
const HELP: Record<
  Locale,
  { title: string; intro: string; sections: { id: string; title: string; body: string[] }[] }
> = {
  en: {
    title: "Help",
    intro: "Shipping, returns, sizes and payment, in one place.",
    sections: [
      {
        id: "shipping",
        title: "Shipping",
        body: [
          "Every order leaves the Tokyo atelier within two working days. Made-to-order kimono take four weeks.",
          "Delivery in Japan costs ¥500 and is free on orders of ¥50,000 or more. Choose a delivery time at checkout: morning, or a two-hour window from 14:00 to 21:00.",
        ],
      },
      {
        id: "returns",
        title: "Returns",
        body: [
          "Unworn pieces with their tags can be returned within 14 days of delivery. Write to atelier@kairo.jp with your order number and we will send a return label.",
          "Made-to-order kimono are fitted to you and cannot be returned, but we will adjust them free of charge.",
        ],
      },
      {
        id: "sizes",
        title: "Sizes",
        body: [
          "Kairo sizes run from XS to XL. Measure your chest and waist over a thin layer and choose the size whose range holds both.",
        ],
      },
      {
        id: "payment",
        title: "Payment",
        body: [
          "We accept credit cards, PayPay, payment at a convenience store, and cash on delivery for a ¥330 fee. All prices include Japanese consumption tax.",
        ],
      },
      {
        id: "care",
        title: "Care",
        body: [
          "Each product page lists how to care for its cloth. Indigo-dyed cotton should be washed alone in cold water; wool is best aired between wears and dry cleaned rarely.",
        ],
      },
    ],
  },
  ja: {
    title: "ヘルプ",
    intro: "配送、返品、サイズ、お支払いについて。",
    sections: [
      {
        id: "shipping",
        title: "配送",
        body: [
          "ご注文は東京のアトリエから2営業日以内に発送します。お仕立ての着物は四週間かかります。",
          "国内配送料は¥500、¥50,000以上のご注文で無料です。お届け時間帯は、ご購入手続きで午前中または14時から21時までの2時間枠からお選びいただけます。",
        ],
      },
      {
        id: "returns",
        title: "返品",
        body: [
          "未着用でタグの付いたアイテムは、お届けから14日以内に返品いただけます。ご注文番号を添えて atelier@kairo.jp までご連絡ください。返送用の伝票をお送りします。",
          "お仕立ての着物は返品をお受けできませんが、お直しは無料で承ります。",
        ],
      },
      {
        id: "sizes",
        title: "サイズ",
        body: [
          "KairoのサイズはXSからXLまで。薄手の服の上から胸囲とウエストを測り、両方が収まるサイズをお選びください。",
        ],
      },
      {
        id: "payment",
        title: "お支払い",
        body: [
          "クレジットカード、PayPay、コンビニ払い、代金引換(手数料¥330)をご利用いただけます。価格はすべて税込です。",
        ],
      },
      {
        id: "care",
        title: "お手入れ",
        body: [
          "お手入れ方法は各商品ページに記載しています。藍染めのコットンは単独で冷水洗いを。ウールは着用ごとに風を通し、クリーニングは控えめに。",
        ],
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: HELP[lang].title, description: HELP[lang].intro };
}

export default async function HelpPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = HELP[lang];

  return (
    <div className="wrap pt-12 lg:pt-20">
      <header className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-(--gutter)">
        <h1 className="type-display text-display -ml-[0.04em] lg:col-span-7">{t.title}</h1>
        <p className="type-lead text-lead max-w-[28ch] lg:col-span-4 lg:col-start-9">{t.intro}</p>
      </header>

      <nav aria-label={t.title} className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-lead">
        {t.sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="link-quiet underline">
            {s.title}
          </a>
        ))}
      </nav>

      <div className="mt-20 grid gap-24 lg:mt-28">
        {t.sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className="grid scroll-mt-24 gap-8 lg:grid-cols-12 lg:gap-x-(--gutter)"
          >
            <h2 id={`${s.id}-title`} className="type-head text-head lg:col-span-5" data-reveal>
              {s.title}
            </h2>
            <div className="grid content-start gap-5 lg:col-span-6 lg:col-start-7" data-reveal>
              {s.body.map((p) => (
                <p key={p} className="max-w-[60ch]">
                  {p}
                </p>
              ))}
              {s.id === "sizes" && (
                <div className="mt-4">
                  <SizeTable lang={lang} />
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
