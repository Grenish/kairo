"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconMoon, IconSun } from "@tabler/icons-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function readStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;

  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "dark" || v === "light" ? v : null;
  } catch {
    return null;
  }
}

function applyThemeToDocument(theme: Theme) {
  if (typeof window === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function persistTheme(theme: Theme) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore storage failures
  }
}

export function ModeToggle() {
  // Stable SSR/client first render; real theme applied after mount.
  const [theme, setTheme] = useState<Theme>("light");

  // Initialize from localStorage after mount.
  // Note: we intentionally avoid calling setState directly inside the effect body.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = readStoredTheme();
    const initial: Theme = stored ?? "light";

    applyThemeToDocument(initial);

    queueMicrotask(() => {
      setTheme(initial);
    });
  }, []);

  // Persist + apply on user toggle (no extra effects/state needed).
  const toggleTheme = () => {
    setTheme((t) => {
      const next: Theme = t === "dark" ? "light" : "dark";
      persistTheme(next);
      applyThemeToDocument(next);
      return next;
    });
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "dark" ? (
        <IconMoon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <IconSun className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
