"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { dict } from "@/lib/dict";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  IconSun,
  IconMoon,
  IconArrowLeft,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const THEME_KEY = "theme";
type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export default function SettingsPage() {
  const params = useParams();
  const lang = (params?.lang as "en" | "ja") || "en";
  const t = dict[lang].settings;

  // Account state
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");

  // Security state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Theme state
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Notification state
  const [notifications, setNotifications] = useState({
    marketing: true,
    orders: true,
    promos: false,
    password: true,
  });
  const [deliveryMethod, setDeliveryMethod] = useState<
    "email" | "phone" | "both"
  >("email");

  // Initialize theme from localStorage
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(THEME_KEY) as Theme | null;
      if (stored && (stored === "light" || stored === "dark")) {
        setTheme(stored);
        applyTheme(stored);
      }
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <Link
              href={`/${lang}`}
              className="group inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <IconArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {lang === "en" ? "Go Back" : "戻る"}
            </Link>
            <h1 className="text-3xl font-medium tracking-tight text-foreground">
              {t.title}
            </h1>
            <p className="text-muted-foreground max-w-md">{t.subtitle}</p>
          </div>
        </div>

        {/* Main Content Split Layout */}
        <Tabs defaultValue="account" className="w-full" orientation="vertical">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3">
              <TabsList
                variant="line"
                className="flex flex-col w-full h-auto bg-transparent border-none items-start gap-px p-0"
              >
                <TabsTrigger
                  value="account"
                  className="w-full justify-start py-3 pl-4 text-sm font-medium border-none text-muted-foreground transition-colors rounded-none border-r-2 border-transparent hover:text-foreground/80 data-[state=active]:border-primary data-[state=active]:text-foreground"
                >
                  {t.tabs.account}
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="w-full justify-start py-3 pl-4 text-sm font-medium border-none text-muted-foreground transition-colors rounded-none border-r-2 border-transparent hover:text-foreground/80 data-[state=active]:border-primary data-[state=active]:text-foreground"
                >
                  {t.tabs.security}
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="w-full justify-start py-3 pl-4 text-sm font-medium border-none text-muted-foreground transition-colors rounded-none border-r-2 border-transparent hover:text-foreground/80 data-[state=active]:border-primary data-[state=active]:text-foreground"
                >
                  {t.tabs.appearance}
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="w-full justify-start py-3 pl-4 text-sm font-medium border-none text-muted-foreground transition-colors rounded-none border-r-2 border-transparent hover:text-foreground/80 data-[state=active]:border-primary data-[state=active]:text-foreground"
                >
                  {t.tabs.notifications}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8 lg:col-start-5">
              <div className="min-h-[60vh] w-full max-w-2xl">
                {/* Account Section */}
                <TabsContent value="account" className="mt-0 space-y-10">
                  <div className="space-y-1 border-b border-border pb-6">
                    <h2 className="text-xl font-medium text-foreground">
                      {t.account.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {t.account.description}
                    </p>
                  </div>

                  <div className="space-y-8 w-full">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t.account.name.label}</Label>
                        <Input
                          id="name"
                          placeholder={t.account.name.placeholder}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">
                          {t.account.username.label}
                        </Label>
                        <Input
                          id="username"
                          placeholder={t.account.username.placeholder}
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t.account.email.label}</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t.account.email.placeholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t.account.phone.label}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t.account.phone.placeholder}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">
                        {t.account.visibility.label}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(["public", "private"] as const).map((mode) => {
                          const Icon = mode === "public" ? IconEye : IconEyeOff;
                          return (
                            <button
                              key={mode}
                              onClick={() => setVisibility(mode)}
                              className={cn(
                                "flex flex-col items-center justify-center gap-3 p-6 border rounded-lg transition-all",
                                visibility === mode
                                  ? "border-primary bg-primary/5 text-primary"
                                  : "border-border hover:border-border/80 hover:bg-muted/50 text-muted-foreground"
                              )}
                            >
                              <Icon className="size-6" />
                              <span className="text-sm font-medium capitalize">
                                {t.account.visibility[mode]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t.account.visibility.description}
                      </p>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full sm:w-auto">
                        {t.account.save}
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Danger Zone */}
                  <div className="space-y-6 pt-2">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-destructive">
                        {t.account.dangerZone.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t.account.dangerZone.description}
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="p-4 border border-border rounded-lg bg-muted/20">
                        <div className="flex flex-col gap-3">
                          <h4 className="text-sm font-medium">
                            {t.account.dangerZone.disable.label}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {t.account.dangerZone.disable.description}
                          </p>
                          <Button variant="outline" size="sm" className="w-fit">
                            Disable Account
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                        <div className="flex flex-col gap-3">
                          <h4 className="text-sm font-medium text-destructive">
                            {t.account.dangerZone.delete.label}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {t.account.dangerZone.delete.description}
                          </p>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-fit"
                          >
                            {t.account.dangerZone.delete.button}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Security Section */}
                <TabsContent value="security" className="mt-0 space-y-10">
                  <div className="space-y-1 border-b border-border pb-6">
                    <h2 className="text-xl font-medium text-foreground">
                      {t.security.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {t.security.description}
                    </p>
                  </div>

                  <div className="space-y-6 w-full">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          {t.security.currentPassword.label}
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          placeholder={t.security.currentPassword.placeholder}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">
                          {t.security.newPassword.label}
                        </Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder={t.security.newPassword.placeholder}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          {t.security.confirmPassword.label}
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder={t.security.confirmPassword.placeholder}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button>{t.security.update}</Button>
                  </div>
                </TabsContent>

                {/* Appearance Section */}
                <TabsContent value="appearance" className="mt-0 space-y-10">
                  <div className="space-y-1 border-b border-border pb-6">
                    <h2 className="text-xl font-medium text-foreground">
                      {t.appearance.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {t.appearance.description}
                    </p>
                  </div>

                  <div className="space-y-6 w-full">
                    <div className="space-y-4">
                      <Label>{t.appearance.theme.label}</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(["light", "dark"] as const).map((mode) => {
                          const Icon = mode === "light" ? IconSun : IconMoon;
                          return (
                            <button
                              key={mode}
                              onClick={() => handleThemeChange(mode)}
                              className={cn(
                                "flex flex-col items-center justify-center gap-3 p-6 border rounded-lg transition-all",
                                theme === mode
                                  ? "border-primary bg-primary/5 text-primary"
                                  : "border-border hover:border-border/80 hover:bg-muted/50 text-muted-foreground"
                              )}
                            >
                              <Icon className="size-6" />
                              <span className="text-sm font-medium capitalize">
                                {t.appearance.theme[mode]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Notifications Section */}
                <TabsContent value="notifications" className="mt-0 space-y-10">
                  <div className="space-y-1 border-b border-border pb-6">
                    <h2 className="text-xl font-medium text-foreground">
                      {t.notifications.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {t.notifications.description}
                    </p>
                  </div>

                  <div className="space-y-6 w-full">
                    <div className="space-y-4">
                      {(
                        ["marketing", "orders", "promos", "password"] as const
                      ).map((key) => (
                        <div
                          key={key}
                          className="flex items-start space-x-4 p-4 rounded-lg border border-border bg-card"
                        >
                          <Checkbox
                            id={key}
                            checked={notifications[key]}
                            onCheckedChange={() => toggleNotification(key)}
                            className="mt-1"
                          />
                          <div className="space-y-1 leading-none">
                            <Label
                              htmlFor={key}
                              className="font-medium cursor-pointer"
                            >
                              {t.notifications.types[key].label}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {t.notifications.types[key].description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">
                        {t.notifications.delivery.label}
                      </h3>
                      <RadioGroup
                        value={deliveryMethod}
                        onValueChange={(val) =>
                          setDeliveryMethod(val as "email" | "phone" | "both")
                        }
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                      >
                        {[
                          {
                            id: "delivery-email",
                            val: "email",
                            label: t.notifications.delivery.email,
                          },
                          {
                            id: "delivery-phone",
                            val: "phone",
                            label: t.notifications.delivery.phone,
                          },
                          {
                            id: "delivery-both",
                            val: "both",
                            label: t.notifications.delivery.both,
                          },
                        ].map((opt) => (
                          <div key={opt.val}>
                            <RadioGroupItem
                              value={opt.val}
                              id={opt.id}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={opt.id}
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-center h-full sm:h-auto"
                            >
                              {opt.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      <p className="text-xs text-muted-foreground">
                        {t.notifications.delivery.description}
                      </p>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full sm:w-auto">
                        {t.notifications.save}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
