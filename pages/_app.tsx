import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  Barlow_Semi_Condensed,
  Inter,
  Vollkorn,
  Vollkorn_SC,
} from "next/font/google";
import Script from "next/script";
import { appWithTranslation } from "next-i18next";

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
  preload: false,
});

const vollkorn = Vollkorn({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  preload: false,
});

const vollkornSc = Vollkorn_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
  preload: false,
});

function VaultsApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        {process.env.NODE_ENV === "production" ? (
          <link rel="preload" as="script" href="/pa/js/pa.js" />
        ) : undefined}
        <title>13 Vaults</title>
        <meta
          name="description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        ></meta>
      </Head>
      {process.env.NODE_ENV === "production" ? (
        <Script
          defer
          data-domain="13vaults.com"
          data-api="/pa/api/event"
          src="/pa/js/pa.js"
        />
      ) : undefined}
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-barlow-semi-condensed: ${barlowSemiCondensed.style.fontFamily};
          --font-vollkorn: ${vollkorn.style.fontFamily};
          --font-vollkorn-sc: ${vollkornSc.style.fontFamily};
        }

        /* CSS for other than iOS devices */
        @supports not (-webkit-touch-callout: none) {
          html,
          body {
            scroll-behavior: smooth;
          }
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(VaultsApp);
