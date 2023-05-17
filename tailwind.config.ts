import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    ...(process.env.NODE_ENV === "development"
      ? ["./stories/**/*.{js,ts,jsx,tsx}"]
      : []),
  ],
  theme: {
    extend: {
      colors: {
        khaki: {
          50: "#fbf8f1",
          100: "#f7eedd",
          200: "#eddabb",
          300: "#ddb77f",
          400: "#d5a062",
          500: "#cb8644",
          600: "#bd7139",
          700: "#9d5931",
          800: "#7f492d",
          900: "#673c27",
          950: "#371e13",
        },
      },
      backgroundImage: {
        texture: "url(/texture.webp)",
        "texture-dark": "url(/texture-dark.webp)",
      },
      aspectRatio: {
        wide: "16 / 9",
      },
      fontFamily: {
        "sans-sc": [
          "var(--font-alegreya-sans-sc)",
          ...defaultTheme.fontFamily.sans,
        ],
        sans: ["var(--font-alegreya-sans)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-reforma-1969)", ...defaultTheme.fontFamily.serif],
        "display-serif": [
          "var(--font-reforma-1969)",
          ...defaultTheme.fontFamily.serif,
        ],
      },
    },
  },
  plugins: [typography, forms],
} satisfies Config;
