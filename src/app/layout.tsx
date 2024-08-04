import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Lora, Spline_Sans_Mono, Work_Sans } from "next/font/google";
import { cookies } from "next/headers";

import "./globals.css";

import Footer from "@/components/footer";
import Header from "@/components/header";
import RespectMotionPreferences from "@/components/respect-motion-preferences";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/helpers/constants";
import { cn } from "@/helpers/functions";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme =
    (cookies().get("theme")?.value as "light" | "dark" | undefined) || "dark";
  const locale =
    (cookies().get("lang")?.value as "pt-BR" | "en" | undefined) || "en";
  const messages = await getMessages();

  return (
    <RespectMotionPreferences>
      <html
        lang={locale}
        className={cn(
          "bg-amber-50 bg-gradient-to-b from-amber-50 to-emerald-50 text-gray-900",
          "dark:bg-gray-900 dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900 dark:text-gray-200",
          theme,
        )}
        data-theme={theme}
      >
        <NextIntlClientProvider messages={messages}>
          <body
            className={cn(
              mainFont.variable,
              monoFont.variable,
              serifFont.variable,
              "flex min-h-dvh flex-col font-sans text-lg",
            )}
          >
            <Header initialTheme={theme} initialLocale={locale} />
            <main className="relative flex flex-1 flex-col">{children}</main>
            <Footer />
            <TailwindIndicator />
            <SpeedInsights />
            <Analytics />
          </body>
        </NextIntlClientProvider>
      </html>
    </RespectMotionPreferences>
  );
}
