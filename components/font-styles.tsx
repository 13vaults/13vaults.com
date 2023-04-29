import { Source_Sans_Pro } from "next/font/google";
import localFont from "next/font/local";

const reforma1969 = localFont({
  preload: false,
  display: "swap",
  src: [
    {
      path: "../public/fonts/Reforma1969-Blanca.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Reforma1969-BlancaItalica.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Reforma1969-Gris.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Reforma1969-GrisItalica.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Reforma1969-Negra.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Reforma1969-NegraItalica.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});

const reforma2018 = localFont({
  preload: false,
  display: "swap",
  src: [
    {
      path: "../public/fonts/Reforma2018-Blanca.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Reforma2018-BlancaItalica.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Reforma2018-Gris.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Reforma2018-GrisItalica.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Reforma2018-Negra.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Reforma2018-NegraItalica.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});

const sourceSans = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  preload: false,
  display: "swap",
});

export default function FontStyles() {
  return (
    <style jsx global>{`
      :root {
        --font-source-sans: ${sourceSans.style.fontFamily};
        --font-reforma-2018: ${reforma2018.style.fontFamily};
        --font-reforma-1969: ${reforma1969.style.fontFamily};
      }
    `}</style>
  );
}
