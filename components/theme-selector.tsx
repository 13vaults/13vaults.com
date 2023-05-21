import { useCallback, useEffect, useMemo, useState } from "react";
import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { Theme, useThemeStore } from "@/lib/theme";
import { useTranslation } from "next-i18next";
import SunIcon from "@heroicons/react/20/solid/SunIcon";
import MoonIcon from "@heroicons/react/20/solid/MoonIcon";
import ComputerDesktopIcon from "@heroicons/react/20/solid/ComputerDesktopIcon";

export function ThemeSelector() {
  const { theme, systemTheme, setTheme } = useThemeStore();
  const [themeColor, setThemeColor] = useState<"dark" | "light" | null>(null);
  const { t } = useTranslation();
  const themes = useMemo(
    () => [
      {
        name: t("theme-switcher.theme.light"),
        value: "light",
        icon: SunIcon,
      },
      { name: t("theme-switcher.theme.dark"), value: "dark", icon: MoonIcon },
      {
        name: t("theme-switcher.theme.system"),
        value: "system",
        icon: ComputerDesktopIcon,
      },
    ],
    [t]
  );

  const ThemeIcon = useMemo(() => {
    return themeColor === "dark" ? MoonIcon : SunIcon;
  }, [themeColor]);

  useEffect(() => {
    if (theme === "system") {
      setThemeColor(systemTheme);
    } else {
      setThemeColor(theme);
    }
  }, [systemTheme, theme]);

  const setSelectedTheme = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme);
    },
    [setTheme]
  );

  return (
    <Listbox as="div" value={theme} onChange={setSelectedTheme}>
      <Listbox.Label className="sr-only">
        {t("theme-switcher.theme")}
      </Listbox.Label>
      {themeColor ? (
        <Listbox.Button
          className="flex p-2 items-center justify-center shadow-md shadow-black/5 ring-1 bg-stone-800 ring-inset ring-white/5"
          aria-label={t("theme-switcher")}
        >
          <ThemeIcon className="block h-5 w-5 fill-stone-400" />
        </Listbox.Button>
      ) : null}
      <Listbox.Options className="absolute top-full mt-3 w-36 right-0 text-sm font-medium shadow-md shadow-black/5 ring-1 bg-stone-900 ring-white/5">
        {themes.map((theme) => (
          <Listbox.Option
            key={theme.value}
            value={theme.value}
            className={({ active, selected }) =>
              clsx("flex cursor-pointer select-none items-center p-2", {
                "text-teal-500 bg-stone-950/50": selected,
                "text-stone-50": active && !selected,
                "text-stone-400": !active && !selected,
                "bg-stone-950/100": active,
              })
            }
          >
            {({ selected }) => (
              <>
                <div className="p-1 shadow ring-1 bg-stone-700 ring-inset ring-white/5">
                  <theme.icon
                    className={clsx(
                      "h-4 w-4",
                      selected ? "fill-teal-400" : "fill-stone-400"
                    )}
                  />
                </div>
                <div className="ml-3">{theme.name}</div>
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
