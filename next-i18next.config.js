/* eslint-disable unicorn/prefer-module */

const { supportedLocales, defaultLocale } = require("./lib/locales");

module.exports = {
  debug: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: defaultLocale,
    locales: supportedLocales,
    reloadOnPrerender: true,
  },
};
