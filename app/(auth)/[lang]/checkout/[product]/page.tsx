import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft, IconBuildingBank, IconGift } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CheckoutForm from "./checkout-form";
import { dict } from "@/lib/dict";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ja"; product: string }>;
}) {
  const { lang, product: slug } = await params;
  const product = getProductBySlug(slug, lang);

  if (!product) {
    return notFound();
  }

  const t = dict[lang].checkout;

  // Discount / Bank Offers Mock Data
  const bankOffers = [
    { name: "Rakuten Card", discount: "5% off", icon: IconBuildingBank },
    { name: "PayPay", discount: "3% points", icon: IconGift },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Column: Product & Order Summary */}
      <div className="w-full lg:w-5/12 bg-muted/30 p-6 lg:p-12 lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto border-r border-border order-1 lg:order-1 flex flex-col">
        <div className="mb-8">
          <Link
            href={`/${lang}/shop/${slug}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconArrowLeft className="w-4 h-4 mr-2" />
            {t.backToProduct}
          </Link>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-6">{t.orderSummary}</h2>

          <div className="flex gap-4 mb-8">
            <div className="relative w-24 h-32 rounded-md overflow-hidden bg-secondary">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h3 className="font-medium leading-snug">{product.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    Size: M
                  </Badge>
                </div>
              </div>
              <p className="font-semibold">¥{product.price.toLocaleString()}</p>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Coupon Code */}
          <div className="mb-8">
            <label className="text-sm font-medium mb-2 block">
              {t.giftCardLabel}
            </label>
            <div className="flex gap-2">
              <Input
                placeholder={t.giftCardPlaceholder}
                className="bg-background"
              />
              <Button variant="outline">{t.apply}</Button>
            </div>
          </div>

          {/* Bank Offers */}
          <div className="mb-8">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">
              {t.availableOffers}
            </h4>
            <div className="space-y-3">
              {bankOffers.map((offer) => (
                <div
                  key={offer.name}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-background/50 text-sm"
                >
                  <offer.icon className="w-5 h-5 text-indigo-500" />
                  <div className="flex-1">
                    <span className="font-medium">{offer.name}</span>
                    <span className="text-muted-foreground ml-2">
                      — {offer.discount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.subtotal}</span>
              <span>¥{product.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.shipping}</span>
              <span>{t.calculatedNextStep}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-4 border-t mt-4">
              <span>{t.total}</span>
              <span>¥{product.price.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          <p>{t.poweredBy}</p>
        </div>
      </div>

      {/* Right Column: Checkout Form */}
      <div className="w-full lg:w-7/12 p-6 lg:p-12 order-2 lg:order-2">
        <div className="max-w-2xl mx-auto">
          <CheckoutForm lang={lang} />
        </div>
      </div>
    </div>
  );
}
