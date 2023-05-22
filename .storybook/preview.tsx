import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";
import "@/styles/globals.css";
import FontStyles from "../components/font-styles";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
// Sync this with supported locales
import "dayjs/locale/de";
import { defaultLocale } from "../lib/locales";
import { LazyMotion } from "framer-motion";
import clsx from "clsx";

async function loadFeatures() {
  const result = await import("../lib/framer-motion-features");
  return result.default;
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.tz.setDefault("America/New_York");

const preview: Preview = {
  globals: {
    locale: defaultLocale,
    locales: {
      en: "English",
      de: "German",
    },
    darkMode: false,
  },
  decorators: [
    (Story, ctx) => {
      dayjs.locale(i18n.language);
      i18n.services.formatter?.addCached("lowerCase", (language, _options) => {
        return (value: string) => value.toLocaleLowerCase(language);
      });

      useEffect(() => {
        if (ctx.globals.darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }, [ctx]);

      return (
        <React.StrictMode>
          <LazyMotion features={loadFeatures} strict>
            <I18nextProvider i18n={i18n}>
              <FontStyles />
              <div className="text-stone-950 dark:text-stone-50">
                <Story />
              </div>
            </I18nextProvider>
          </LazyMotion>
        </React.StrictMode>
      );
    },
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        date: /Date$/,
      },
    },
    i18n,
  },
};

export default preview;
