/* eslint-disable unicorn/prefer-module */

const { withContentlayer } = require("next-contentlayer");
const { defaultLocale, supportedLocales } = require("./lib/locales");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: defaultLocale,
    locales: supportedLocales,
    localeDetection: true,
  },
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  images: {
    domains:
      process.env.NODE_ENV === "production"
        ? ["www.13vaults.com"]
        : ["localhost", "www.13vaults.com"],
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
    scrollRestoration: true,
    largePageDataBytes: 256 * 1024,
  },
};

module.exports = withContentlayer(nextConfig);
