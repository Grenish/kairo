"use client";

import { useState, useEffect } from "react";
import {
  IconBook,
  IconDoorExit,
  IconGardenCart,
  IconGlobe,
  IconHome,
  IconMenu2,
  IconPackageImport,
  IconSearch,
  IconSettings,
  IconUser,
  IconX,
  IconChevronRight,
  IconHistory,
  IconRss,
} from "@tabler/icons-react";
import { ModeToggle } from "./mode-toggle";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button, buttonVariants } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "./ui/dialog";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { dict } from "@/lib/dict";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import CartButton from "./cart-button";

const LOCALE_TO_SELECT_VALUE = {
  en: "EN",
  ja: "JA",
} as const;

const SELECT_VALUE_TO_LOCALE = {
  EN: "en",
  JA: "ja",
} as const;

function getLocaleFromPathname(pathname: string) {
  const seg = pathname.split("/")[1];
  return seg === "en" || seg === "ja" ? seg : null;
}

function replaceLocaleInPathname(pathname: string, nextLocale: "en" | "ja") {
  const parts = pathname.split("/");
  const current = parts[1];

  if (current === "en" || current === "ja") {
    parts[1] = nextLocale;
    return parts.join("/") || "/";
  }

  return `/${nextLocale}`;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const currentLocale = pathname ? getLocaleFromPathname(pathname) : null;
  const lang = currentLocale ?? "en";
  const t = dict[lang].navbar;

  const selectValue =
    (currentLocale && LOCALE_TO_SELECT_VALUE[currentLocale]) ?? "EN";

  type LangSelectValue = keyof typeof SELECT_VALUE_TO_LOCALE;

  const isValidLangSelectValue = (value: string): value is LangSelectValue => {
    return value in SELECT_VALUE_TO_LOCALE;
  };

  const handleLangChange = (value: string) => {
    if (!value || !isValidLangSelectValue(value)) return;

    const nextLocale = SELECT_VALUE_TO_LOCALE[value];
    const nextPath = replaceLocaleInPathname(pathname ?? "/", nextLocale);
    router.push(nextPath);
  };

  const navLinks = [
    { href: `/${lang}`, label: t.links.home, icon: IconHome },
    { href: `/${lang}/shop`, label: t.links.browse, icon: IconGlobe },
    {
      href: `/${lang}/blogs`,
      label: t.links.newArrivals,
      icon: IconRss,
    },
    {
      href: `/${lang}/about`,
      label: t.links.philosophy,
      icon: IconBook,
    },
  ];

  const isActiveLink = (href: string) => {
    if (href === `/${lang}`) {
      return pathname === `/${lang}` || pathname === `/${lang}/`;
    }
    return pathname?.startsWith(href);
  };

  const handleNavClick = (href: string) => {
    setIsSheetOpen(false);
    router.push(href);
  };

  return (
    <header
      className={cn(
        "w-full fixed top-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "backdrop-blur-xl bg-background/40 border-b border-border/50"
          : "bg-linear-to-b from-background/50 to-background-5 border-transparent"
      )}
    >
      <nav className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-4 lg:gap-6">
            <Link
              href={`/${lang}`}
              className="font-semibold text-base sm:text-lg tracking-tight shrink-0"
            >
              {t.brand}
            </Link>

            <Separator orientation="vertical" />

            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = isActiveLink(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium",
                        isActive ? "bg-primary/10 text-primary" : "font-thin"
                      )}
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <InputGroup className="hidden md:flex bg-background">
              <InputGroupAddon>
                <IconSearch size={16} className="text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder={t.searchPlaceholder}
                className="outline-none text-sm w-40 lg:w-56"
              />
            </InputGroup>

            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9 md:hidden"
                )}
              >
                <IconSearch size={20} />
                <span className="sr-only">Search</span>
              </DialogTrigger>
              <DialogContent className="top-4 translate-y-0 sm:top-[50%] sm:translate-y-[-50%]">
                <DialogHeader>
                  <DialogTitle className="">Search</DialogTitle>
                </DialogHeader>
                <InputGroup>
                  <InputGroupAddon>
                    <IconSearch
                      size={20}
                      className="text-muted-foreground shrink-0"
                    />
                    <InputGroupInput
                      placeholder={t.searchPlaceholder}
                      className="border-0 focus-visible:ring-0 text-base"
                      autoFocus
                    />
                  </InputGroupAddon>
                </InputGroup>
              </DialogContent>
            </Dialog>

            <div className="hidden sm:block">
              <Select value={selectValue} onValueChange={handleLangChange}>
                <SelectTrigger className="bg-background h-9 w-17.5 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EN">{t.language.en}</SelectItem>
                  <SelectItem value="JA">{t.language.ja}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ModeToggle />

            <CartButton />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size={"icon"}
                  className="sm:flex hidden"
                >
                  <IconUser />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
                <div className="px-1.5 py-1">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">shadcn</p>
                    <p className="text-xs text-muted-foreground">
                      m@example.com
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <Link href={`/${lang}/account`}>
                  <DropdownMenuItem className="cursor-pointer">
                    <IconUser className="mr-2 h-4 w-4" />
                    {t.userMenu.account}
                  </DropdownMenuItem>
                </Link>
                <Link href={`/${lang}/settings`}>
                  <DropdownMenuItem className="cursor-pointer">
                    <IconSettings className="mr-2 h-4 w-4" />
                    {t.userMenu.settings}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer"
                >
                  <IconDoorExit className="mr-2 h-4 w-4" />
                  {t.userMenu.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9 lg:hidden"
                )}
              >
                <IconMenu2 size={20} />
                <span className="sr-only">Open menu</span>
              </SheetTrigger>

              <SheetContent side="right" className="w-full sm:w-80 p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="text-left">{t.brand}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-[calc(100vh-65px)]">
                  <button
                    type="button"
                    className="p-4 border-b sm:hidden text-left"
                    onClick={() => handleNavClick(`/${lang}/account`)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                          className="rounded-none"
                        />
                        <AvatarFallback className="rounded-none">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">shadcn</p>
                        <p className="text-xs text-muted-foreground truncate">
                          m@example.com
                        </p>
                      </div>
                      <IconChevronRight
                        size={16}
                        className="text-muted-foreground"
                      />
                    </div>
                  </button>

                  <div className="flex-1 overflow-y-auto">
                    <nav className="p-2">
                      <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Navigation
                      </p>
                      {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = isActiveLink(link.href);
                        return (
                          <button
                            key={link.href}
                            type="button"
                            onClick={() => handleNavClick(link.href)}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-left",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-foreground"
                            )}
                          >
                            <Icon size={20} />
                            {link.label}
                            {isActive && (
                              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                            )}
                          </button>
                        );
                      })}
                    </nav>

                    <Separator className="my-2" />

                    <div className="p-2">
                      <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Settings
                      </p>

                      <div className="px-3 py-3 sm:hidden">
                        <p className="text-sm font-medium mb-2">Language</p>
                        <div className="flex gap-2">
                          <Button
                            variant={
                              selectValue === "EN" ? "default" : "outline"
                            }
                            size="sm"
                            className="flex-1"
                            onClick={() => handleLangChange("EN")}
                          >
                            English
                          </Button>
                          <Button
                            variant={
                              selectValue === "JA" ? "default" : "outline"
                            }
                            size="sm"
                            className="flex-1"
                            onClick={() => handleLangChange("JA")}
                          >
                            日本語
                          </Button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleNavClick(`/${lang}/account`)}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-left"
                      >
                        <IconUser size={20} />
                        {t.userMenu.account}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleNavClick(`/${lang}/settings`)}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-left"
                      >
                        <IconSettings size={20} />
                        {t.userMenu.settings}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 border-t mt-auto">
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                      onClick={() => {
                        setIsSheetOpen(false);
                      }}
                    >
                      <IconDoorExit className="mr-2 h-4 w-4" />
                      {t.userMenu.logout}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
