import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import PlausibleProvider from "next-plausible";
import {
  Barlow_Condensed,
  Inter,
  Vollkorn,
  Vollkorn_SC,
} from "@next/font/google";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const vollkorn = Vollkorn({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const vollkornSc = Vollkorn_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function VaultsApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        {process.env.NODE_ENV === "production" ? (
          <link rel="preload" as="script" href="/pa/js/pa.js" />
        ) : null}
        <title>The 13 Vaults</title>
        <meta
          name="description"
          content="13Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        ></meta>
      </Head>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-barlow-condensed: ${barlowCondensed.style.fontFamily};
          --font-vollkorn: ${vollkorn.style.fontFamily};
          --font-vollkorn-sc: ${vollkornSc.style.fontFamily};
        }
      `}</style>
      <PlausibleProvider domain="13vaults.com">
        <Component {...pageProps} />
      </PlausibleProvider>
    </>
  );
}
