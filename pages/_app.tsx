import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { appWithTranslation, i18n } from "next-i18next";
import FontStyles from "@/components/font-styles";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import { defaultLocale } from "@/lib/locales";
// Sync this with supported locales
import "dayjs/locale/de";
import { LazyMotion } from "framer-motion";
import ThemeWatcher from "@/components/theme-watcher";

async function loadFeatures() {
  const result = await import("../lib/framer-motion-features");
  return result.default;
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.tz.setDefault("America/New_York");

function VaultsApp({ Component, pageProps }: AppProps) {
  const { locale = defaultLocale } = useRouter();

  i18n?.services.formatter?.addCached("lowerCase", (language, _options) => {
    return (value) => value.toLocaleLowerCase(language);
  });

  if (dayjs.locale() !== locale) {
    dayjs.locale(locale);
  }

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        {process.env.NODE_ENV === "production" ? (
          <link rel="preload" as="script" href="/pa/js/pa.js" />
        ) : undefined}
      </Head>
      {process.env.NODE_ENV === "production" ? (
        <Script
          defer
          data-domain="13vaults.com"
          data-api="/pa/api/event"
          src="/pa/js/pa.js"
        />
      ) : undefined}
      <FontStyles />
      <ThemeWatcher />
      <LazyMotion features={loadFeatures} strict>
        <Component {...pageProps} />
      </LazyMotion>
    </>
  );
}

export default appWithTranslation(VaultsApp);
