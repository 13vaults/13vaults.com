/* eslint-disable unicorn/prefer-module */

const withPlugins = require("next-compose-plugins");
const { withContentlayer } = require("next-contentlayer");
const { defaultLocale, supportedLocales } = require("./lib/locales");
const bundleAnalyzer = require("@next/bundle-analyzer");

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
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
  async rewrites() {
    return [
      {
        source: "/pa/js/pa.js",
        destination: "https://plausible.io/js/script.js",
      },
      {
        source: "/pa/api/event",
        destination: "https://plausible.io/api/event",
      },
    ];
  },
  experimental: {
    appDir: true,
    scrollRestoration: true,
    largePageDataBytes: 256 * 1024,
    esmExternals: true,
  },
};

module.exports = withPlugins(
  [withBundleAnalyzer, withContentlayer],
  nextConfig
);
