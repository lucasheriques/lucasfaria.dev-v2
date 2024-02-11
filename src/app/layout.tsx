import type { Metadata } from "next";
import { DM_Sans as FontSans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "@/components/header";
import Footer from "@/components/footer";

const sourceSans = FontSans({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Lucas Faria",
  description:
    "Product Engineer working at Brex. I write about software engineering, product management, and personal growth.",
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
          sourceSans.className,
          "min-h-svh flex flex-col transition-all max-w-3xl mx-auto",
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
