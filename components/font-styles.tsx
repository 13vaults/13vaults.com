import { Alegreya_Sans, Alegreya_Sans_SC } from "next/font/google";
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

const alegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  preload: false,
  display: "swap",
});

const alegreyaSansSc = Alegreya_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  preload: false,
  display: "swap",
});

export default function FontStyles() {
  return (
    <style jsx global>{`
      :root {
        --font-alegreya-sans: ${alegreyaSans.style.fontFamily};
        --font-reforma-1969: ${reforma1969.style.fontFamily};
        --font-alegreya-sans-sc: ${alegreyaSansSc.style.fontFamily};
      }
    `}</style>
  );
}
