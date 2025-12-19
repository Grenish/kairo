"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconCurrencyYen,
  IconHeart,
  IconShoppingBag,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";
import Link from "next/link";
import { slugify } from "@/lib/products";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useMemo, memo } from "react";
import { dict } from "@/lib/dict";
import { useCartActions } from "@/components/providers/cart-provider";

export interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  sizes: readonly string[];
  images: readonly [string, ...string[]];
  slug?: string;
}

export type ProductCardProps = {
  product: Product;
  addToCartText: string;
  className?: string;
  isFavorite?: boolean;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  lang?: string;
};

function ProductCard({
  product,
  addToCartText,
  className,
  isFavorite = false,
  onAddToCart,
  onToggleFavorite,
  lang = "en",
}: ProductCardProps) {
  const { title, description, price, sizes, images, slug } = product;
  const [frontImage, backImage] = images;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartActions();

  // Cast lang to ensure it's a valid key if needed, or default to en
  const t = dict[(lang as "en" | "ja") || "en"].cart;

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleConfirmAddToCart = () => {
    if (!selectedSize) {
      // toast.error(t.selectSizeError);
      return;
    }

    addToCart(product, quantity, selectedSize);
    setIsDialogOpen(false);

    // Reset state
    setSelectedSize(null);
    setQuantity(1);

    // Optional: call the original prop if provided
    onAddToCart?.(product);
  };

  return (
    <>
      <Card
        className={cn(
          "group/card w-full max-w-xl border-0 shadow-none rounded-xl overflow-hidden pt-0 relative",
          className
        )}
      >
        <div className="relative overflow-hidden bg-secondary/20 aspect-square">
          <Image
            src={frontImage}
            alt={`A model wearing ${title}`}
            width={500}
            height={500}
            className="object-cover w-full h-full transition-opacity duration-500 group-hover/card:opacity-0 ease-in-out relative z-0"
          />
          {backImage ? (
            <Image
              src={backImage}
              alt={`${title} product shoot`}
              width={500}
              height={500}
              className="absolute inset-0 object-cover w-full h-full opacity-0 transition-opacity duration-500 ease-in-out group-hover/card:opacity-100 z-0"
            />
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            aria-pressed={isFavorite}
            className={cn(
              "absolute z-10 top-2 right-2 md:top-3 md:right-3 h-8 w-8 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:text-red-500 transition-colors",
              isFavorite ? "text-red-500" : ""
            )}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(product);
            }}
          >
            <IconHeart size={18} stroke={1.5} />
          </Button>
        </div>

        <CardContent className="p-3 md:p-4 pointer-events-none">
          <div className="flex justify-between items-start gap-3 mb-2">
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-medium leading-tight truncate md:text-base text-foreground group-hover/card:underline underline-offset-4 decoration-1">
                {title}
              </h2>
              <p className="text-xs text-muted-foreground truncate mt-0.5 md:mt-1">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-0.5 font-semibold shrink-0 text-base md:text-lg lg:text-xl text-foreground">
              <IconCurrencyYen
                stroke={2}
                className="w-4 h-4 md:w-4.5 md:h-4.5 text-muted-foreground"
              />
              <span>{price.toLocaleString("en-US")}</span>
            </div>
          </div>

          <div className="flex gap-1.5 flex-wrap mb-3 md:mb-4">
            {sizes.map((size) => (
              <Badge
                key={size}
                variant="secondary"
                className="rounded-md px-1.5 py-0.5 text-[10px] md:text-xs font-normal text-muted-foreground hover:bg-secondary/80 cursor-default"
              >
                {size}
              </Badge>
            ))}
          </div>

          <Button
            className="w-full rounded-lg gap-2 text-xs md:text-sm h-9 md:h-10 z-20 relative pointer-events-auto"
            onClick={handleAddToCartClick}
          >
            <IconShoppingBag className="w-4 h-4" />
            {addToCartText}
          </Button>
        </CardContent>

        {lang && (
          <Link
            href={`/${lang}/shop/${slug || slugify(title)}`}
            className="absolute inset-0 z-0"
            aria-label={title}
          />
        )}
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>{t.addToCart}</DialogTitle>
            <DialogDescription>{title}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">{t.size}</h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="min-w-12"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium leading-none">{t.quantity}</h4>
              <div className="flex items-center w-32 border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <IconMinus className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center text-sm font-medium">
                  {quantity}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <IconPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmAddToCart}>{t.addToCart}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default memo(ProductCard);
