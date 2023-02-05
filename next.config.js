const withPlugins = require("next-compose-plugins");
const withExportImages = require("next-export-optimize-images");
const { withContentlayer } = require("next-contentlayer");
const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  trailingSlash: true,
  imageDir: "_optimized",
};

module.exports = withPlugins(
  [
    withExportImages({
      images: {
        deviceSizes: [640, 960, 1280, 1600, 1920],
      },
    }),
    withContentlayer,
    withPlausibleProxy({ subdirectory: "pa", scriptName: "pa" }),
  ],
  nextConfig
);
