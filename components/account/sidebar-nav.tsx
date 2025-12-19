"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  IconHistory,
  IconHeart,
  IconStar,
  IconBookmark,
  IconChevronRight,
  IconMapPin,
} from "@tabler/icons-react";
import { dict } from "@/lib/dict";

interface SidebarNavProps {
  lang: "en" | "ja";
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SidebarNav({
  lang,
  activeTab,
  onTabChange,
}: SidebarNavProps) {
  const t = dict[lang].account.tabs;

  const items = [
    { id: "orders", label: t.orders, icon: IconHistory },
    { id: "wishlist", label: t.wishlist, icon: IconHeart },
    { id: "reviews", label: t.reviews, icon: IconStar },
    { id: "saved", label: t.saved, icon: IconBookmark },
    { id: "address", label: t.address, icon: IconMapPin },
  ];

  return (
    <nav className="flex flex-col gap-1 sticky top-48">
      {items.map((item) => (
        <Button
          key={item.id}
          variant={activeTab === item.id ? "secondary" : "ghost"}
          className={cn(
            "justify-between h-12 px-4 rounded-xl font-medium transition-all group",
            activeTab === item.id
              ? "bg-secondary/80 hover:bg-secondary"
              : "hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
          )}
          onClick={() => onTabChange(item.id)}
        >
          <div className="flex items-center gap-3">
            <item.icon
              size={18}
              className={cn(
                "transition-colors",
                activeTab === item.id
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-foreground"
              )}
            />
            {item.label}
          </div>
          {activeTab === item.id && (
            <IconChevronRight
              size={16}
              className="text-muted-foreground animate-in fade-in slide-in-from-left-1"
            />
          )}
        </Button>
      ))}
    </nav>
  );
}
