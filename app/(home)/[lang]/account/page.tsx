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
              <h2 className="text-xl font-semibold mb-6">
                {t.tabs[activeTab as keyof typeof t.tabs]}
              </h2>
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
