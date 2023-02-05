const withPlugins = require("next-compose-plugins");
const withExportImages = require("next-export-optimize-images");
const { withContentlayer } = require("next-contentlayer");
const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  trailingSlash: true,
};

module.exports = withPlugins(
  [
    withExportImages,
    withContentlayer,
    withPlausibleProxy({ subdirectory: "pa", scriptName: "pa" }),
  ],
  nextConfig
);
