const { withContentlayer } = require("next-contentlayer");
const vaultConfig = require("./vault.config");

const withPlausibleProxy = require("next-plausible").withPlausibleProxy({
  subdirectory: "pa",
  scriptName: "pa",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  trailingSlash: true,
  serverRuntimeConfig: {
    vaultConfig,
  },
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
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = withPlausibleProxy(withContentlayer(nextConfig));
