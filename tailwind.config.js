const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
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
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        display: [
          "var(--font-barlow-condensed)",
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
  plugins: [require("@tailwindcss/typography")],
};
