import "@/styles/globals.css";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import PlausibleProvider from "next-plausible";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export default function VaultsApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        {process.env.NODE_ENV === "production" ? (
          <link rel="preload" as="script" href="/pa/pa.js" />
        ) : null}
        <title>The 13 Vaults</title>
        <meta
          name="description"
          content="13Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        ></meta>
      </Head>
      <PlausibleProvider domain="13vaults.com">
        <Component {...pageProps} />
      </PlausibleProvider>
    </>
  );
}
