"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconEdit,
  IconMail,
  IconPhone,
  IconWorld,
  IconLock,
} from "@tabler/icons-react";
import { dict } from "@/lib/dict";
import gsap from "gsap";

interface ProfileHeaderProps {
  lang: "en" | "ja";
}

export default function ProfileHeader({ lang }: ProfileHeaderProps) {
  const t = dict[lang].account;
  const bannerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const editBtnRef = useRef<HTMLAnchorElement>(null); // Use existing link/button
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Basic "scrubber" without ScrollTrigger plugin to minimize deps
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 150, 1); // 0 to 1 over 150px

      // Interpolate values
      // Banner: height 256px -> 0px
      // But we just want it to scroll away naturally, so we might not need to animate height.
      // However, user liked the "transforming" effect.
      // Let's fade it out.
      gsap.set(bannerRef.current, {
        height: gsap.utils.interpolate(256, 0, progress),
        opacity: gsap.utils.interpolate(1, 0, progress),
      });

      // Card Container
      // Width: max-w-5xl -> max-w-7xl
      // Margin Top: -mt-20 -> -mt-4
      // sticky top-20 is handled by CSS

      // We can't really interpolate Classes. We set widths/styles directly.
      // Or we can rely on `progress` to set CSS variables if we wanted, but GSAP `set` is fine.

      // Interpolate dimensions directly
      // 5xl is 1024px, 7xl is 1280px (approx, using tailwind values)
      // Actually simpler to just keep it max-w-5xl -> max-w-7xl logic but mapped.

      // Let's animate properties that visually matter most.

      // Avatar
      // Size: 128 (w-32) -> 48 (w-12)
      const avatarSize = gsap.utils.interpolate(128, 48, progress);
      gsap.set(avatarRef.current, {
        width: avatarSize,
        height: avatarSize,
        borderWidth: gsap.utils.interpolate(4, 2, progress),
      });

      // Name Text
      // Size: 30px (text-3xl) -> 18px (text-lg)
      gsap.set(nameRef.current, {
        fontSize: gsap.utils.interpolate(30, 18, progress),
      });

      // Padding
      // p-8 (32px) -> py-3 px-4 (12px 16px)
      gsap.set(cardRef.current, {
        paddingTop: gsap.utils.interpolate(32, 12, progress),
        paddingBottom: gsap.utils.interpolate(32, 12, progress),
        paddingLeft: gsap.utils.interpolate(32, 16, progress),
        paddingRight: gsap.utils.interpolate(32, 16, progress),
      });

      // Hide elements by opacity
      // Status & Phone -> fade out quickly
      // Let's fade them out in first 50% of scroll
      const fadeProgress = Math.min(scrollY / 75, 1);

      gsap.set([statusRef.current, phoneRef.current], {
        width: fadeProgress > 0.5 ? 0 : "auto",
        opacity: 1 - fadeProgress,
        margin: fadeProgress > 0.5 ? 0 : undefined,
        overflow: "hidden",
      });

      // Edit Button Text size/visiblity if needed, but let's keep it simple
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock User Data
  const user = {
    name: "Alex Doe",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    image: "/users/aoi.png",
    banner: "/interior.png",
    status: "public",
  };

  return (
    <>
      <div ref={bannerRef} className="relative w-full overflow-hidden h-64">
        <Image
          src={user.banner}
          alt="Profile Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div
        ref={wrapperRef}
        className="sticky top-20 z-40 mx-auto w-full px-4 max-w-5xl -mt-20"
      >
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm p-8"
        >
          <div className="flex flex-row items-center gap-4 md:gap-6">
            {/* Avatar */}
            <div
              ref={avatarRef}
              className="relative shrink-0 overflow-hidden rounded-full border-background shadow-md w-32 h-32 border-4"
            >
              <Image
                src={user.image}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info Section */}
            <div className="flex flex-1 items-center justify-between min-w-0">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h1
                    ref={nameRef}
                    className="font-bold leading-none tracking-tight truncate text-3xl"
                  >
                    {user.name}
                  </h1>

                  <div ref={statusRef} className="origin-left">
                    <Badge
                      variant="secondary"
                      className="gap-1 rounded-full px-2 py-0.5 font-normal whitespace-nowrap"
                    >
                      {user.status === "public" ? (
                        <IconWorld size={12} />
                      ) : (
                        <IconLock size={12} />
                      )}
                      {user.status === "public"
                        ? t.profile.status.public
                        : t.profile.status.private}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1 truncate">
                    <IconMail size={14} className="shrink-0" />
                    {user.email}
                  </div>
                  <div
                    ref={phoneRef}
                    className="flex items-center gap-1 truncate origin-left"
                  >
                    <IconPhone size={14} className="shrink-0" />
                    {user.phone}
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <Button
                asChild
                variant="outline"
                className="gap-2 rounded-full shrink-0 ml-2"
              >
                <Link href={`/${lang}/settings`}>
                  <IconEdit size={16} />
                  <span className="hidden md:inline">{t.profile.edit}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
