import { Barlow_Semi_Condensed, Inter } from "next/font/google";
import localFont from "next/font/local";

const ikariusAdfNo2 = localFont({
  preload: false,
  display: "swap",
  src: [
    {
      path: "../assets/IkariusADFNo2Std-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/IkariusADFNo2Std-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../assets/IkariusADFNo2Std-Italic.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/IkariusADFNo2Std-Regular.otf",
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
      path: "../assets/IkariusADFStd-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/IkariusADFStd-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../assets/IkariusADFStd-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/IkariusADFStd-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
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
      }

      /* CSS for other than iOS devices */
      @supports not (-webkit-touch-callout: none) {
        html,
        body {
          scroll-behavior: smooth;
        }
      }
    `}</style>
  );
}
