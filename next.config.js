/* eslint-disable unicorn/prefer-module */

const { withContentlayer } = require("next-contentlayer");
const { defaultLocale } = require("./lib/locales");

async function redirects() {
  return [
    {
      source: "/",
      destination: `/${defaultLocale}/`,
      permanent: true,
    },
  ];
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  images: {
    domains:
      process.env.NODE_ENV === "production"
        ? ["www.13vaults.com"]
        : ["localhost", "www.13vaults.com"],
  },
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
    largePageDataBytes: 256 * 1024,
  },
  redirects: process.env.NODE_ENV === "development" ? redirects : undefined,
};

module.exports = withContentlayer(nextConfig);
