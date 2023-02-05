import "@/styles/globals.css";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import PlausibleProvider from "next-plausible";
import {
  Barlow_Condensed,
  Inter,
  Vollkorn,
  Vollkorn_SC,
} from "@next/font/google";
import clsx from "clsx";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const vollkorn = Vollkorn({
  subsets: ["latin"],
  variable: "--font-vollkorn",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const vollkornSc = Vollkorn_SC({
  subsets: ["latin"],
  variable: "--font-vollkorn-sc",
  weight: ["400", "600", "700", "900"],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

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
      <PlausibleProvider domain="13vaults.com">
        <div
          className={clsx(
            barlowCondensed.variable,
            inter.variable,
            vollkorn.variable,
            vollkornSc.variable
          )}
        >
          <Component {...pageProps} />
        </div>
      </PlausibleProvider>
    </>
  );
}
