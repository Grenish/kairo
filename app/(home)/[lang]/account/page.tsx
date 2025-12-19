"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import ProfileHeader from "@/components/account/profile-header";
import SidebarNav from "@/components/account/sidebar-nav";
import { dict } from "@/lib/dict";
import {
  IconShoppingBag,
  IconHeart,
  IconStar,
  IconBookmark,
  IconPlus,
  IconMapPin,
  IconPhone,
  IconBuilding,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function AccountPage() {
  const params = useParams();
  const lang = (params.lang as "en" | "ja") || "en";
  const [activeTab, setActiveTab] = useState("orders");
  const t = dict[lang].account;

  const renderContent = () => {
    if (activeTab === "address") {
      return (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mock Address 1 */}
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm relative group hover:border-primary/50 transition-colors">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" className="h-8">
                Edit
              </Button>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <IconMapPin size={20} />
              </div>
              <div className="space-y-1">
                <div className="font-semibold flex items-center gap-2">
                  Default Address
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                    Default
                  </span>
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  <p>〒160-0023</p>
                  <p>Tokyo, Shinjuku-ku</p>
                  <p>1-13-2, Nishishinjuku</p>
                  <p className="flex items-center gap-1.5 mt-1 text-foreground/80">
                    <IconBuilding size={14} className="text-muted-foreground" />
                    Shinjuku Building 3F
                  </p>
                  <p className="flex items-center gap-1.5 mt-2 text-foreground/80">
                    <IconPhone size={14} className="text-muted-foreground" />
                    03-1234-5678
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mock Address 2 */}
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm relative group hover:border-primary/50 transition-colors">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" className="h-8">
                Edit
              </Button>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-secondary text-muted-foreground shrink-0 group-hover:text-primary transition-colors">
                <IconMapPin size={20} />
              </div>
              <div className="space-y-1">
                <div className="font-semibold">Office</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  <p>〒530-0001</p>
                  <p>Osaka, Kita-ku</p>
                  <p>2-5-1, Umeda</p>
                  <p className="flex items-center gap-1.5 mt-1 text-foreground/80">
                    <IconBuilding size={14} className="text-muted-foreground" />
                    Osaka Tower 1205
                  </p>
                  <p className="flex items-center gap-1.5 mt-2 text-foreground/80">
                    <IconPhone size={14} className="text-muted-foreground" />
                    06-8765-4321
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const emptyState = t.empty;

    let icon, title, desc;

    switch (activeTab) {
      case "orders":
        icon = IconShoppingBag;
        title = emptyState.orders;
        desc = emptyState.ordersDesc;
        break;
      case "wishlist":
        icon = IconHeart;
        title = emptyState.wishlist;
        desc = emptyState.wishlistDesc;
        break;
      case "reviews":
        icon = IconStar;
        title = emptyState.reviews;
        desc = emptyState.reviewsDesc;
        break;
      case "saved":
        icon = IconBookmark;
        title = emptyState.saved;
        desc = emptyState.savedDesc;
        break;
      default:
        return null;
    }

    const Icon = icon!;

    return (
      <div className="min-h-[400px] flex items-center justify-center rounded-2xl border border-dashed bg-secondary/5">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-background shadow-sm">
              <Icon size={24} stroke={1.5} />
            </EmptyMedia>
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyDescription>{desc}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href={`/${lang}/shop`}>{emptyState.action}</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      <ProfileHeader lang={lang} />

      <main className="mx-auto w-full max-w-5xl px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SidebarNav
              lang={lang}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6 min-h-[500px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {t.tabs[activeTab as keyof typeof t.tabs]}
                </h2>
                {activeTab === "address" && (
                  <Button size="sm" className="gap-2">
                    <IconPlus size={16} />
                    Add New
                  </Button>
                )}
              </div>
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
