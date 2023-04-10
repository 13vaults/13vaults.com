import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        texture: "url(/texture.webp)",
        "texture-dark": "url(/texture-dark.webp)",
      },
      aspectRatio: {
        wide: "2 / 1",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        display: [
          "var(--font-barlow-semi-condensed)",
          ...defaultTheme.fontFamily.sans,
        ],
        serif: ["var(--font-vollkorn)", ...defaultTheme.fontFamily.serif],
        "display-serif": [
          "var(--font-vollkorn-sc)",
          ...defaultTheme.fontFamily.serif,
        ],
      },
    },
  },
  plugins: [typography, forms],
} satisfies Config;
