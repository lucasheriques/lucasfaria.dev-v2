"use client";

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

import ReduxProvider from "@/components/redux-provider";

interface Props {
  messages: AbstractIntlMessages;
  children: ReactNode;
  locale: "en" | "pt-BR";
  theme: "light" | "dark";
}

export default function Providers({ messages, locale, children }: Props) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ReduxProvider>{children}</ReduxProvider>
    </NextIntlClientProvider>
  );
}
