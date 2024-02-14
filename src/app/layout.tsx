import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import type { Metadata } from "next";
import { Lora, Spline_Sans_Mono, Work_Sans } from "next/font/google";

import "./globals.css";

import Footer from "@/components/footer";
import Header from "@/components/header";
import RespectMotionPreferences from "@/components/respect-motion-preferences";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/helpers/constants";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-sans",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-mono",
});

const serifFont = Lora({
  subsets: ["latin"],
  display: "fallback",
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RespectMotionPreferences>
      <html
        lang="en"
        className="dark:bg-gray-800 dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900 dark:text-gray-300"
      >
        <body
          className={clsx(
            mainFont.variable,
            monoFont.variable,
            serifFont.variable,
            "flex min-h-dvh flex-col font-sans text-lg",
            "overflow-y-scroll",
          )}
        >
          <Header />
          <main className="relative flex-1">{children}</main>
          <Footer />
          <TailwindIndicator />
          <Analytics />
        </body>
      </html>
    </RespectMotionPreferences>
  );
}
