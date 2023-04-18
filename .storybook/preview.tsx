import React from "react";
import type { Preview } from "@storybook/react";
import "@/styles/globals.css";
import FontStyles from "../components/font-styles";

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <>
          <FontStyles />
          <Story />
        </>
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
