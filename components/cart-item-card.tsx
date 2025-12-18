import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { IconMinus, IconPlus } from "@tabler/icons-react";

interface CartItemCardProps {
  image: string;
  description: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
}

export default function CartItemCard({
  image,
  description,
  name,
  size,
  price,
  quantity,
}: CartItemCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex sm:h-36 gap-2">
        <div className="relative w-28 shrink-0 overflow-hidden bg-muted border-r">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex justify-between gap-3">
            <div className="space-y-1">
              <h3 className="font-semibold leading-none tracking-tight">
                {name}
              </h3>
              <p className="line-clamp-1 text-xs text-muted-foreground">
                {description.slice(0, 50)}
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1 bg-secondary px-2 py-1 font-medium text-secondary-foreground">
              <span>Size {size}</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between pt-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                Total
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-medium text-muted-foreground">
                  ¥
                </span>
                <span className="text-lg font-bold tracking-tight">
                  {price}
                </span>
              </div>
            </div>

            <div className="flex items-center rounded-md border shadow-sm">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-none rounded-l-md"
              >
                <IconMinus size={12} />
              </Button>
              <div className="flex h-7 w-8 items-center justify-center border-x bg-muted/20 text-xs font-semibold">
                {quantity}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-none rounded-r-md"
              >
                <IconPlus size={12} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
