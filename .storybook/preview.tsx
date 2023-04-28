import React from "react";
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
  },
  decorators: [
    (Story) => {
      dayjs.locale(i18n.language);

      return (
        <React.StrictMode>
          <LazyMotion features={loadFeatures} strict>
            <I18nextProvider i18n={i18n}>
              <FontStyles />
              <div className="dark:text-white">
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
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    i18n,
  },
};

export default preview;
