const withPlugins = require("next-compose-plugins");
const { withContentlayer } = require("next-contentlayer");
const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  trailingSlash: true,
  images: {
    loader: "custom",
    imageSizes: [1280],
    deviceSizes: [640, 1920, 2048],
    nextImageExportOptimizer: {
      imageFolderPath: "public/images",
      exportFolderPath: "out",
      quality: 75,
    },
  },
  transpilePackages: ["next-image-export-optimizer"],
  env: {
    storePicturesInWEBP: true,
    generateAndUseBlurImages: true,
  },
};

module.exports = withPlugins(
  [
    withContentlayer,
    withPlausibleProxy({ subdirectory: "pa", scriptName: "pa" }),
  ],
  nextConfig
);
