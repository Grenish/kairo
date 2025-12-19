"use client";

import { Separator } from "@/components/ui/separator";
import CartItemCard from "@/components/cart-item-card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
import { dict } from "@/lib/dict";
import { useParams } from "next/navigation";
import { IconShoppingBag } from "@tabler/icons-react";
import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getProductById } from "@/lib/products";

export default function CartPage() {
  const { items, subtotal, removeFromCart, updateQuantity } = useCart();
  const params = useParams();
  const lang = (params.lang as "en" | "ja") || "en";
  const t = dict[lang].cart;

  const shipping = 500;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="w-full min-h-svh h-full py-20 px-4 flex items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <IconShoppingBag />
            </EmptyMedia>
            <EmptyTitle>{t.emptyCart}</EmptyTitle>
            <EmptyDescription>{t.emptyCartDesc}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex items-center gap-2 justify-center">
              <Button asChild>
                <Link href={`/${lang}/shop`}>{t.continueShopping}</Link>
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="w-full min-h-svh h-full py-10 px-4">
      <div className="max-w-7xl w-full mx-auto my-10">
        <h1 className="text-3xl font-bold mb-8">{t.yourCart}</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items List */}
          <div className="flex-1 space-y-6">
            {items.map((item) => {
              const translated = getProductById(item.id!, lang) || item;
              return (
                <CartItemCard
                  key={`${item.id}-${item.selectedSize}`}
                  image={item.images[0]}
                  description={translated.description}
                  name={translated.title}
                  size={item.selectedSize}
                  price={item.price}
                  quantity={item.quantity}
                  onUpdateQuantity={(q) =>
                    updateQuantity(item.id!, item.selectedSize, q)
                  }
                  onRemove={() => removeFromCart(item.id!, item.selectedSize)}
                />
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:w-96 shrink-0">
            <div className="sticky top-20 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">{t.orderSummary}</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.subtotal}</span>
                  <span>¥{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.shipping}</span>
                  <span>¥{shipping.toLocaleString()}</span>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-medium text-lg">
                  <span>{t.total}</span>
                  <span>¥{total.toLocaleString()}</span>
                </div>

                <Button className="w-full mt-6" size="lg">
                  {t.checkout}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
