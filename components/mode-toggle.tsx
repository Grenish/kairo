"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { IconMoon, IconSun } from "@tabler/icons-react";

const subscribe = () => () => {};

/** True only after hydration, without a setState-in-effect round trip. */
function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export function ModeToggle() {
  // next-themes is the single source of truth: it persists to localStorage
  // ("theme"), toggles the `dark` class, and suppresses CSS transitions
  // during the switch (disableTransitionOnChange).
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="outline-none"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <IconMoon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <IconSun className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
