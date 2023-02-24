import { defaultLocale } from "@/lib/locales";
import { get } from "lodash";
import { Html, Head, Main, NextScript, DocumentProps } from "next/document";

export default function Document(properties: DocumentProps) {
  const locale = String(
    get(properties, "__NEXT_DATA__.query.locale", defaultLocale)
  );

  return (
    <Html lang={locale}>
      <Head />
      <body className="dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
