import React from "react";
import type { Preview } from "@storybook/react";
import "@/styles/globals.css";
import FontStyles from "../components/font-styles";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

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
