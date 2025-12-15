import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconCurrencyYen,
  IconHeart,
  IconShoppingBag,
} from "@tabler/icons-react";

export interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  sizes: readonly string[];
  images: readonly [string, ...string[]];
}

export type ProductCardProps = {
  product: Product;
  addToCartText: string;
  className?: string;
  isFavorite?: boolean;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
};

export default function ProductCard({
  product,
  addToCartText,
  className,
  isFavorite = false,
  onAddToCart,
  onToggleFavorite,
}: ProductCardProps) {
  const { title, description, price, sizes, images } = product;
  const [frontImage, backImage] = images;

  return (
    <Card
      className={`group/card w-full max-w-xl border-0 shadow-none rounded-xl overflow-hidden pt-0 ${className ?? ""}`}
    >
      <div className="relative overflow-hidden bg-secondary/20 aspect-square">
        <Image
          src={frontImage}
          alt={`A model wearing ${title}`}
          width={500}
          height={500}
          className="object-cover w-full h-full transition-opacity duration-500 group-hover/card:opacity-0 ease-in-out"
        />
        {backImage ? (
          <Image
            src={backImage}
            alt={`${title} product shoot`}
            width={500}
            height={500}
            className="absolute inset-0 object-cover w-full h-full opacity-0 transition-opacity duration-500 ease-in-out group-hover/card:opacity-100"
          />
        ) : null}
        <Button
          variant="ghost"
          size="icon"
          aria-pressed={isFavorite}
          className={`absolute z-10 top-2 right-2 md:top-3 md:right-3 h-8 w-8 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:text-red-500 transition-colors ${isFavorite ? "text-red-500" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(product);
          }}
        >
          <IconHeart size={18} stroke={1.5} />
        </Button>
      </div>

      <CardContent className="p-3 md:p-4">
        <div className="flex justify-between items-start gap-3 mb-2">
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-medium leading-tight truncate md:text-base text-foreground">
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
          className="w-full rounded-lg gap-2 text-xs md:text-sm h-9 md:h-10"
          onClick={() => onAddToCart?.(product)}
        >
          <IconShoppingBag className="w-4 h-4" />
          {addToCartText}
        </Button>
      </CardContent>
    </Card>
  );
}
