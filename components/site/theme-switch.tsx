"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { dict } from "@/lib/dict";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Day is the kinari ground with indigo ink; night is the indigo ground. */
export function ThemeSwitch({ lang }: { lang: Locale }) {
  const t = dict[lang].footer;
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = mounted ? resolvedTheme : "dark";

  const options = [
    { value: "light", label: t.day },
    { value: "dark", label: t.night },
  ];

  return (
    <div role="group" aria-label={t.theme} className="flex items-center gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={current === option.value}
          onClick={() => setTheme(option.value)}
          className={cn(
            "press px-3 py-2",
            current === option.value
              ? "bg-foreground text-background"
              : "hover:bg-surface"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
