import clsx from "clsx";
import type { Metadata } from "next";
import { Lora, Spline_Sans_Mono, Work_Sans } from "next/font/google";

import "./globals.css";

import Footer from "@/components/footer";
import Header from "@/components/header";
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
    <html lang="en">
      <body
        className={clsx(
          mainFont.variable,
          monoFont.variable,
          serifFont.variable,
          "min-h-svh flex flex-col max-w-3xl text-lg mx-auto font-sans",
          "dark:bg-gradient-to-b from-gray-950 to-gray-800 dark:text-gray-300 overflow-y-scroll",
        )}
      >
        <Header />
        <main className="flex-1 px-4">{children}</main>
        <Footer />
        <TailwindIndicator />
      </body>
    </html>
  );
}
