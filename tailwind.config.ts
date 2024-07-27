import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import tailwindCssReactAria from "tailwindcss-react-aria-components";
import { fontFamily } from "tailwindcss/defaultTheme";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
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
        rotate: "rotate 20s linear infinite",
        glow: "glow 2s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        slide: "slide var(--speed) ease-in-out infinite alternate",
      },
      boxShadow: {
        "custom-glow":
          "0 0 8px rgba(255, 255, 255, 0.2), 0 0 10px rgba(255, 255, 255, 0.3), 0 0 12px rgba(213, 34, 255, 0.7), 0 0 14px rgba(213, 34, 255, 0.5), 0 0 16px rgba(213, 34, 255, 0.3)",
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
          "40%": { height: "45px", opacity: "1", bottom: "50px" },
          "80%": { height: "0", opacity: "0", bottom: "30px" },
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
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        glow: {
          "0%, 100%": {
            boxShadow:
              "0 0 8px rgba(255, 255, 255, 0.2), 0 0 10px rgba(255, 255, 255, 0.3), 0 0 12px rgba(213, 34, 255, 0.7), 0 0 14px rgba(213, 34, 255, 0.5), 0 0 16px rgba(213, 34, 255, 0.3)",
          },
          "50%": {
            boxShadow:
              "0 0 12px rgba(255, 255, 255, 0.3), 0 0 14px rgba(255, 255, 255, 0.4), 0 0 16px rgba(213, 34, 255, 0.9), 0 0 18px rgba(213, 34, 255, 0.7), 0 0 20px rgba(213, 34, 255, 0.5)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        slide: {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
      },
    },
  },
  plugins: [
    typography,
    tailwindCssReactAria,
    addVariablesForColors,
    tailwindAnimate,
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}
export default config;
