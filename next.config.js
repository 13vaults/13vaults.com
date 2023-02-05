const { withContentlayer } = require("next-contentlayer");
const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  trailingSlash: true,
};

module.exports = withPlausibleProxy({ subdirectory: "pa", scriptName: "pa" })(
  withContentlayer(nextConfig)
);
