import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        "content-width": "var(--content-width)",
        "outer-content-width": "var(--outer-content-width)",
        "--trimmed-content-width":
          "calc(var(--content-width) - 2 * var(--outer-content-width))",
      },
      height: {
        header: "var(--header-height)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
        serif: ["var(--font-serif)", ...fontFamily.serif],
      },
      animation: {
        "grow-and-shrink": "grow-and-shrink 600ms ease-in-out forwards",
        "controlled-spin": "controlled-spin 600ms linear infinite",
        "pour-coffee": "pour-coffee 6s",
        "fill-cup": "fill-cup 6s",
        "show-smoke": "show-smoke 6s",
      },
      keyframes: {
        "grow-and-shrink": {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
        "controlled-spin": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(45deg)",
          },
        },
        "pour-coffee": {
          "0%": { height: "0", opacity: "1", bottom: "100px" },
          "25%": { height: "45px", opacity: "1", bottom: "50px" },
          "50%": { height: "45px", opacity: "1", bottom: "50px" },
          "75%,100%": { height: "0", opacity: "0", bottom: "30px" },
        },
        "fill-cup": {
          "0%,50%": { height: "0" },
          "50%,75%": { height: "80%" },
          "75%,100%": { height: "80%" },
        },
        "show-smoke": {
          "0%,58.33%": { opacity: "0" },
          "75%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
