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
          50: "#f0e5d8",
          100: "#e3ccaf",
          200: "#d6b380",
          300: "#c49b59",
          400: "#aa864d",
          500: "#907241",
          600: "#775e36",
          700: "#5f4b2b",
          800: "#483921",
          900: "#322817",
          950: "#1d170d",
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
