"use client";

import React from "react";

import AnimatedEmojiToggle from "./animated-emoji-toggle";

import { setLocaleCookie } from "@/helpers/server-actions";

type LocaleToggleProps = {
  initialLocale: "pt-BR" | "en";
  className?: string;
};

export default function LocaleToggle({
  initialLocale,
  className,
}: LocaleToggleProps) {
  const [locale, setLocale] = React.useState<"pt-BR" | "en">(initialLocale);

  async function handleClick() {
    const nextLocale = locale === "pt-BR" ? "en" : "pt-BR";
    setLocale(nextLocale);
    setLocaleCookie(nextLocale);
  }

  return (
    <AnimatedEmojiToggle
      isActive={locale === "pt-BR"}
      activeEmoji="🇧🇷"
      inactiveEmoji="🇺🇸"
      onClick={handleClick}
      className={className}
    />
  );
}
