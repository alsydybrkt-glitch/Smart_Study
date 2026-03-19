"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isHydrated = typeof window !== "undefined";
  if (!isHydrated) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="
      flex items-center gap-2 p-2 rounded-md
      hover:bg-[var(--sidebar-hover)]
      transition-colors
      "
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}

      <span className="text-sm">Theme</span>
    </button>
  );
}
