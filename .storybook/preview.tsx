import React from "react";
import type { Preview } from "@storybook/react";
import "@/styles/globals.css";
import { Barlow_Semi_Condensed, Inter } from "next/font/google";
import localFont from "next/font/local";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
// Sync this with supported locales
import "dayjs/locale/de";

const ikariusAdfNo2 = localFont({
  preload: false,
  display: "swap",
  src: [
    {
      path: "../fonts/IkariusADFNo2Std-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/IkariusADFNo2Std-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/IkariusADFNo2Std-Italic.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/IkariusADFNo2Std-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

const ikariusAdf = localFont({
  preload: false,
  display: "swap",
  src: [
    {
      path: "../fonts/IkariusADFStd-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/IkariusADFStd-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/IkariusADFStd-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/IkariusADFStd-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  preload: false,
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal"],
  preload: false,
  display: "swap",
});

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.tz.setDefault("America/New_York");

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <I18nextProvider i18n={i18n}>
          <style>{`
            :root {
              --font-inter: ${inter.style.fontFamily};
              --font-barlow-semi-condensed: ${barlowSemiCondensed.style.fontFamily};
              --font-ikarius-adf-no2: ${ikariusAdfNo2.style.fontFamily};
              --font-ikarius-adf: ${ikariusAdf.style.fontFamily};
            }
          `}</style>
          <Story />
        </I18nextProvider>
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
  },
};

export default preview;
