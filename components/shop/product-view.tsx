"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/components/product-card";
import {
  IconCheck,
  IconCurrencyYen,
  IconHeart,
  IconMinus,
  IconPlus,
  IconShare,
  IconShoppingBag,
  IconCreditCard,
  IconStarFilled,
  IconStar,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { SizeGuide } from "./size-guide";
import { slugify } from "@/lib/products";

interface ProductViewProps {
  product: Product;
  rating?: number;
  reviewCount?: number;
}

import { dict } from "@/lib/dict";
import { useCartActions } from "@/components/providers/cart-provider";

export function ProductView({
  product,
  rating = 4.8,
  reviewCount = 124,
}: ProductViewProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const params = useParams();
  const router = useRouter();
  const lang = (params.lang as "en" | "ja") || "en";
  const t = dict[lang].product;
  const { addToCart } = useCartActions();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pb-20 items-start">
      <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4">
        <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide lg:w-24 shrink-0">
          {product.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className={cn(
                "relative shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden border-2 transition-all",
                selectedImage === img
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-muted-foreground/30"
              )}
            >
              <Image
                src={img}
                alt={`${product.title} View ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative aspect-3/4 w-full rounded-2xl overflow-hidden bg-secondary/5 border">
          <Image
            src={selectedImage}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 rounded-full shadow-sm hover:scale-105 transition-all"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <IconHeart
              className={cn(
                "w-5 h-5 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-foreground"
              )}
            />
          </Button>
        </div>
      </div>

      {/* Right Column - Product Details (5 cols) */}
      <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24 h-fit">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Badge className="rounded-full px-3 py-1 font-medium bg-primary/10 text-primary hover:bg-primary/20 border-none">
              {t.newArrival}
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 font-medium bg-background"
            >
              {t.inStock}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
            {product.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-foreground">
            <div className="flex items-center gap-1">
              <div className="flex items-center text-yellow-500">
                <IconStarFilled className="w-4 h-4" />
                <IconStarFilled className="w-4 h-4" />
                <IconStarFilled className="w-4 h-4" />
                <IconStarFilled className="w-4 h-4" />
                <IconStarFilled className="w-4 h-4 text-muted/30" />
              </div>
              <span className="font-semibold">{rating}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span className="underline cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
              {reviewCount} {t.reviews}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-end gap-3">
            <span className="text-4xl md:text-5xl font-bold font-mono tracking-tight">
              ¥{product.price.toLocaleString()}
            </span>
            <span className="text-muted-foreground text-sm mb-1.5">
              {t.taxIncluded}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{t.freeShipping}</p>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{t.selectSize}</span>
            <SizeGuide lang={lang} />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.sizes.map((size) => (
              <Button
                key={size}
                variant="default"
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "h-12",
                  selectedSize === size
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-32 shrink-0">
              <div className="relative flex items-center w-full border-2 rounded-xl h-14 bg-background">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  disabled={quantity <= 1}
                >
                  <IconMinus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center font-semibold text-lg">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <IconPlus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <Button
              size="lg"
              className="flex-1 h-14 text-base rounded-xl gap-2 font-semibold shadow-lg shadow-primary/20"
              onClick={() => {
                const cartT = dict[lang].cart;
                if (!selectedSize) {
                  // toast.error(cartT.selectSizeError);
                  return;
                }
                addToCart(product, quantity, selectedSize);
                // toast.success(cartT.addedToCart);
                setQuantity(1);
                setSelectedSize(null);
              }}
            >
              <IconShoppingBag className="w-5 h-5" />
              {t.addToCart}
            </Button>
          </div>
          <Button
            size="lg"
            variant="outline"
            className="w-full h-12 rounded-xl border-2 hover:bg-secondary/50"
            onClick={() => {
              const slug = product.slug || slugify(product.title);
              router.push(`/${lang}/checkout/${slug}`);
            }}
          >
            <IconCreditCard className="w-5 h-5 mr-2" />
            {t.buyNow}
          </Button>
        </div>

        <div className="prose prose-sm text-muted-foreground pt-6 border-t">
          <h3 className="text-foreground font-semibold mb-2">
            {t.description}
          </h3>
          <p className="leading-relaxed">{product.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-secondary/10 border border-border/50 space-y-1">
            <IconCheck className="w-5 h-5 text-green-500 mb-2" />
            <h4 className="font-medium text-sm">{t.authenticDesign}</h4>
            <p className="text-xs text-muted-foreground">
              {t.authenticDesignDesc}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/10 border border-border/50 space-y-1">
            <IconCheck className="w-5 h-5 text-green-500 mb-2" />
            <h4 className="font-medium text-sm">{t.premiumMaterial}</h4>
            <p className="text-xs text-muted-foreground">
              {t.premiumMaterialDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
