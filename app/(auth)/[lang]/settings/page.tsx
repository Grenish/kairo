"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { dict } from "@/lib/dict";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { HtmlLang } from "@/components/site/html-lang";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

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
  const { resolvedTheme, setTheme } = useTheme();
  const theme: Theme = resolvedTheme === "light" ? "light" : "dark";
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: Theme) => setTheme(newTheme);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!mounted) return null;

  return (
    <div className="min-h-svh bg-background">
      <HtmlLang lang={lang} />
      <div className="wrap py-6">
        <Link href={`/${lang}`} className="text-[1.375rem] font-medium tracking-[-0.04em]">
          Kairo
        </Link>
      </div>
      <main id="main" className="wrap pt-8 pb-24 md:pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <Link
              href={`/${lang}`}
              className="group inline-flex items-center text-ink-soft hover:text-foreground transition-colors"
            >
              <IconArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {lang === "en" ? "Go Back" : "戻る"}
            </Link>
            <h1 className="type-display text-display -ml-[0.04em]">
              {t.title}
            </h1>
            <p className="type-lead text-lead max-w-[32ch]">{t.subtitle}</p>
          </div>
        </div>

        {/* Main Content Split Layout */}
        <Tabs defaultValue="account" className="w-full" orientation="vertical">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3">
              <TabsList
                variant="line"
                className="flex flex-col w-full h-auto bg-transparent items-start gap-1 p-0"
              >
                <TabsTrigger
                  value="account"
                  className="w-full justify-start py-3 pl-4 text-[1.0625rem] text-ink-soft transition-colors rounded-none hover:text-foreground data-[state=active]:bg-surface data-[state=active]:text-foreground"
                >
                  {t.tabs.account}
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="w-full justify-start py-3 pl-4 text-[1.0625rem] text-ink-soft transition-colors rounded-none hover:text-foreground data-[state=active]:bg-surface data-[state=active]:text-foreground"
                >
                  {t.tabs.security}
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="w-full justify-start py-3 pl-4 text-[1.0625rem] text-ink-soft transition-colors rounded-none hover:text-foreground data-[state=active]:bg-surface data-[state=active]:text-foreground"
                >
                  {t.tabs.appearance}
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="w-full justify-start py-3 pl-4 text-[1.0625rem] text-ink-soft transition-colors rounded-none hover:text-foreground data-[state=active]:bg-surface data-[state=active]:text-foreground"
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
                  <div className="space-y-2 pb-2">
                    <h2 className="type-lead text-lead font-medium">
                      {t.account.title}
                    </h2>
                    <p className="text-ink-soft">
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
                      <h3 className="font-medium">
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
                                "press flex flex-col items-center justify-center gap-3 p-6 transition-colors",
                                visibility === mode
                                  ? "bg-foreground text-background"
                                  : "bg-surface hover:bg-surface-2 text-foreground"
                              )}
                            >
                              <Icon className="size-6" />
                              <span className="font-medium capitalize">
                                {t.account.visibility[mode]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-ink-soft">
                        {t.account.visibility.description}
                      </p>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full sm:w-auto">
                        {t.account.save}
                      </Button>
                    </div>
                  </div>

                  

                  {/* Danger Zone */}
                  <div className="space-y-6 pt-2">
                    <div className="space-y-1">
                      <h3 className="font-medium text-destructive">
                        {t.account.dangerZone.title}
                      </h3>
                      <p className="text-ink-soft">
                        {t.account.dangerZone.description}
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="p-6 bg-surface">
                        <div className="flex flex-col gap-3">
                          <h4 className="font-medium">
                            {t.account.dangerZone.disable.label}
                          </h4>
                          <p className="text-ink-soft">
                            {t.account.dangerZone.disable.description}
                          </p>
                          <Button variant="outline" size="sm" className="w-fit">
                            Disable Account
                          </Button>
                        </div>
                      </div>

                      <div className="p-6 bg-surface">
                        <div className="flex flex-col gap-3">
                          <h4 className="font-medium text-destructive">
                            {t.account.dangerZone.delete.label}
                          </h4>
                          <p className="text-ink-soft">
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
                  <div className="space-y-2 pb-2">
                    <h2 className="type-lead text-lead font-medium">
                      {t.security.title}
                    </h2>
                    <p className="text-ink-soft">
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
                  <div className="space-y-2 pb-2">
                    <h2 className="type-lead text-lead font-medium">
                      {t.appearance.title}
                    </h2>
                    <p className="text-ink-soft">
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
                                "press flex flex-col items-center justify-center gap-3 p-6 transition-colors",
                                theme === mode
                                  ? "bg-foreground text-background"
                                  : "bg-surface hover:bg-surface-2 text-foreground"
                              )}
                            >
                              <Icon className="size-6" />
                              <span className="font-medium capitalize">
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
                  <div className="space-y-2 pb-2">
                    <h2 className="type-lead text-lead font-medium">
                      {t.notifications.title}
                    </h2>
                    <p className="text-ink-soft">
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
                          className="flex items-start space-x-4 p-5 bg-surface"
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
                            <p className="text-ink-soft">
                              {t.notifications.types[key].description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    

                    <div className="space-y-4">
                      <h3 className="font-medium">
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
                              className="flex flex-col items-center justify-between bg-surface p-4 hover:bg-surface-2 peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background cursor-pointer text-center h-full sm:h-auto"
                            >
                              {opt.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      <p className="text-ink-soft">
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
      </main>
    </div>
  );
}
