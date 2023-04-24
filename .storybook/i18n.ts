import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { defaultLocale, supportedLocales } from "../lib/locales";

const ns = ["common", "home", "classes", "calculator", "blog", "ancestries"];
const supportedLngs = supportedLocales;
const resources = ns.reduce((acc, n) => {
  supportedLngs.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {};
    acc[lng] = {
      ...acc[lng],
      [n]: require(`../public/locales/${lng}/${n}.json`),
    };
  });
  return acc;
}, {});

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    interpolation: {
      escapeValue: false,
    },
    ns: ["common", "home", "classes", "calculator", "blog", "ancestries"],
    defaultNS: "common",
    react: { useSuspense: false },
    supportedLngs,
    resources,
  });

export default i18n;
