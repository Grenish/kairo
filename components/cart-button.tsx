import {
  IconArrowUpRight,
  IconCurrencyYen,
  IconGardenCart,
  IconShoppingBag,
} from "@tabler/icons-react";
import { Button, buttonVariants } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { cn } from "@/lib/utils";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import CartItemCard from "./cart-item-card";
import { useCart } from "./providers/cart-provider";
import Link from "next/link";
import { dict } from "@/lib/dict";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/products";

export default function CartButton() {
  const {
    items,
    itemCount,
    subtotal,
    removeFromCart,
    updateQuantity,
    openCart,
    closeCart,
    isCartOpen,
  } = useCart();
  const params = useParams();
  const lang = (params.lang as "en" | "ja") || "en";
  const t = dict[lang].cart;

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={(open) => (open ? openCart() : closeCart())}
    >
      <SheetTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "icon",
          }),
          "relative"
        )}
      >
        <IconGardenCart size={20} />
        {itemCount > 0 && (
          <Badge className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
            {itemCount}
          </Badge>
        )}
        <span className="sr-only">Cart</span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t.yourCart}</SheetTitle>
          {itemCount > 0 && (
            <Link
              href={`/${lang}/cart`}
              onClick={closeCart}
              className={cn(
                buttonVariants({ variant: "link" }),
                "cursor-pointer text-xs inline-flex items-center gap-1 w-fit px-0"
              )}
            >
              {t.fullView} <IconArrowUpRight size={14} />
            </Link>
          )}
        </SheetHeader>
        <div className="flex flex-col gap-2 px-1 py-4 h-full overflow-y-auto max-h-[calc(100vh-200px)]">
          {items.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant={"icon"}>
                  <IconShoppingBag />
                </EmptyMedia>
                <EmptyTitle>{t.emptyCart}</EmptyTitle>
                <EmptyDescription>{t.emptyCartDesc}</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex items-center gap-2">
                  <Button onClick={closeCart}>{t.explore}</Button>
                </div>
              </EmptyContent>
            </Empty>
          ) : (
            items.map((item) => {
              const translated = getProductById(item.id!, lang) || item;
              return (
                <CartItemCard
                  key={`${item.id}-${item.selectedSize}`}
                  {...item}
                  image={item.images[0]}
                  name={translated.title}
                  size={item.selectedSize}
                  onUpdateQuantity={(q) =>
                    updateQuantity(item.id!, item.selectedSize, q)
                  }
                  onRemove={() => removeFromCart(item.id!, item.selectedSize)}
                />
              );
            })
          )}
        </div>
        {items.length > 0 && (
          <SheetFooter className="mt-auto pt-4 border-t">
            <div className="flex items-center justify-between w-full mb-4">
              <h2 className="text-sm font-semibold">{t.subtotal}</h2>
              <div className="flex items-center gap-1">
                <IconCurrencyYen stroke={1.5} size={18} />
                <span className="text-lg font-semibold">
                  {subtotal.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Button
                onClick={() => {
                  closeCart();
                  // navigate logic handled by Link if Button was Link or programmed nav
                }}
                asChild
              >
                <Link href={`/${lang}/cart`}>{t.checkout}</Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
