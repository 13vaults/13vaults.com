/* eslint-disable unicorn/prefer-module */

const { supportedLocales, defaultLocale } = require("./lib/locales");

module.exports = {
  i18n: {
    defaultLocale: defaultLocale,
    locales: supportedLocales,
    reloadOnPrerender: true,
  },
};
