import type { StorybookConfig } from "@storybook/nextjs";
import path from "node:path";
import pathBrowserify from "path-browserify";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-react-i18next",
    {
      name: "@storybook/addon-styling",
      options: {
        postCss: true,
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    if (config?.resolve?.alias) {
      config.resolve.alias["/texture.webp"] = path.resolve(
        __dirname,
        "../public/texture.webp"
      );
      config.resolve.alias["/texture-dark.webp"] = path.resolve(
        __dirname,
        "../public/texture-dark.webp"
      );
      config.resolve.alias["next-i18next"] = "react-i18next";
    }

    return config;
  },
};
export default config;
