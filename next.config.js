const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  trailingSlash: true,
};

module.exports = withContentlayer(nextConfig);
