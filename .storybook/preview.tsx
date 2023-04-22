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

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.tz.setDefault("America/New_York");

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <I18nextProvider i18n={i18n}>
          <FontStyles />
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
