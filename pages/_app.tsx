import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { appWithTranslation } from "next-i18next";
import FontStyles from "@/components/font-styles";

function VaultsApp({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(VaultsApp);
