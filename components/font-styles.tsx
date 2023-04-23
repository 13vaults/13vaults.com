import {
  Barlow_Semi_Condensed,
  Inter,
  Source_Sans_Pro,
} from "next/font/google";
import localFont from "next/font/local";

const ikariusAdfNo2 = localFont({
  preload: false,
  display: "swap",
  src: [
    {
      path: "../public/fonts/IkariusADFNo2Std-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/IkariusADFNo2Std-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/IkariusADFNo2Std-Italic.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IkariusADFNo2Std-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

const ikariusAdf = localFont({
  preload: false,
  display: "swap",
  src: [
    {
      path: "../public/fonts/IkariusADFStd-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/IkariusADFStd-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/IkariusADFStd-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/IkariusADFStd-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

const sourceSans = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  preload: false,
  display: "swap",
});

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  preload: false,
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal"],
  preload: false,
  display: "swap",
});

export default function FontStyles() {
  return (
    <style jsx global>{`
      :root {
        --font-inter: ${inter.style.fontFamily};
        --font-barlow-semi-condensed: ${barlowSemiCondensed.style.fontFamily};
        --font-ikarius-adf-no2: ${ikariusAdfNo2.style.fontFamily};
        --font-ikarius-adf: ${ikariusAdf.style.fontFamily};
        --font-source-sans: ${sourceSans.style.fontFamily};
      }
    `}</style>
  );
}
