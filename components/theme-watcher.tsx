import { useThemeStore } from "@/lib/theme";
import { useEffect } from "react";

export default function ThemeWatcher() {
  const { theme, systemTheme, setSystemTheme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light");
    root.classList.remove("dark");
    if (theme === "system") {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", function (event) {
          const prefersDark = event.matches;
          setSystemTheme(prefersDark ? "dark" : "light");
        });
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme, systemTheme, setSystemTheme]);

  return null;
}
