import { Html, Head, Main, NextScript } from "next/document";
import { polyfill } from "interweave-ssr";

polyfill();

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="dark:bg-black text-stone-950 dark:text-stone-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
