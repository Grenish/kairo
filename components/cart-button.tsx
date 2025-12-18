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
  SheetDescription,
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

const mockItems = [
  {
    id: 1,
    image: "/soon/gown.png",
    name: "Kuro Fantasy Wedding Gown",
    size: "S",
    price: 2000,
    quantity: 1,
    description: "Kuro Fantasy Wedding Gown",
  },
  {
    id: 2,
    image: "/soon/kimono.png",
    name: "Kairo Exclusive Kimino",
    size: "S",
    price: 2000,
    quantity: 1,
    description: "Kairo Exclusive Kimino threaded from the finest silk",
  },
];

export default function CartButton() {
  return (
    <Sheet>
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
        <Badge className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
          0
        </Badge>
        <span className="sr-only">Cart</span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>Quick look at your cart.</SheetDescription>
          <SheetDescription
            className={cn(
              buttonVariants({ variant: "link" }),
              "cursor-pointer",
              "text-xs inline-flex items-center gap-1 w-fit px-0"
            )}
          >
            Full view <IconArrowUpRight />
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 px-1">
          {/* <Empty>
            <EmptyHeader>
              <EmptyMedia variant={"icon"}>
                <IconShoppingBag />
              </EmptyMedia>
              <EmptyTitle>Cart is empty</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t added any items to your cart yet. Explore Kairo
                to find something you like.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex items-center gap-2">
                <Button>Collections</Button>
                <Button variant="outline">New Arrivals</Button>
              </div>
            </EmptyContent>
          </Empty> */}
          {mockItems.map((item) => (
            <CartItemCard key={item.id} {...item} />
          ))}
        </div>
        <SheetFooter>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Total</h2>
            <div className="flex items-center gap-1">
              <IconCurrencyYen stroke={1.5} />
              <span className="text-lg font-semibold">0</span>
            </div>
          </div>
          <Button disabled>Checkout</Button>
          <Button variant="outline">Save for later</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
