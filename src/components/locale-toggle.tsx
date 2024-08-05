"use client";

import { useLocale } from "next-intl";

import AnimatedEmojiToggle from "./animated-emoji-toggle";

import { setLocaleCookie } from "@/helpers/server-actions";

type LocaleToggleProps = {
  className?: string;
};

export default function LocaleToggle({ className }: LocaleToggleProps) {
  const locale = useLocale();

  async function handleClick() {
    const nextLocale = locale === "pt-BR" ? "en" : "pt-BR";
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
