"use client";

import { useState } from "react";
import {
  IconCreditCard,
  IconTruck,
  IconCalendar,
  IconMapPin,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { dict } from "@/lib/dict";

export default function CheckoutForm({ lang }: { lang: string }) {
  const [deliveryDay, setDeliveryDay] = useState("workday");
  // Default to english if lang is not valid
  const currentLang = lang === "ja" || lang === "en" ? lang : "en";
  const t = dict[currentLang].checkout;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">{t.title}</h2>
        <p className="text-muted-foreground">{t.securePurchase}</p>
      </div>

      <div className="space-y-6">
        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <IconCreditCard className="w-5 h-5" />
            {t.paymentDetails}
          </h3>
          <div className="p-4 border rounded-lg bg-card space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">{t.cardNumber}</Label>
              <Input id="card-number" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">{t.expiryDate}</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">{t.cvc}</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-name">{t.cardholderName}</Label>
              <Input id="card-name" placeholder="John Doe" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Delivery Address */}
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <IconMapPin className="w-5 h-5" />
            {t.deliveryAddress}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="street">{t.streetAddress}</Label>
              <Input id="street" placeholder="1-2-3 Roppongi" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locality">{t.locality}</Label>
              <Input id="locality" placeholder="Minato-ku" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">{t.district}</Label>
              <Input id="district" placeholder="Tokyo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">{t.state}</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t.selectPrefecture} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tokyo">Tokyo</SelectItem>
                  <SelectItem value="osaka">Osaka</SelectItem>
                  <SelectItem value="kyoto">Kyoto</SelectItem>
                  <SelectItem value="hokkaido">Hokkaido</SelectItem>
                  {/* Add more as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">{t.postalCode}</Label>
              <Input id="pincode" placeholder="106-0032" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Delivery Options */}
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <IconTruck className="w-5 h-5" />
            {t.deliveryOptions}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border text-left transition-all hover:border-primary/50",
                deliveryDay === "workday"
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "bg-card"
              )}
              onClick={() => setDeliveryDay("workday")}
            >
              <IconCalendar className="w-5 h-5 mt-0.5 text-primary" />
              <div>
                <span className="font-medium block">{t.weekdays}</span>
                <span className="text-sm text-muted-foreground">
                  {t.weekdaysTime}
                </span>
              </div>
            </button>

            <button
              type="button"
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border text-left transition-all hover:border-primary/50",
                deliveryDay === "weekend"
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "bg-card"
              )}
              onClick={() => setDeliveryDay("weekend")}
            >
              <IconCalendar className="w-5 h-5 mt-0.5 text-primary" />
              <div>
                <span className="font-medium block">{t.weekends}</span>
                <span className="text-sm text-muted-foreground">
                  {t.weekendsTime}
                </span>
              </div>
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor="instructions">{t.deliveryInstructions}</Label>
            <Textarea
              id="instructions"
              placeholder={t.deliveryInstructionsPlaceholder}
              className="resize-none"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button size="lg" className="w-full text-lg h-12">
            {t.payNow}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            {t.terms}
          </p>
        </div>
      </div>
    </div>
  );
}
