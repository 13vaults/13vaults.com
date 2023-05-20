import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Theme = "dark" | "light" | "system";
type SystemTheme = "dark" | "light";

interface ThemeState {
  theme: Theme;
  systemTheme: SystemTheme;
  setTheme: (_theme: Theme) => void;
  setSystemTheme: (_theme: SystemTheme) => void;
}

export const useThemeStore = create<ThemeState, [["zustand/immer", never]]>(
  immer((set) => {
    const initialTheme =
      typeof window === "object"
        ? (window?.localStorage?.getItem("theme") as Theme | null) ?? "system"
        : "system";

    const initialSystemTheme =
      typeof window === "object"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : "light";

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", initialTheme);
    }
    return {
      theme: initialTheme,
      systemTheme: initialSystemTheme,
      setTheme: (newTheme) => {
        set((state) => {
          state.theme = newTheme;
        });
        localStorage.setItem("theme", newTheme);
      },
      setSystemTheme: (newTheme) => {
        set((state) => {
          state.systemTheme = newTheme;
        });
      },
    };
  })
);
