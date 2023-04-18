import {
  Barlow_Semi_Condensed,
  Inter,
  Vollkorn,
  Vollkorn_SC,
} from "next/font/google";

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

const vollkorn = Vollkorn({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  preload: false,
  display: "swap",
});

const vollkornSc = Vollkorn_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
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
  );
}
