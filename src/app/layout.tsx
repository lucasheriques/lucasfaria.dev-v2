import type { Metadata } from "next";
import { DM_Sans, Spline_Sans_Mono, Lora } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/helpers/constants";

const mainFont = DM_Sans({
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
          "min-h-svh flex flex-col transition-all max-w-3xl text-lg mx-auto font-sans",
          "dark:bg-gradient-to-b from-gray-950 to-gray-800 dark:text-slate-300"
        )}
      >
        <Header />
        <main className="flex-1 px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
